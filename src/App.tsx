import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/Pages/HomePage";
import LoginPage from "./components/Pages/LoginPage";
import RegisterPage from "./components/Pages/RegisterPage";
import { Provider } from "react-redux";
import { store } from "./components/store";
import "./firebase";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import MyProgress from "./components/Pages/MyProgress";
import MyWards from "./components/Pages/MyWards";
import Ward from "./components/Pages/Ward";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="App">
          <Routes>
            <Route path="login" Component={LoginPage} />
            <Route path="register" Component={RegisterPage} />
            <Route path="/" Component={MainLayout}>
              <Route index Component={HomePage} />
              <Route path="progress" Component={MyProgress} />
              <Route path="mywards" element={<MyWards />} />
              <Route path="mywards/:key" element={<Ward />} />
            </Route>
          </Routes>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
