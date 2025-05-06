import styles from "../Styles/Form.module.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../store/slices/userSlice";
import { useState } from "react";
import {
  IoMailSharpIco,
  RiLockPasswordFillIco,
  IoMdEyeOffIco,
  IoEyeIco,
  FcGoogleIco,
  BsFacebookIco,
} from "../../models";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passEye, setPassEye] = useState(true);
  const [authErr, setAuthErr] = useState(true);

  const authInvalidUser = () => {
    setAuthErr(!authErr);
    setTimeout(() => {
      setAuthErr(!!authErr);
    }, 2500);
  };

  const handleLogin = (email: string, password: string): void => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        localStorage.setItem("user", JSON.stringify(user));

        console.log(user);

        dispatch(setUser({ currentUser: user }));
        navigate("/");
      })
      .catch((error) => {
        authInvalidUser();
      });
  };

  return (
    <div className={styles.mainForm}>
      <div>
        <IoMailSharpIco className={styles.formLogo} />
        <input
          className={authErr ? styles.formInput : styles.formInputErr}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        ></input>
      </div>
      <div>
        <RiLockPasswordFillIco className={styles.formLogo} />
        <input
          className={authErr ? styles.formInput : styles.formInputErr}
          type={passEye ? "password" : "text"}
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="password"
        />

        {passEye ? (
          <IoMdEyeOffIco
            className={styles.passEye}
            onClick={() => {
              setPassEye(!passEye);
            }}
          />
        ) : (
          <IoEyeIco
            className={styles.passEye}
            onClick={() => {
              setPassEye(!passEye);
            }}
          />
        )}
      </div>

      <div className={styles.buttonsBox}>
        <button
          disabled={!authErr}
          className={styles.formButton}
          onClick={() => handleLogin(email, pass)}
        >
          Login
        </button>
        <button className={styles.formButton}>
          <FcGoogleIco className={styles.mediaLogo} />
        </button>
        <button className={styles.formButton}>
          <BsFacebookIco className={styles.mediaLogo} />
        </button>
      </div>
      <div className={styles.mediForgot}>
        <p>Forgot password?</p>
        <p>
          Or <Link to="/register">Signup</Link>
        </p>
      </div>
      {authErr || (
        <p className={styles.loginErr}>Your email or password was incorrect!</p>
      )}
    </div>
  );
};

export default LoginPage;
