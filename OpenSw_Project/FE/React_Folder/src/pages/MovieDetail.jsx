import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../Context/UserContext";
import axios from "axios";

function MovieDetail() {
  const { movieId } = useParams();
  const { isLogin, userData } = useContext(UserContext);

  const [movieDetail, setMovieDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        setLoading(true);
        // API URL에 movieId를 파라미터로 넣음
        const response = await axios.get(
          `https://movie-api-test-latest.onrender.com/movies/${movieId}`
        );
        setMovieDetail(response.data);
        setLoading(false);
      } catch (err) {
        setError("영화 정보를 불러오는데 실패했습니다.");
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [movieId]);

  if (loading) return <p>로딩중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>영화 ID: {movieId} 상세 페이지</h2>
      {isLogin ? (
        <>
          <p>로그인 사용자 ID: {userData.loginId}</p>
          <h3>{movieDetail.title}</h3>
          <img
            src={`https://image.tmdb.org/t/p/w300${movieDetail.poster_path}`}
            alt={movieDetail.title}
          />
          <p>{movieDetail.overview}</p>
          <p>개봉일: {movieDetail.release_date}</p>
          <p>평점: {movieDetail.vote_average}</p>
        </>
      ) : (
        <p>로그인 후 이용해주세요.</p>
      )}
    </div>
  );
}

export default MovieDetail;
