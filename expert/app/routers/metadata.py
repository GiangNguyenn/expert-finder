from datetime import datetime
import json
from fastapi import APIRouter
from app.models.expert_metadata import ExpertMetadata
import uuid

from app.db import cur, con

router = APIRouter(
    prefix="/metadata",
    tags=["expert_metadata"],
    responses={404: {"error": "Not found"}},
)

def rowToExpertMetadata(row: tuple) -> ExpertMetadata:
    return ExpertMetadata(
        id=row[0],
        expert_id=row[1],
        metadata=json.dumps(row[2]),
        source=row[3],
        created_at=row[4]
    )

@router.get("")
def getAll() -> list[ExpertMetadata]:
    cur.execute("SELECT * FROM expert_metadata")
    expert_metadata = cur.fetchall()
    
    return [rowToExpertMetadata(metadata) for metadata in expert_metadata]

@router.get("/{id}")
def getOne(id: str) -> ExpertMetadata:
    cur.execute("""
                SELECT * 
                FROM expert_metadata 
                WHERE id=%s
                """,
                (id,)
                )

    metadata = cur.fetchone()
    
    return rowToExpertMetadata(metadata)

@router.post("")
def createOne(metadata: ExpertMetadata) -> ExpertMetadata:
    id = str(uuid.uuid4())
    created_at = str(datetime.now())

    cur.execute("""
                INSERT INTO expert_metadata 
                    (id, expert_id, metadata, source, created_at)
                VALUES 
                    (%s, %s, %s, %s, %s)
                """,
                (id, metadata.expert_id, metadata.metadata, metadata.source, created_at)
                )
    con.commit()

    new_metadata = ExpertMetadata(
        id=id,
        expert_id=metadata.expert_id,
        metadata=metadata.metadata,
        source=metadata.source,
        created_at=created_at
    )
    
    return new_metadata

@router.put("/{id}")
def updateOne(id: str, metadata: ExpertMetadata) -> ExpertMetadata:
    cur.execute("""
                UPDATE expert_metadata 
                SET 
                    expert_id=%s, metadata=%s, source=%s
                WHERE id=%s
                """,
                (metadata.expert_id, metadata.metadata, metadata.source, id)
                )
    con.commit()
    
    return metadata

@router.delete("/{id}")
def deleteOne(id: str) -> ExpertMetadata:
    cur.execute(f"DELETE FROM expert_metadata WHERE id='{id}'")
    con.commit()
    
    return {}
