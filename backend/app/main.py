from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.database import Base
from app.db.database import engine



from app.api.auth import router as auth_router
from app.api.users import router as users_router
from app.api.review import router as review_router
from app.api.rewrite import router as rewrite_router
from app.api.history import router as history_router



app = FastAPI(
    title="CodeRefine API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


from app.models.user import User
from app.models.review import Review

Base.metadata.create_all(
    bind=engine
)

app.include_router(auth_router)
app.include_router(users_router)
app.include_router(review_router)
app.include_router(rewrite_router)
app.include_router(history_router)


@app.get("/")
def root():
    return {
        "message": "CodeRefine API Running"
    }