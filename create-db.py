#import sqlite3
import hashlib
import mysql.connector

password = 'test123'
hash = hashlib.sha256(password.encode('utf8')).hexdigest()

#conn = sqlite3.connect("database.db")
conn = mysql.connector.connect(
    host = "localhost",
    user = "root",
    password = "123",
    database = "blog"
)
cursor = conn.cursor()

cursor.execute("CREATE TABLE IF NOT EXISTS password (password VARCHAR(255))")
cursor.execute("INSERT INTO password (password) VALUES (%s)", (hash,))

conn.commit()
conn.close()