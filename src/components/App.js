import React from "react";
import Signup from "./Signup";
import Signin from "./Signin";
import { Container } from "react-bootstrap";
import AuthProvider from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Dashboard from "./Dashboard";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";

function App() {
  return (
      <Container 
        className="d-flex align-items-center justify-content-center"
        style={{minHeight: "100vh"}}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Router>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<PrivateRoute />}>
                  <Route exact path="/dashboard" element={ <Dashboard />}></Route>
                </Route>
                <Route path="/" element={<PrivateRoute />}>
                  <Route exact path="/update-profile" element={ <UpdateProfile />}></Route>
                </Route>
                <Route path="/signup" element={<Signup/>}></Route>
                <Route path="/signin" element={<Signin/>}></Route>
                <Route path="/forgot-password" element={<ForgotPassword />}></Route>
              </Routes>
            </AuthProvider>
          </Router>
        </div>
      </Container>
  );
}

export default App;
