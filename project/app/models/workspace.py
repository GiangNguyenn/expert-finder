from pydantic import BaseModel

class Workspace(BaseModel):
    id: str = None
    title: str
    project_id: str
