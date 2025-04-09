from app.models.user import User
from fastapi import APIRouter

router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={404: {"error": "Not found"}},
)

def rowToUser(row: tuple) -> User:
    return User(
        id=row[0],
        name=row[1],
        password=row[2],
        email=row[3],
    )

