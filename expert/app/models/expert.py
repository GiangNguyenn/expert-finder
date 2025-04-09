from pydantic import BaseModel

class Expert(BaseModel):
    id: str = None
    name: str
    industry: str