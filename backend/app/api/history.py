from fastapi import APIRouter
from app.db.database import SessionLocal
from app.models.review import Review

router = APIRouter(
    prefix="/history",
    tags=["History"]
)


@router.get("/")
def get_history():

    db = SessionLocal()

    reviews = db.query(
        Review
    ).order_by(
        Review.created_at.desc()
    ).all()

    return reviews