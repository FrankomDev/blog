from flask import Flask, render_template, request, redirect
import sqlite3
import hashlib

def getDB():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM password")
    rows = cursor.fetchall() 
    for row in rows:
        passwd = row[0]
    conn.close()
    return passwd


app = Flask(__name__)

@app.route('/')
def main():
    return render_template('index.html')

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
        return 'good!'
    else:
        return redirect('/login?error=1', code=302)
   

if __name__ == '__main__':
    app.run(debug=True)

