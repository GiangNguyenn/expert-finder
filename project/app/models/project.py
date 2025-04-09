from pydantic import BaseModel

class Project(BaseModel):
    id: str = None
    title: str
    purpose: str
    user_id: str
