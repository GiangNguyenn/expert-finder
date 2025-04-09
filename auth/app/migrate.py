from db import con, cur

# home grown DB migrations these should be IDEMPOTENT statements
# these statements will be run before the database starts up
migrations = [
    # create tables
"""
DROP TABLE IF EXISTS "users";

CREATE TABLE "users" (
  "id" uuid PRIMARY KEY,
  "email" varchar,
  "password" varchar,
  "name" varchar
);

""",

    # add dummy data with meaning full names
"""
INSERT INTO "users" ("id", "email", "password", "name") VALUES
    ('00000000-0000-0000-0000-000000000001', 'abc@gmail.com', 'abc', 'abc'),
    ('00000000-0000-0000-0000-000000000002', '123@gmail.com', '123', '123'),
    ('00000000-0000-0000-0000-000000000003', 'eheehehehe@gmail.com', 'eheehehehe', 'eheehehehe'),
    ('00000000-0000-0000-0000-000000000004', 'pepe@gmail.com', 'pepe', 'pepe')
    
"""
]

for script in migrations:
    cur.execute(script)
con.commit()

print("Executed ", len(migrations), " migrations")
