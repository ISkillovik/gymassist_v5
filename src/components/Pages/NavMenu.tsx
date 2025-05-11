import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { removeUser } from "../store/slices/userSlice";
import styles from "../Styles/NavMenu.module.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const NavMenu = () => {
  const dispatch = useAppDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const getUserInfoFromLocalS = () => {
    const fromStorage = localStorage.getItem("user");
    return fromStorage ? JSON.parse(fromStorage).displayName : null;
  };

  console.log(getUserInfoFromLocalS());

  return (
    <nav className={styles.NavCountain}>
      <Link to={"/"} className={styles.NavLogo}>
        <img
          src={require("../../icons/gym-logo.png")}
          alt=""
          className={styles.logo}
        />
        <p>GymAsist</p>
      </Link>
      <label className={styles.hamburgerMenu}>
        <input
          onChange={() => {
            setMenuOpen(!menuOpen);
          }}
          type="checkbox"
        />
      </label>

      <ul className={menuOpen ? styles.OpenMenu : ""}>
        <li>
          <Link to="">{getUserInfoFromLocalS()}</Link>
        </li>

        <li>
          <NavLink to={"/mywards"}>My wards</NavLink>
        </li>
        <li>
          <Link to={"/progress"}>My Progress</Link>
        </li>
        <li>
          <Link to="">Settings</Link>
        </li>
        <li
          onClick={() => {
            localStorage.clear();
            dispatch(removeUser(), window.location.reload());
          }}
        >
          <Link to={"/"} className={styles.NavLogo}>
            Log out
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavMenu;
