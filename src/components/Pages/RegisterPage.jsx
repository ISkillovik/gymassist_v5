import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";
import { useState } from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import Swal from "sweetalert2";
import { IoMailSharp } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { Link } from "react-router-dom";
import styles from "../Styles/Form.module.css";
import styled from "styled-components";

const MainForm = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 520px;
  width: 400px;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  border-left: 3px solid rgba(255, 255, 255, 0.1);
  border-right: 3px solid rgba(255, 255, 255, 0.1);
`;

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [pass, setPass] = useState("");
  const [passEye, setPassEye] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authErr, setAuthErr] = useState(true);

  const strongOrWeak = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);

    const issues = [];

    if (password.length < 8 || password.length > 12) {
      issues.push(`Password must be at least 8 and maximum of 12 characters.`);
    }
    if (!hasUpperCase) {
      issues.push("Password must contain at least one uppercase letter.");
    }
    if (!hasLowerCase) {
      issues.push("Password must contain at least one lowercase letter.");
    }
    if (!hasNumbers) {
      issues.push("Password must contain at least one number.");
    }

    return issues.length === 0 ? "Password is strong." : `${issues.join(" ")}`;
  };

  strongOrWeak(pass);

  console.log(strongOrWeak(pass));

  const invalidRegUser = () => {
    setAuthErr(!authErr);
    setTimeout(() => {
      setAuthErr(!!authErr);
    }, 2500);
  };

  const handleRegister = (email, password) => {
    const auth = getAuth();

    if (strongOrWeak(pass) === "Password is strong.") {
      createUserWithEmailAndPassword(auth, email, password)
        .then(({ user }) => {
          dispatch(setUser({ currentUser: user }));
          navigate("/");
          console.log(user);
          updateProfile(auth.currentUser, {
            displayName: userName,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              localStorage.setItem("user", JSON.stringify(user));
              console.log("prof upd", auth.currentUser); // Profile updated!
              // ...
            })
            .catch((error) => {});
        })
        .catch(() => {
          invalidRegUser();
        });
    } else {
      Swal.fire({
        text: `${strongOrWeak(pass)}`,
        confirmButtonColor: "rgb(78, 97, 97)",
        confirmButtonText: "ok",
      });
    }
  };
  return (
    <MainForm className={styles.mainForm}>
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
        <FaUser className={styles.formLogo} />
        <input
          className={authErr ? styles.formInput : styles.formInputErr}
          type="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="username"
        />
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
          className={styles.formButton}
          onClick={() => handleRegister(email, pass)}
        >
          SignUp
        </button>
        <button className={styles.formButton}>
          <FcGoogle className={styles.mediaLogo} />
        </button>
        <button className={styles.formButton}>
          <BsFacebook className={styles.mediaLogo} />
        </button>
      </div>
      <div className={styles.mediForgot}>
        <p>Already have an account?</p> <Link to="/login">Login</Link>
      </div>
      {authErr || (
        <p className={styles.loginErr}>Your email or password was incorrect!</p>
      )}
    </MainForm>
  );
};

export default RegisterPage;
