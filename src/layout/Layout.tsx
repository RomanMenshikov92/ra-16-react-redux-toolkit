import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { Menu } from "../components/Menu";
import { FaArrowDown } from "react-icons/fa";

export const Layout: React.FC = (): JSX.Element => {
  const [linkClicked, setLinkClicked] = useState<boolean>(false);

  const handleClick = (): void => {
    setLinkClicked(true);
  };

  return (
    <Container style={{ minHeight: "100vh" }}>
      <Row className="pb-2">
        <Col className="d-flex justify-content-center bg-limegreen">
          <header className="text-center">
            <h1 className="text-center">Задание:</h1>
            <h2 className="text-center mb-5">Поиск фильмов по каталогу IMDb и добавление найденных фильмов в "Избранное"</h2>
            <div className={`text-center fw-bold rounded mb-5 p-2 d-flex justify-content-center ${linkClicked ? "visited" : "arrow"}`}>
              <Link to="/ra-16-react-redux-toolkit/search" onClick={handleClick}>
                <FaArrowDown /> Нажмите на меню <FaArrowDown />
              </Link>
            </div>
            {linkClicked && <Menu />}
          </header>
        </Col>
      </Row>
      <Row>
        <Col>
          <main className="text-center">
            {linkClicked && <Outlet />}
          </main>
        </Col>
      </Row>
    </Container>
  );
};
export default Layout;