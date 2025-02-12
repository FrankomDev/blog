import sqlite3
import hashlib

password = 'test123'
hash = hashlib.sha256(password.encode('utf8')).hexdigest()

conn = sqlite3.connect("database.db")
cursor = conn.cursor()

cursor.execute("CREATE TABLE IF NOT EXISTS password (password TEXT)")
cursor.execute("INSERT INTO password (password) VALUES (?)", (hash,))

conn.commit()
conn.close()