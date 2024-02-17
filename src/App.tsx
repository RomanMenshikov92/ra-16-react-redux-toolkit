import { Route, Routes } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import MoviePage from "./pages/MoviePage";
import FavoritePage from "./pages/FavoritePage";
import { Layout } from "./layout/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/ra-16-react-redux-toolkit/" element={<Layout />}>
        <Route index path="/ra-16-react-redux-toolkit/search" element={<SearchPage />} />
        <Route path="/ra-16-react-redux-toolkit/movie/" element={<MoviePage />}>
          <Route path="/ra-16-react-redux-toolkit/movie/:id" element={<MoviePage />} />
        </Route>
        <Route path="/ra-16-react-redux-toolkit/favorites" element={<FavoritePage />} />
      </Route>
    </Routes>
  );
}

export default App;
