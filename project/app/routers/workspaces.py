from fastapi import APIRouter, HTTPException
from app.models.workspace import Workspace
import uuid

from app.db import cur, con
from app.routers.goals import rowToGoal

router = APIRouter(
    prefix="/workspaces",
    tags=["workspaces"],
    responses={404: {"error": "Not found"}},
)

def rowToWorkspace(row: tuple) -> Workspace:
    return Workspace(
        id=row[0], 
        title=row[1], 
        project_id=row[2]
    )

@router.get("")
def getAll() -> list[Workspace]:
    cur.execute("SELECT * FROM workspace")
    workspaces = cur.fetchall()

    return [rowToWorkspace(workspace) for workspace in workspaces]

@router.get("/{id}")
def getOne(id: str) -> Workspace:
    cur.execute("""
                SELECT * 
                FROM workspace 
                WHERE id=%s
                """,
                (id,)
                )

    workspace = cur.fetchone()
    
    if workspace is None:
        raise HTTPException(status_code=404, detail="Workspace not found")    

    return rowToWorkspace(workspace)

@router.post("")
def createOne(workspace: Workspace) -> Workspace:
    id = str(uuid.uuid4())

    cur.execute("""
                INSERT INTO workspace 
                    (id, title, project_id)
                VALUES 
                    (%s, %s, %s, %s)
                """,
                (id, workspace.title, workspace.project_id)
                )
    con.commit()

    new_workspace = Workspace(
        id=id,
        title=workspace.title,
        project_id=workspace.project_id
    )
    
    return new_workspace

@router.put("/{id}")
def updateOne(id: str, workspace: Workspace) -> Workspace:
    cur.execute("""
                UPDATE workspace 
                SET 
                    title=%s, project_id=%s 
                WHERE id=%s
                """,
                (workspace.title, workspace.project_id, id)
                )
    con.commit()
    
    return workspace

@router.delete("/{id}")
def deleteOne(id: str) -> Workspace:
    cur.execute(f"DELETE FROM workspace WHERE id='{id}'")
    con.commit()
    
    return {}

@router.get("/{id}/goals")
def getGoals(id: str):
    cur.execute("""
                SELECT * 
                FROM goal 
                WHERE workspace_id=%s
                """,
                (id,)
                )
    goals = cur.fetchall()

    return [rowToGoal(goal) for goal in goals]

@router.get("/{id}/experts")
def getExperts(id: str) -> list[str]:
    cur.execute("""
                SELECT expert_id
                FROM workspace_expert 
                WHERE workspace_id=%s
                """,
                (id,)
                )
    experts = cur.fetchall()

    return [expert[0] for expert in experts]
