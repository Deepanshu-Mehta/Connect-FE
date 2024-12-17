import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Body from "./components/Body";
import Login from "./components/Login/Login";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed/Feed";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
      <Routes>
          <Route path="/" element={<Body />}>
              <Route path="landing" element={<LandingPage />} />
              <Route path="feed" element={<Feed/>} />
              <Route path="landing" element={<LandingPage />} />
              <Route path="login" element={<Login />} />
          </Route>
  </Routes>

      </BrowserRouter>
   </Provider> 
  );
}

export default App;
