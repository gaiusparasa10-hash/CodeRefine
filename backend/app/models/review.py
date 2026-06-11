from sqlalchemy import Column, Integer, String, Text, DateTime

from datetime import datetime

from app.db.database import Base


class Review(Base):

    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer)

    language = Column(String)

    source_code = Column(Text)

    review_result = Column(Text)

    optimized_code = Column(Text)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )