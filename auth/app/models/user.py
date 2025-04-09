from pydantic import BaseModel

# DB model
class User(BaseModel):
    id: str = None
    name: str
    password: str
    email: str