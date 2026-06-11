from fastapi import APIRouter
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

        return {

            "optimized_code": "",

            "explanation":

                f"Rewrite failed: {str(e)}"

        }