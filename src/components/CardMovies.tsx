import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  getClearMovieDetails,
  removeFromFavorites,
  selecDetailstMovies,
  selectErrorDetails,
  selectFavorites,
  selectLoadingDetails,
} from "../store/movies/moviesSlice";
import { useNavigate } from "react-router-dom";
import { Movie } from "../types/types";
import { AppDispatch } from "../store/store";
import { Alert, Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { VscSearchStop } from "react-icons/vsc";

export const CardMovies: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const movieDetails = useSelector(selecDetailstMovies);
  const loadingDetails = useSelector(selectLoadingDetails);
  const errorDetails = useSelector(selectErrorDetails);

  if (loadingDetails) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (errorDetails) {
    return (
      <div>
        <Alert variant="danger fw-bold fs-2">
          <VscSearchStop /> {errorDetails}
        </Alert>
      </div>
    );
  }

  const handleClear = (): void => {
    dispatch(getClearMovieDetails());
  };

  const isMovieFavorite = (movie: Movie): boolean => {
    return favorites.some((favoriteMovie) => favoriteMovie.imdbID === movie.imdbID);
  };

  const handleToggleFavorite = (): void => {
    if (movieDetails) {
      if (isMovieFavorite(movieDetails)) {
        dispatch(removeFromFavorites(movieDetails));
      } else {
        dispatch(addToFavorites(movieDetails));
      }
    }
  };

  return (
    <Card className="card-movies m-2 p-2">
      {movieDetails ? (
        <>
          <Row>
            <Col className="d-flex flex-column align-items-center">
              <Card.Img
                className="rounded mb-2"
                style={{ maxWidth: "400px", width: "100%", height: "auto" }}
                variant="top"
                src={movieDetails.Poster}
                alt={movieDetails.Title}
              />
              <div className="d-flex flex-column align-items-center">
                <Button
                  style={{ maxWidth: "200px", marginBottom: "10px" }}
                  variant={isMovieFavorite(movieDetails) ? "danger" : "success"}
                  onClick={handleToggleFavorite}
                >
                  {isMovieFavorite(movieDetails) ? "Удалить из избранного" : "Добавить в избранное"}
                </Button>
                <Button style={{ maxWidth: "200px", marginBottom: "10px" }} variant="secondary" onClick={handleClear}>
                  Очистить
                </Button>
                <Button
                  style={{ maxWidth: "200px", marginBottom: "10px" }}
                  variant="info"
                  onClick={() => navigate("/ra-16-react-redux-toolkit/search")}
                >
                  К поиску
                </Button>
                <Button
                  style={{ maxWidth: "200px", marginBottom: "10px" }}
                  variant="info"
                  onClick={() => navigate("/ra-16-react-redux-toolkit/favorites")}
                >
                  К избранному
                </Button>
              </div>
            </Col>
            <Col>
              <Card.Body>
                <Card.Title>
                  <span className="text-decoration-underline">Название:</span> {movieDetails.Title}
                </Card.Title>
                <Card.Text>
                  <span className="text-decoration-underline">Год:</span> {movieDetails.Year}
                </Card.Text>
                <Card.Text>
                  <span className="text-decoration-underline">Выпущен:</span> {movieDetails.Released}
                </Card.Text>
                <Card.Text>
                  <span className="text-decoration-underline">Продолжительность:</span> {movieDetails.Runtime}
                </Card.Text>
                <Card.Text>
                  <span className="text-decoration-underline">Жанр:</span> {movieDetails.Genre}
                </Card.Text>
                <Card.Text>
                  <span className="text-decoration-underline">Директор:</span> {movieDetails.Director}
                </Card.Text>
                <Card.Text>
                  <span className="text-decoration-underline">Писатели: </span>
                  {movieDetails.Writer}
                </Card.Text>
                <Card.Text>
                  <span className="text-decoration-underline">Актеры:</span> {movieDetails.Actors}
                </Card.Text>
                <Card.Text>
                  <span className="text-decoration-underline">Сюжет: </span>
                  {movieDetails.Plot}
                </Card.Text>
                <Card.Text>
                  <span className="text-decoration-underline">Язык</span> {movieDetails.Language}
                </Card.Text>
                <Card.Text>
                  <span className="text-decoration-underline">Страна:</span> {movieDetails.Country}
                </Card.Text>
                <Card.Text>
                  <span className="text-decoration-underline">Награды:</span> {movieDetails.Awards}
                </Card.Text>
                <Card.Text>
                  <span className="text-decoration-underline">Средняя оценка:</span> {movieDetails.Metascore}
                </Card.Text>
                <Card.Text>
                  <span className="text-decoration-underline">Рейтинг imdb:</span> {movieDetails.imdbRating}
                </Card.Text>
                <Card.Text>
                  <span className="text-decoration-underline">Кассовая сбор:</span> {movieDetails.BoxOffice}
                </Card.Text>
              </Card.Body>
            </Col>
          </Row>
        </>
      ) : (
        <>
          <Card.Body>
            <Card.Text>Чтобы просмотреть информацию о фильме, введите в поисковой системе</Card.Text>
            <Button variant="info" onClick={() => navigate("/ra-16-react-redux-toolkit/search")}>
              К поиску
            </Button>
          </Card.Body>
        </>
      )}
    </Card>
  );
};

export default CardMovies;
