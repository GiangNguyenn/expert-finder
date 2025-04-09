from db import cur, con

# home grown DB migrations these should be IDEMPOTENT statements
# these statements will be run before the database starts up
migrations = [
    # create table
"""
DROP TABLE IF EXISTS "expert_metadata" CASCADE;
DROP TABLE IF EXISTS "expert" CASCADE;

CREATE TABLE "expert" (
  "id" uuid PRIMARY KEY,
  "name" varchar,
  "industry" varchar
);

CREATE TABLE "expert_metadata" (
  "id" uuid PRIMARY KEY,
  "expert_id" uuid,
  "metadata" json,
  "source" varchar,
  "created_at" timestamp
);
""",

    # add default values
"""
INSERT INTO "expert" ("id", "name", "industry") VALUES 
    ('00000000-0000-0000-0000-000000000111', 'John Doe', 'HR'),
    ('00000000-0000-0000-0000-000000000112', 'Jane Doe', 'HR'),
    ('00000000-0000-0000-0000-000000000113', 'John Smith', 'HR'),
    ('00000000-0000-0000-0000-000000000114', 'Jane Smith', 'Sales');

INSERT INTO "expert_metadata" ("id", "expert_id", "metadata", "source", "created_at") VALUES 
    ('20000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000111', '{"age": 30, "location": "New York"}', 'LinkedIn', '2021-01-01 00:00:00'),
    ('20000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000111', '{"workplace": "ACME"}', 'LinkedIn', '2021-01-01 00:00:00');
"""
]


for script in migrations:
    cur.execute(script)
con.commit()

print("Executed ", len(migrations), " migrations")
