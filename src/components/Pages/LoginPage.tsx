import styles from "../Styles/Form.module.css";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInAnonymously,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../store/slices/userSlice";
import { useState } from "react";
import { FcGoogleIco, BsFacebookIco } from "../../models";
import { Link } from "react-router-dom";
import { Button, Input, Checkbox, Flex, Form } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { initializeApp } from "firebase/app";
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

const LoginPage: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authErr, setAuthErr] = useState(true);

  const authInvalidUser = () => {
    setAuthErr(!authErr);
    setTimeout(() => {
      setAuthErr(!!authErr);
    }, 2500);
  };

  const auth = getAuth(
    initializeApp({
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
      measurementId: "G-RXKDRZ24T9",
    })
  );

  signInAnonymously(auth)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Анонимный пользователь:", user.uid);
    })
    .catch((error) => {
      console.error("Ошибка анонимной авторизации", error);
    });

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
    <MainForm className={styles.mainForm}>
      <Form
        name="login"
        initialValues={{ remember: true }}
        style={{ maxWidth: 360 }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            onChange={(e) => setEmail(e.target.value)}
            size="large"
            prefix={<UserOutlined />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password
            onChange={(e) => setPass(e.target.value)}
            size="large"
            visibilityToggle={{
              visible: passwordVisible,
              onVisibleChange: setPasswordVisible,
            }}
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a href="">Forgot password</a>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button
            onClick={() => handleLogin(email, pass)}
            disabled={!authErr}
            block
            type="primary"
            htmlType="submit"
          >
            Log in
          </Button>
        </Form.Item>
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Button>
              <BsFacebookIco className={styles.mediaLogo} />
            </Button>
            <Button>
              <FcGoogleIco className={styles.mediaLogo} />
            </Button>
            or <Link to="/register">Register now!</Link>
          </Flex>
        </Form.Item>
      </Form>
    </MainForm>
    // <form className={styles.mainForm}>
    //   <div>
    //     <Space direction="vertical">
    //       <Input
    //         size="large"
    //         type="email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         placeholder="email"
    //       ></Input>
    //     </Space>
    //   </div>
    //   <div>
    //     <Space direction="horizontal">
    //       <Input.Password
    //         visibilityToggle={{
    //           visible: passwordVisible,
    //           onVisibleChange: setPasswordVisible,
    //         }}
    //         type="password"
    //         size="large"
    //         value={pass}
    //         onChange={(e) => setPass(e.target.value)}
    //         placeholder="password"
    //       />
    //       <Button
    //         size="large"
    //         style={{ width: 80 }}
    //         onClick={() => setPasswordVisible((prevState) => !prevState)}
    //       >
    //         {passwordVisible ? "Hide" : "Show"}
    //       </Button>
    //     </Space>
    //   </div>

    //   <div className={styles.buttonsBox}>
    //     <Button
    //       type="primary"
    //       disabled={!authErr}
    //       className={styles.formButton}
    //       onClick={() => handleLogin(email, pass)}
    //     >
    //       Login
    //     </Button>
    //     <Button className={styles.formButton}>
    //       <FcGoogleIco className={styles.mediaLogo} />
    //     </Button>
    //     <Button className={styles.formButton}>
    //       <BsFacebookIco className={styles.mediaLogo} />
    //     </Button>
    //   </div>
    //   <div className={styles.mediForgot}>
    //     <p>Forgot password?</p>
    //     <p>
    //       Or <Link to="/register">Signup</Link>
    //     </p>
    //   </div>
    //   {authErr || (
    //     <p className={styles.loginErr}>Your email or password was incorrect!</p>
    //   )}
    // </form>
  );
};

export default LoginPage;
