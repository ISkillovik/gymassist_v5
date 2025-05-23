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
import PhotoViewer from "./components/PhotoViewer";

function App() {
  return (
    <BrowserRouter>
      <PhotoViewer
        photoId={
          "https://media.licdn.com/dms/image/v2/C4E0BAQGeKsTj95nZ4Q/company-logo_200_200/company-logo_200_200/0/1630628078319/sdafa_strategy_defence_and_foreign_affairs_logo?e=2147483647&v=beta&t=Kr2cQ7a8sB87nEi1LOC8jvDQi8PXdXAofSDaFnFaiy8"
        }
        imageUrl={
          "https://media.licdn.com/dms/image/v2/C4E0BAQGeKsTj95nZ4Q/company-logo_200_200/company-logo_200_200/0/1630628078319/sdafa_strategy_defence_and_foreign_affairs_logo?e=2147483647&v=beta&t=Kr2cQ7a8sB87nEi1LOC8jvDQi8PXdXAofSDaFnFaiy8"
        }
      />
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
