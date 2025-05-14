import os
import httpx

from typing import List
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

app = FastAPI(title="MOVIEIN API")

# CORS 허용 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic 모델 정의
class Movie(BaseModel):
    id: int
    title: str
    overview: str
    poster_path: str
    release_date: str

    class Config:
        orm_mode = True

class MoviesResponse(BaseModel):
    results: List[Movie]


# TMDB API 키 가져오기 (Docker 환경변수로 전달됨)
TMDB_API_KEY = os.getenv("TMDB_API_KEY")
if not TMDB_API_KEY:
    raise RuntimeError("TMDB_API_KEY 환경변수가 설정되어 있지 않습니다.")


# 최신 영화 20개
@app.get("/latest", response_model=MoviesResponse, summary="최신 영화 20개 조회")
async def get_latest_movies():
    url = "https://api.themoviedb.org/3/movie/now_playing"
    params = {"api_key": TMDB_API_KEY, "language": "ko-KR", "page": 1}

    async with httpx.AsyncClient() as client:
        res = await client.get(url, params=params)
    data = res.json()

    movies = data.get("results", [])[:20]
    return MoviesResponse(results=movies)


#/search?query=영화이름 으로 TMDB에서 검색 결과 가져오기
@app.get(
    "/search",
    response_model=MoviesResponse,
    summary="영화 검색 (상위 5개 결과)"
)
async def search_movie(query: str = Query(..., min_length=1, description="검색할 영화 제목")):
    url = "https://api.themoviedb.org/3/search/movie"
    params = {
        "api_key": TMDB_API_KEY,
        "query": query,
        "language": "ko-KR"
    }

    async with httpx.AsyncClient() as client:
        res = await client.get(url, params=params)
    data = res.json()

    movies = data.get("results", [])[:5]
    return MoviesResponse(results=movies)
