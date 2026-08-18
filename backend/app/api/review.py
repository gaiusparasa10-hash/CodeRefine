from fastapi import APIRouter, HTTPException
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
def review(request: ReviewRequest):
    try:
        result = review_code(
            request.code,
            request.language
        )

        parsed_result = parse_ai_json(
            result
        )

        db = SessionLocal()
        try:
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
            db.add(review_record)
            db.commit()
        except Exception as db_err:
            print(f"Database save warning: {db_err}")
            db.rollback()
        finally:
            db.close()

        return parsed_result

    except Exception as e:
        print(f"Review API Exception: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"AI Review Error: {str(e)}"
        )