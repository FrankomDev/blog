import sqlite3

password = 'test123'

conn = sqlite3.connect("database.db")
cursor = conn.cursor()

cursor.execute("CREATE TABLE IF NOT EXISTS password (password TEXT)")
cursor.execute("INSERT INTO password (password) VALUES (?)", (password,))

conn.commit()
conn.close()