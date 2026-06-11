from fastapi import APIRouter
from fastapi import Depends

from app.core.dependencies import get_current_user

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.get("/me")
def get_me(
    current_user=Depends(get_current_user)
):
    return {
        "email": current_user,
        "message": "Authenticated Successfully"
    }