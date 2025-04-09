from fastapi import FastAPI
from app.routers import projects, workspaces, goals

app = FastAPI()

app.include_router(workspaces.router)
app.include_router(goals.router)
app.include_router(projects.router)