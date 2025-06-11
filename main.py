from flask import Flask, render_template, request, redirect, jsonify
#import sqlite3
import hashlib
import os
import json
import mysql.connector
import env as env
from datetime import datetime
import whitelist as whitelist

def checkPostsDir():
    if os.path.isdir('./static/posts'):
        print('directory exists')
    else:
        os.makedirs('./static/posts')
        print('directory has been created')

def getDB():
    #conn = sqlite3.connect('database.db')
    conn = mysql.connector.connect(
    host = env.host,
    user = env.user,
    password = env.password,
    database = env.database
    )
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM password")
    rows = cursor.fetchall() 
    for row in rows:
        passwd = row[0]
    conn.close()
    return passwd

def countFiles():
    files = [f for f in os.listdir('./static/posts') if os.path.isfile(os.path.join('./static/posts', f))]
    num_files = len(files)
    return num_files

def saveJSON(name,description,date,contains):
    dictionary = {
        "name": name,
        "description": description,
        "date": date,
        "contains": contains 
    }
    filename = './static/posts/'+str(countFiles()+1)+'.json'
    with open(filename, "w") as outfile:
        json.dump(dictionary, outfile)

def editJSON(name,description,date,contains, file):
    dictionary = {
        "name": name,
        "description": description,
        "date": date,
        "contains": contains 
    }
    filename = './static/posts/'+str(file)+'.json'
    with open(filename, "w") as outfile:
        json.dump(dictionary, outfile)
    
def deleteJSON(file):
    filename = './static/posts/'+str(file)+'.json'
    os.remove(filename)
    i = file
    postsPath = './static/posts/'
    while i <= countFiles():
        i+=1
        os.rename(postsPath+str(i)+'.json', postsPath+str(i-1)+'.json')

def checkWl(ip):
    for line in whitelist.whitelistF():
        #print(line)
        if line == str(ip):
            return True
            break
        elif line == 'end':
            return False
            break

def createLogs(password,host,valid,where,fname):
    time = datetime.now().strftime("%d.%m.%y %X")
    if checkWl(host) == False:    
        with open ('log', 'a') as file:
            if where == 'panel':
                if valid == False:
                    file.write('⚠️ Panel login, '+'host: '+host+', pass: '+password+', time: '+time+"\n")
                elif valid:
                    file.write('✅ Panel login, '+'host: '+host+', time: '+time+"\n")
            elif where == 'publish':
                if valid == False:
                    file.write('⚠️ Post publish, '+'host: '+host+', pass: '+password+', time: '+time+"\n")
                elif valid:
                    file.write('✅ Post publish, '+'host: '+host+', time: '+time+"\n")
            elif where == 'edit':
                if valid == False:
                    file.write('⚠️ Post edit, '+'host: '+host+', pass: '+password+', time: '+time+"\n")
                elif valid:
                    file.write('✅ Post edit '+str(fname)+'.json, host: '+host+', time: '+time+"\n")
            elif where == 'delete':
                if valid == False:
                    file.write('⚠️ Post delete '+str(fname)+'.json, host: '+host+', pass: '+password+', time: '+time+"\n")
                elif valid:
                    file.write('✅ Post delete '+str(fname)+'.json, host: '+host+', time: '+time+"\n")  

app = Flask(__name__)

@app.route('/')
def main():
    return render_template('index.html', number=countFiles())

@app.route('/post')
def post():
    return render_template('post.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/submit', methods=['POST'])
def submit():
    password_input = request.form['password_input']
    hash = hashlib.sha256(password_input.encode('utf8')).hexdigest()
    if hash == str(getDB()):
        createLogs(password_input,request.remote_addr,True,'panel',None)
        file = open('log')
        return render_template('admin.html', number=countFiles()+1, number2=countFiles(), logs=file.read())
    else:
        createLogs(password_input,request.remote_addr,False,'panel',None)
        return redirect('/login?error=1', code=302)
   
@app.route('/publish', methods=['POST']) 
def publish():
    password_confirm = request.form['password_input']
    hash = hashlib.sha256(password_confirm.encode('utf8')).hexdigest()
    if hash == str(getDB()):
        title_input = request.form['title_input']
        description_input = request.form['description_input']
        date_input = request.form['date_input']
        content_input = request.form['content_input']
        saveJSON(title_input, description_input, date_input, content_input)
        createLogs(password_confirm,request.remote_addr,True,'publish',None)
        return redirect('/post?blog='+str(countFiles()), code=302)
    else:
        createLogs(password_confirm,request.remote_addr,False,'publish',None)
        return 'wrong pass'

@app.route('/edit')
def edit():
    return render_template('edit.html')

@app.route('/editPost', methods=['POST'])
def editPost():
    password_confirm = request.form['password_input']
    hash = hashlib.sha256(password_confirm.encode('utf8')).hexdigest()
    if hash == str(getDB()):
        title_input = request.form['title_input']
        description_input = request.form['description_input']
        date_input = request.form['date_input']
        content_input = request.form['content_input']
        file = request.form['getNum']
        editJSON(title_input, description_input, date_input, content_input, file)
        createLogs(password_confirm,request.remote_addr,True,'edit',file)
        return redirect('/post?blog='+str(file), code=302)
    else:
        createLogs(password_confirm,request.remote_addr,False,'edit',None)
        return 'wrong pass'

@app.route('/delPost', methods=['POST'])
def delPost():
    data = request.get_json()
    fileToDel = data.get('postFile')
    passwdCheck = data.get('passwd')
    hash = hashlib.sha256(passwdCheck.encode('utf8')).hexdigest()
    if hash == str(getDB()):
        deleteJSON(fileToDel)
        createLogs(passwdCheck,request.remote_addr,True,'delete',fileToDel)
        return jsonify({"success": True})
    else:
        createLogs(passwdCheck,request.remote_addr,False,'delete',fileToDel)
        return jsonify({"success": False})

if __name__ == '__main__':
    checkPostsDir()
    app.run(debug=env.debug)

