import os
import psycopg2

POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")

con = psycopg2.connect(
    dbname="postgres",
    user="postgres",
    password=POSTGRES_PASSWORD,
    host="expert_db",
    port="5432",
)
cur = con.cursor()