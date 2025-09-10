import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SignupPage from "./componenets/SignupPage";
import OtpPage from "./componenets/OtpPage";
// import LoginPage from "./pages/LoginPage";
import SingInPage from "./componenets/SingInPage";
import HomePage from "./componenets/HomePage";
import ProfilePage from "./componenets/ProfilePage";
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Default redirect to signup */}
        {/* <Route path="/" element={<Navigate to="/signup" />} /> */}

        {/* Auth Routes */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/otp" element={<OtpPage />} />
        <Route path="/signin" element={<SingInPage />} />

        {/* Dashboard (after login) */}
        <Route path="/" element={<HomePage/>} />
        <Route path="/profile" element={<ProfilePage/>} />
      </Routes>
    </Router>
  );
};

export default App;
