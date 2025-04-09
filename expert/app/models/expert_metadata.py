import datetime
from pydantic import BaseModel, Json

class ExpertMetadata(BaseModel):
    id: str = None
    expert_id: str
    metadata: str
    source: str
    created_at: datetime.datetime = None
