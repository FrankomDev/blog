from flask import Flask, render_template, request, redirect
import sqlite3
import hashlib
import os

def getDB():
    conn = sqlite3.connect('database.db')
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
        return render_template('admin.html', number=countFiles()+1)
    else:
        return redirect('/login?error=1', code=302)
   

if __name__ == '__main__':
    app.run(debug=True)

