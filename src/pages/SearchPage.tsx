import React from "react";
import SearchForm from "../components/SearchForm";
import ListMovies from "../components/ListMovies";

export const SearchPage: React.FC = () => {
  return (
    <>
     <SearchForm></SearchForm>
     <ListMovies></ListMovies>
    </>
  );
};

export default SearchPage;