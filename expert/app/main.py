from app.routers import search
from fastapi import FastAPI
from app.routers import experts
from app.routers import metadata
app = FastAPI()

app.include_router(experts.router)
app.include_router(metadata.router)
app.include_router(search.router)