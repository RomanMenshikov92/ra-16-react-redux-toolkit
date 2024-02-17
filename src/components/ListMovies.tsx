import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectMovies, selectLoading, selectError } from "../store/movies/moviesSlice";
import { useNavigate } from "react-router-dom";
import { VscSearchStop } from "react-icons/vsc";
import { Movie } from "../types/types";
import { ListGroup, Image, Alert } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { AppDispatch } from "../store/store";
import { fetchMovieDetails } from "../store/movies/moviesThunks";

export const ListMovies: React.FC = () => {
  const movies = useSelector(selectMovies);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (error) {
    return (
      <div>
        <Alert variant="danger fw-bold fs-2">
          <VscSearchStop /> {error}
        </Alert>
      </div>
    );
  }

  const handlePostClick = (imdbID: string): void => {
    dispatch(fetchMovieDetails(imdbID));
    navigate(`/ra-16-react-redux-toolkit/movie/${imdbID}`);
  };

  return (
    <div className="list-movies m-2 p-2">
      {movies.length > 0 && (
        <>
          <ListGroup className="gap-1">
            {movies.map((movie: Movie, index: number) => (
              <ListGroup.Item
                role="button"
                className="d-flex gap-3 align-items-center cursor-pointer"
                key={movie.imdbID}
                onClick={() => handlePostClick(movie.imdbID)}
              >
                <div className="px-2 py-1 mr-2 bg-primary text-light rounded">{index + 1}</div>
                <Image width={50} src={movie.Poster} rounded />
                <div className="fw-bold">{movie.Title}</div>
                <div>({movie.Year})</div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      )}
    </div>
  );
};

export default ListMovies;
