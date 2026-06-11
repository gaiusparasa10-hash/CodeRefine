from pydantic import BaseModel


class ReviewRequest(BaseModel):
    language: str
    code: str