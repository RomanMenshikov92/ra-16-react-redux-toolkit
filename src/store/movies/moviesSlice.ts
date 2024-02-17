import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Movie, MoviesState } from "../../types/types";

const initialState: MoviesState = {
  loading: false,
  error: null,
  movies: [],
  movieDetails: null,
  favorites: [],
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    // list movies
    searchMoviesStart(state) {
      state.loading = true;
      state.error = null;
      state.movies = [];
    },
    // clear list movies
    searchClearMovies(state) {
      state.movies = [];
    },
    // success list movies
    searchMoviesSuccess(state, action: PayloadAction<Movie[]>) {
      state.loading = false;
      state.movies = action.payload;
    },
    // failure list movies
    searchMoviesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    // movie details
    getMovieDetailsStart(state) {
      state.loading = true;
      state.error = null;
      state.movieDetails = null;
    },
    // clear movie details
    getClearMovieDetails(state) {
      state.movieDetails = null;
    },
    // success movie details
    getMovieDetailsSuccess(state, action: PayloadAction<Movie>) {
      state.loading = false;
      state.movieDetails = action.payload;
    },
    // failure movie details
    getMovieDetailsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    // added movie in favorites
    addToFavorites(state, action: PayloadAction<Movie>) {
      state.favorites.push(action.payload);
    },
    // remove movie from favorites
    removeFromFavorites(state, action: PayloadAction<Movie>) {
      state.favorites = state.favorites.filter((movie) => movie.imdbID !== action.payload.imdbID);
    },
  },
});

export const {
  searchMoviesStart,
  searchClearMovies,
  searchMoviesSuccess,
  searchMoviesFailure,
  getMovieDetailsStart,
  getClearMovieDetails,
  getMovieDetailsSuccess,
  getMovieDetailsFailure,
  addToFavorites,
  removeFromFavorites,
} = moviesSlice.actions;

export const selectLoading = (state: RootState): boolean => state.movies.loading;
export const selectError = (state: RootState): string | null => state.movies.error;
export const selectMovies = (state: RootState): Movie[] => state.movies.movies;
export const selectLoadingDetails = (state: RootState): boolean => state.movies.loading;
export const selectErrorDetails = (state: RootState): string | null => state.movies.error;
export const selecDetailstMovies = (state: RootState): Movie | null => state.movies.movieDetails;
export const selectFavorites = (state: RootState): Movie[] => state.movies.favorites;

export default moviesSlice.reducer;
