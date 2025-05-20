import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`


* {margin: 0;
padding: 0;
box-sizing: border-box;
  font-family: "Blender Pro";
  src: url("/public/BlenderPro-Medium.ttf");

  body {
  color: white;
  height: 100vh;

  background: linear-gradient(
      220deg,
      rgba(104, 128, 128, 0.8),
      rgba(8, 20, 20, 0.9)
    ),
    url("https://images.pexels.com/photos/1552252/pexels-photo-1552252.jpeg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;

  input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
}
  
}`;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Global />
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
