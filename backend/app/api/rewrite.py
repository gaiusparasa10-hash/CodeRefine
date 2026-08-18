from fastapi import APIRouter, HTTPException
from app.schemas.rewrite import RewriteRequest
from app.services.groq_service import rewrite_code
from app.services.rewrite_parser import parse_rewrite_response

router = APIRouter(
    prefix="/rewrite",
    tags=["AI Rewrite"]
)


@router.post("/")
def rewrite(request: RewriteRequest):
    try:
        result = rewrite_code(
            request.code,
            request.language
        )

        parsed_result = parse_rewrite_response(
            result
        )

        return parsed_result

    except Exception as e:
        print(f"Rewrite API Exception: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"AI Rewrite Error: {str(e)}"
        )