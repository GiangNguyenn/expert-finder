import json
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import Chroma
import json
from app.db import cur
from langchain.schema import Document

class Query(BaseModel):
    content: str

# init expert vector db
def get_experts():
    cur.execute("""
                SELECT 
                    expert.id, 
                    expert.name, 
                    expert.industry, 
                    COALESCE(ARRAY_AGG(expert_metadata.metadata)) AS metadata
                FROM expert 
                LEFT JOIN expert_metadata
                ON expert.id = expert_metadata.expert_id
                GROUP BY expert.id
                """
                )

    rows = cur.fetchall()
    
    return [{
        "id": row[0], 
        "name": row[1], 
        "industry": row[2],
        "metadata": row[3]
    } for row in rows]

router = APIRouter(
    prefix="/search",
    tags=["search"],
    responses={404: {"error": "Not found"}},
)

embeddings = OpenAIEmbeddings(openai_api_key="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")

# first get all the experts with the metadata
@router.post("")
def search_experts(query: Query):
    try:
        expert_list = get_experts()
        documents = [Document(page_content=json.dumps(data), metadata={"source": "expert_db"}) for data in expert_list]
        db =Chroma.from_documents(documents, embeddings )
        docs = db.similarity_search(query.content, k=3)
        experts=  [json.loads(doc.page_content) for doc in docs]        
        return experts
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))
