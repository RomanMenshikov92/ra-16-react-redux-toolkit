import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

test("renders App component", () => {
  render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );

  expect(screen.getByText("Поиск")).toBeInTheDocument();
  expect(screen.getByText("Search Page")).toBeInTheDocument();
});
