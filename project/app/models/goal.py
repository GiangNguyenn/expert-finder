from pydantic import BaseModel

class Goal(BaseModel):
    id: str = None
    title: str
    workspace_id: str