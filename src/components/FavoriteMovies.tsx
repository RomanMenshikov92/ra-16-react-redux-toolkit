import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFavorites, removeFromFavorites } from "../store/movies/moviesSlice";
import { AppDispatch } from "../store/store";
import { Row, Col, Button, Card, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { fetchMovieDetails } from "../store/movies/moviesThunks";

export const FavoriteMovies: React.FC = () => {
  const favorites = useSelector(selectFavorites);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handlePostClick = (imdbID: string): void => {
    dispatch(fetchMovieDetails(imdbID));
    navigate(`/ra-16-react-redux-toolkit/movie/${imdbID}`);
  };

  return (
    <Card className="favorites m-2 p-2">
      {favorites.length > 0 ? (
        <>
          <Row className="d-flex justify-content-center">
            <Button style={{ maxWidth: "200px", marginBottom: "10px" }} variant="info" onClick={() => navigate("/ra-16-react-redux-toolkit/search")}>
              К поиску
            </Button>
          </Row>
          <Row xs={1} sm={2} md={3} lg={4} className="g-4 justify-content-between">
            {favorites.map((favorite) => (
              <Col key={favorite.imdbID}>
                <Card className="d-flex flex-column align-items-center h-100 w-100">
                  <div style={{ maxWidth: 300, maxHeight: 400, overflow: "hidden" }}>
                    <Card.Img style={{ objectPosition: "center" }} variant="top" src={favorite.Poster} alt={favorite.Title} />
                  </div>
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <Card.Title>{favorite.Title}</Card.Title>
                    <Card.Text>({favorite.Year})</Card.Text>
                    <Nav className="d-flex justify-content-center mt-auto">
                      <Button className="mb-1" onClick={() => handlePostClick(favorite.imdbID)} variant="info">
                        Просмотр информации
                      </Button>
                      <Button onClick={() => dispatch(removeFromFavorites(favorite))} variant="danger">
                        Удалить из избранного
                      </Button>
                    </Nav>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <>
          <Card.Body>
            <Card.Text>Чтобы просмотреть список избранных фильмов, введите в поисковой системе и добавьте в избранное </Card.Text>
            <Button variant="info" onClick={() => navigate("/ra-16-react-redux-toolkit/search")}>
              К поиску
            </Button>
          </Card.Body>
        </>
      )}
    </Card>
  );
};

export default FavoriteMovies;
