import os
import psycopg2

POSTGRES_PASSWORD = os.environ["POSTGRES_PASSWORD"]

con = psycopg2.connect(
    dbname="postgres",
    user="postgres",
    password=POSTGRES_PASSWORD,
    host="project_db",
    port="5432",
)
cur = con.cursor()

# home grown DB migrations these should be IDEMPOTENT statements
# these statements will be run before the database starts up
migrations = [
    # create tables
"""
DROP TABLE IF EXISTS "workspace_expert" CASCADE;
DROP TABLE IF EXISTS "workspace" CASCADE;
DROP TABLE IF EXISTS "goal" CASCADE;
DROP TABLE IF EXISTS "project" CASCADE;

CREATE TABLE "project" (
  "id" uuid PRIMARY KEY,
  "title" varchar,
  "purpose" varchar,
  "user_id" uuid
);

CREATE TABLE "goal" (
  "id" uuid PRIMARY KEY,
  "title" varchar,
  "workspace_id" uuid
);

CREATE TABLE "workspace" (
  "id" uuid PRIMARY KEY,
  "title" varchar,
  "project_id" uuid
);

CREATE TABLE "workspace_expert" (
  "id" uuid PRIMARY KEY,
  "workspace_id" uuid,
  "expert_id" uuid
);
""",

    # add dummy data with meaning full names
"""
INSERT INTO "project" VALUES ('00000000-0000-0000-0000-000000000001', 'Project 1', 'Purpose 1', '00000000-0000-0000-0000-000000000001');
INSERT INTO "project" VALUES ('00000000-0000-0000-0000-000000000002', 'Project 2', 'Purpose 2', '00000000-0000-0000-0000-000000000001');
INSERT INTO "project" VALUES ('00000000-0000-0000-0000-000000000003', 'Project 3', 'Purpose 3', '00000000-0000-0000-0000-000000000002');

INSERT INTO "goal" VALUES ('00000000-0000-0000-0000-000000000004', 'Goal 1', '00000000-0000-0000-0000-000000000001');
INSERT INTO "goal" VALUES ('00000000-0000-0000-0000-000000000005', 'Goal 2', '00000000-0000-0000-0000-000000000001');
INSERT INTO "goal" VALUES ('00000000-0000-0000-0000-000000000006', 'Goal 3', '00000000-0000-0000-0000-000000000002');

INSERT INTO "workspace" VALUES ('00000000-0000-0000-0000-000000000007', 'Workspace 1', '00000000-0000-0000-0000-000000000001');
INSERT INTO "workspace" VALUES ('00000000-0000-0000-0000-000000000008', 'Workspace 2', '00000000-0000-0000-0000-000000000001');
INSERT INTO "workspace" VALUES ('00000000-0000-0000-0000-000000000009', 'Workspace 3', '00000000-0000-0000-0000-000000000002');

INSERT INTO "workspace_expert" VALUES ('00000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000111');
INSERT INTO "workspace_expert" VALUES ('00000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000112');
INSERT INTO "workspace_expert" VALUES ('00000000-0000-0000-0000-000000000012', '00000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000113');
INSERT INTO "workspace_expert" VALUES ('00000000-0000-0000-0000-000000000013', '00000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000114');
"""
]


for script in migrations:
    cur.execute(script)
con.commit()

print("Executed ", len(migrations), " migrations")
