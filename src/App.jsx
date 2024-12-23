import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LandingPage from "./components/LandingPage/LandingPage";
import Body from "./components/Body";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import SignupLoginPage from "./components/SignupLoginPage";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const user = useSelector((store) => store.user);
  
  if (!user) {
    return <Navigate to="/signup-login" replace />;
  }
  
  return children;
};

// Auth Route Component - redirects to feed if already logged in
const AuthRoute = ({ children }) => {
  const user = useSelector((store) => store.user);
  
  if (user) {
    return <Navigate to="/feed" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/landing" replace />} />
          <Route 
            path="/landing" 
            element={
              <AuthRoute>
                <LandingPage />
              </AuthRoute>
            } 
          />
          <Route 
            path="/signup-login" 
            element={
              <AuthRoute>
                <SignupLoginPage />
              </AuthRoute>
            } 
          />

          {/* Protected Routes */}
          <Route 
            path="/*" 
            element={
              <ProtectedRoute>
                <Body />
              </ProtectedRoute>
            }
          >
            <Route 
              path="feed" 
              element={<Feed />} 
            />
            <Route 
              path="profile" 
              element={<Profile />} 
            />
            <Route 
              path="connections" 
              element={<Connections />} 
            />
            <Route 
              path="requests" 
              element={<Requests />} 
            />
            <Route 
              path="*" 
              element={<Navigate to="/feed" replace />} 
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;