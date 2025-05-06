import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/use-auth";
import styles from "../Styles/HomePage.module.css";

const HomePage = () => {
  const { isAuth } = useAuth();
  return isAuth ? (
    <div className={styles.homePageWrapper}>
      <div className={styles.homePageMain}>
        <p style={{ fontSize: "50px" }}>
          GO HARD OR GO HOME <br />
          <br />I feel like the sky is fallin' down,
          <br />
          Ain't nobody here to play around,
          <br /> Push it to the edge, I won't back down,
          <br /> ‘Cause it's time to go hard or go home.
        </p>
        <p className={styles.homePageAnimText}>
          For money you can buy luxury villa, super cars, yacht ...
        </p>
        <p className={styles.homePageAnimTextBr}>
          but you can't buy beautiful and strong body.
        </p>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default HomePage;
