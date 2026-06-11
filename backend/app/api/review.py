from fastapi import APIRouter
from app.schemas.review import ReviewRequest
from app.services.groq_service import review_code
from app.services.json_parser import parse_ai_json
from app.models.review import Review
from app.db.database import SessionLocal

router = APIRouter(
    prefix="/review",
    tags=["AI Review"]
)


@router.post("/")
def review(
    request: ReviewRequest
):
    db = SessionLocal()
    result = review_code(
        request.code,
        request.language
    )

    parsed_result = parse_ai_json(
        result
    )

    review_record = Review(

        user_id=1,

        language=request.language,

        source_code=request.code,

        review_result=str(parsed_result),

        optimized_code=parsed_result.get(
            "optimized_code",
            ""
        )

    )

    db.add(
        review_record
    )

    db.commit()

    return parsed_result