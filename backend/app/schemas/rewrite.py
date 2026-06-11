from pydantic import BaseModel

class RewriteRequest(BaseModel):
    language: str
    code: str