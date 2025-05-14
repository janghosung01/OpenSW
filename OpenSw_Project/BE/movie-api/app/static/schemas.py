from pydantic import BaseModel
from typing import List

# 기존 Movie 스키마
class Movie(BaseModel):
    id: int
    title: str
    overview: str
    poster_path: str
    release_date: str

    class Config:
        orm_mode = True

# store_latest의 반환 스키마
class StoreLatestResponse(BaseModel):
    stored: List[int]
