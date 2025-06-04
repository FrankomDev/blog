#import sqlite3
import hashlib
import mysql.connector
import env as env

password = env.panel_password
hash = hashlib.sha256(password.encode('utf8')).hexdigest()

#conn = sqlite3.connect("database.db")
conn = mysql.connector.connect(
    host = env.host,
    user = env.user,
    password = env.password,
    database = env.database
)
cursor = conn.cursor()

cursor.execute("CREATE TABLE IF NOT EXISTS password (password VARCHAR(255))")
cursor.execute("INSERT INTO password (password) VALUES (%s)", (hash,))

conn.commit()
conn.close()
