from fastapi import APIRouter, HTTPException
from app.models.project import Project
import uuid

from app.db import cur, con
from app.routers.workspaces import rowToWorkspace

router = APIRouter(
    prefix="/projects",
    tags=["projects"],
    responses={404: {"error": "Not found"}},
)

def rowToProject(row: tuple) -> Project:
    return Project(
        id=row[0], 
        title=row[1], 
        purpose=row[2], 
        user_id=row[3]
    )

@router.get("")
def getAll() -> list[Project]:
    cur.execute("SELECT * FROM project")
    projects = cur.fetchall()
    
    return [rowToProject(project) for project in projects]

@router.get("/{id}")
def getOne(id: str) -> Project:
    cur.execute("""
                SELECT * 
                FROM project 
                WHERE id=%s
                """,
                (id,)
                )

    project = cur.fetchone()

    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")    

    return rowToProject(project)

@router.post("")
def createOne(project: Project) -> Project:
    id = str(uuid.uuid4())

    cur.execute("""
                INSERT INTO project 
                    (id, title, purpose, user_id)
                VALUES 
                    (%s, %s, %s, %s)
                """,
                (id, project.title, project.purpose, project.user_id)
                )
    con.commit()

    new_project = Project(
        id=id,
        title=project.title,
        purpose=project.purpose,
        user_id=project.user_id
    )
    
    return new_project

@router.put("/{id}")
def updateOne(id: str, project: Project) -> Project:
    cur.execute("""
                UPDATE project 
                SET 
                    title=%s, purpose=%s, user_id=%s 
                WHERE id=%s
                """,
                (project.title, project.purpose, project.user_id, id)
                )
    con.commit()
    
    return project

@router.delete("/{id}")
def deleteOne(id: str):
    cur.execute("DELETE FROM project WHERE id=%s", (id,))
    con.commit()
    
    return {}

@router.get("/{id}/workspaces")
def getWorkspaces(id: str):
    cur.execute("""
                SELECT * 
                FROM workspace 
                WHERE project_id=%s
                """,
                (id,)
                )

    workspaces = cur.fetchall()

    return [rowToWorkspace(workspace) for workspace in workspaces]
