import React, { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { fetchMovies } from "../store/movies/moviesThunks";
import { searchClearMovies, selectMovies } from "../store/movies/moviesSlice";
import { Button, Form, InputGroup } from "react-bootstrap";

export const SearchForm: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const dispatch: AppDispatch = useDispatch();
  const movies = useSelector(selectMovies);

  const handleSearch = (e: React.FormEvent): void => {
    e.preventDefault();
    dispatch(fetchMovies(searchQuery));
  };

  const handleClearList = (): void => {
    dispatch(searchClearMovies());
    setSearchQuery("");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Form className="form-search m-2 p-2" onSubmit={handleSearch}>
      {movies.length > 0 ? (
        <InputGroup size="lg" className="mb-3">
          <Form.Control type="text" placeholder="Введите название фильма по-английски" value={searchQuery} onChange={handleInputChange} />
          <Button variant="primary" type="submit">
            Поиск
          </Button>
          <Button variant="danger" onClick={handleClearList}>
            Очистить
          </Button>
        </InputGroup>
      ) : (
        <InputGroup size="lg" className="mb-3">
          <Form.Control type="text" placeholder="Введите название фильма по-английски" value={searchQuery} onChange={handleInputChange} />
          <Button variant="primary" type="submit">
            Поиск
          </Button>
        </InputGroup>
      )}
    </Form>
  );
};

export default SearchForm;
