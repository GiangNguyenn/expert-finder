from fastapi import APIRouter
from app.models.goal import Goal
import uuid

from app.db import cur, con

router = APIRouter(
    prefix="/goals",
    tags=["goals"],
    responses={404: {"error": "Not found"}},
)

def rowToGoal(row: tuple) -> Goal:
    return Goal(
        id=row[0], 
        title=row[1], 
        workspace_id=row[2]
    )

@router.get("")
def getAll() -> list[Goal]:
    cur.execute("SELECT * FROM goal")
    goals = cur.fetchall()
    
    return [rowToGoal(goal) for goal in goals]

@router.get("/{id}")
def getOne(id: str) -> Goal:
    cur.execute("""
                SELECT * 
                FROM goal 
                WHERE id=%s
                """,
                (id,)
                )

    goal = cur.fetchone()
    
    return rowToGoal(goal)

@router.post("")
def createOne(goal: Goal) -> Goal:
    id = str(uuid.uuid4())

    cur.execute("""
                INSERT INTO goal 
                    (id, title, workspace_id)
                VALUES 
                    (%s, %s, %s)
                """,
                (id, goal.title, goal.workspace_id)
                )
    con.commit()

    new_goal = Goal(
        id=id,
        title=goal.title,
        workspace_id=goal.workspace_id
    )
    
    return new_goal

@router.put("/{id}")
def updateOne(id: str, goal: Goal) -> Goal:
    cur.execute("""
                UPDATE goal 
                SET 
                    title=%s, workspace_id=%s 
                WHERE id=%s
                """,
                (goal.title, goal.workspace_id, id)
                )
    con.commit()
    
    return goal

@router.delete("/{id}")
def deleteOne(id: str) -> Goal:
    cur.execute(f"DELETE FROM goal WHERE id='{id}'")
    con.commit()
    
    return {}
