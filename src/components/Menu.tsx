import { Nav } from "react-bootstrap";
import { NavLink} from "react-router-dom";

export const Menu: React.FC = () => {
  const activeLink = ({ isActive }: { isActive: boolean }) => (isActive ? "nav-link bg-warning menu__item-active fw-bold" : "nav-link text-light");
  return (
    <Nav className="justify-content-center bg-success rounded">
      <Nav.Item>
        <NavLink className={activeLink} to="/ra-16-react-redux-toolkit/search" end>
          Поиск
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink className={activeLink} to="/ra-16-react-redux-toolkit/movie" >
          Просмотр карточки фильма
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink className={activeLink} to="/ra-16-react-redux-toolkit/favorites">
          Избранное
        </NavLink>
      </Nav.Item>
    </Nav>
  );
};
