import { createAsyncThunk } from "@reduxjs/toolkit";
import { searchMoviesStart, searchMoviesSuccess, searchMoviesFailure, getMovieDetailsFailure, getMovieDetailsStart, getMovieDetailsSuccess } from "./moviesSlice";
import { RootState } from "../store";
import { Movie } from "../../types/types";

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async (searchQuery: string, { dispatch }) => {
  try {
    dispatch(searchMoviesStart());
    const key = "64405bd2";
    const response = await fetch(`https://www.omdbapi.com/?apikey=${key}&s=${searchQuery}`);
    const data = await response.json();
    if (data.Response === "True") {
      dispatch(searchMoviesSuccess(data.Search));
    } else {
      dispatch(searchMoviesFailure("Не найдено"));
    }
  } catch (error) {
    dispatch(searchMoviesFailure("Ошибка при выборке фильмов"));
  }
});

export const fetchMovieDetails = createAsyncThunk("movies/fetchMovieDetails", async (imdbID: string, { dispatch }) => {
  try {
    dispatch(getMovieDetailsStart());
    const key = "64405bd2";
    const responseDetail = await fetch(`https://www.omdbapi.com/?apikey=${key}&i=${imdbID}`);
    const data = await responseDetail.json();
    if (data.Response === "True") {
      dispatch(getMovieDetailsSuccess(data));
    } else {
      dispatch(getMovieDetailsFailure("Не найдено"));
    }
  } catch (error) {
    dispatch(getMovieDetailsFailure("Ошибка при получения информации о фильме"));
  }
});

export const selectMovies = (state: RootState): Movie[] => state.movies.movies;
export const selectMovieDetails = (state: RootState): Movie | null => state.movies.movieDetails;
export const selectFavorites = (state: RootState): Movie[] => state.movies.favorites;
export const selectLoading = (state: RootState): boolean => state.movies.loading;
export const selectError = (state: RootState): string | null => state.movies.error;
export const selectLoadingDetails = (state: RootState): boolean => state.movies.loading;
export const selectErrorDetails = (state: RootState): string | null => state.movies.error;
