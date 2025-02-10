from flask import Flask, render_template, request, redirect

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
    if password_input == '123':
        return 'good!'
    else:
        return redirect('/login?error=1', code=302)
   

if __name__ == '__main__':
    app.run(debug=True)

