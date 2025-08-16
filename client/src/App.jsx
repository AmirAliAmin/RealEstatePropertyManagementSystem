import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import Home from "./pages/user/Home";
import PropertyList from "./pages/user/PropertyList";
import About from "./pages/user/About";
import Layout from "./components/layout";

import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoutes>
              <Layout>
              <Home />
              </Layout>
            </ProtectedRoutes>
          }
        />
        <Route path="about" element={
          <ProtectedRoutes>
            <Layout>
            <About />
            </Layout>
          </ProtectedRoutes>
        } 
          />
        <Route path="propertyList" element={
          <ProtectedRoutes>
            <Layout>
            <PropertyList />
            </Layout>
          </ProtectedRoutes>
          } />
      </Routes>
    </Router>
  );
}


export default App;
