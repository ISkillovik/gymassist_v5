import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "../store/slices/userSlice";
import styles from "../Styles/NavMenu.module.css";
import { useState } from "react";
import useAuth from "../../hooks/use-auth";

const NavMenu = () => {
  const dispatch = useDispatch();
  const { isAuth, email } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  //const userName = useSelector((state) => state.user.currentUser.displayName);

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
        {/* {userName ? (
          <li>
            <Link>{userName}</Link>
          </li>
        ) : (
          ""
        )} */}

        <li>
          <Link>About</Link>
        </li>
        <li>
          <Link to={"/progress"}>My Progress</Link>
        </li>
        <li>
          <Link>Settings</Link>
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
