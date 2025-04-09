import uuid
from fastapi import APIRouter
from app.models.expert import Expert
from app.models.expert_metadata import ExpertMetadata
from app.routers.metadata import rowToExpertMetadata

from app.db import cur, con

router = APIRouter(
    prefix="/experts",
    tags=["experts"],
    responses={404: {"error": "Not found"}},
)

def rowToExpert(row: tuple) -> Expert:
    return Expert(
        id=row[0], 
        name=row[1], 
        industry=row[2]
    )

@router.get("")
def getAll() -> list[Expert]:
    cur.execute("SELECT * FROM expert")
    experts = cur.fetchall()
    
    return [rowToExpert(expert) for expert in experts]

@router.get("/{id}")
def getOne(id: str) -> Expert:
    cur.execute("""
                SELECT * 
                FROM expert 
                WHERE id=%s
                """,
                (id,)
                )

    expert = cur.fetchone()
    
    return rowToExpert(expert)

@router.post("/search")
def search(ids: list[str]):
    cur.execute("""
                SELECT 
                    expert.id, 
                    expert.name, 
                    expert.industry, 
                    COALESCE(ARRAY_AGG(expert_metadata.metadata)) AS metadata
                FROM expert 
                LEFT JOIN expert_metadata
                ON expert.id = expert_metadata.expert_id
                WHERE expert.id=ANY(%s::uuid[])
                GROUP BY expert.id
                """,
                (ids,)
                )

    rows = cur.fetchall()
    

    return [{
        "id": row[0], 
        "name": row[1], 
        "industry": row[2],
        "metadata": [json for json in row[3]] if row[3][0] else []
    } for row in rows]

@router.post("")
def createOne(expert: Expert) -> Expert:
    id = str(uuid.uuid4())

    cur.execute("""
                INSERT INTO expert 
                    (id, name, industry)
                VALUES 
                    (%s, %s, %s)
                """,
                (id, expert.name, expert.industry)
                )
    con.commit()

    new_expert = Expert(
        id=id,
        name=expert.name,
        industry=expert.industry
    )
    
    return new_expert

@router.put("/{id}")
def updateOne(id: str, expert: Expert) -> Expert:
    cur.execute("""
                UPDATE expert 
                SET 
                    name=%s, industry=%s 
                WHERE id=%s
                """,
                (expert.name, expert.industry, id)
                )
    con.commit()
    
    return expert

@router.delete("/{id}")
def deleteOne(id: str) -> Expert:
    cur.execute(f"DELETE FROM expert WHERE id='{id}'")
    con.commit()
    
    return {}

@router.get("/{id}/metadata")
def getMetadata(id: str) -> list[ExpertMetadata]:
    cur.execute("""
                SELECT * 
                FROM expert_metadata 
                WHERE expert_id=%s
                """,
                (id,)
                )

    all_metadata = cur.fetchall()
    
    return [rowToExpertMetadata(metadata) for metadata in all_metadata]
