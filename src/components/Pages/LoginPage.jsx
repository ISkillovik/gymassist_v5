import styles from "../Styles/Form.module.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../store/slices/userSlice";
import { useState } from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMailSharp } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
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

  const handleLogin = (email, password) => {
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
        <IoMailSharp className={styles.formLogo} />
        <input
          className={authErr ? styles.formInput : styles.formInputErr}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        ></input>
      </div>
      <div>
        <RiLockPasswordFill className={styles.formLogo} />
        <input
          className={authErr ? styles.formInput : styles.formInputErr}
          type={passEye ? "password" : "text"}
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="password"
        />

        {passEye ? (
          <IoMdEyeOff
            className={styles.passEye}
            onClick={() => {
              setPassEye(!passEye);
            }}
          />
        ) : (
          <IoEye
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
          <FcGoogle className={styles.mediaLogo} />
        </button>
        <button className={styles.formButton}>
          <BsFacebook className={styles.mediaLogo} />
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
