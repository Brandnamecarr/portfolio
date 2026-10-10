import { NavLink } from "react-router-dom";
import "./Nav.css";

export default function Nav() {
  return (
    <nav className="nav">
      <NavLink to="/" className="nav__brand">
        Brandon Carr
      </NavLink>
      <div className="nav__links">
        <NavLink to="/" className="nav__link" end>
          Home
        </NavLink>
        <NavLink to="/projects" className="nav__link">
          Projects
        </NavLink>
        <NavLink to="/contact" className="nav__link">
          Contact
        </NavLink>
      </div>
    </nav>
  );
}
