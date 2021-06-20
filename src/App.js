import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home/Home";
import NotFound from "./components/NotFound/NotFound";
import AdminLayout from "./components/Admin/AdminLayout/AdminLayout";
import SeekerLayout from "./components/Seeker/SeekerLayout/SeekerLayout";
import EmployeeLayout from "./components/Employee/EmployeeLayout/EmployeeLayout";
import Login from "./components/Login/Login";
import SeekerSignUp from "./components/Signup/SeekerSignUp/SeekerSignUp";
import EmployerSignup from "./components/Signup/EmployerSignup/EmployerSignup";
import { createContext, useEffect } from "react";
import { useState } from "react";
import firebase from "firebase/app";
import { useContext } from "react";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

function App() {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const [isSeeker, setIsSeeker] = useState(false);
 

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/check-admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: currentUser?.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setIsAdmin(true);
        }
      });
  }, [currentUser?.email]);

  useEffect(() => {
    fetch("http://localhost:5000/check-employee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: currentUser?.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setIsEmployee(true);
        }
      });
  }, [currentUser?.email]);

  useEffect(() => {
    fetch("http://localhost:5000/check-seeker", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: currentUser?.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setIsSeeker(true);
        }
      });
  }, [currentUser?.email]);

  const authContextValue = {
    currentUser,
    setCurrentUser,
    isAdmin,
    setIsAdmin,
    isEmployee,
    setIsEmployee,
    isSeeker,
    setIsSeeker
  };

  return (
    <AuthContext.Provider value={authContextValue}>
        <Router>
          {!loading && (
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              {isAdmin && (
                <PrivateRoute path="/dashboard">
                  <AdminLayout />
                </PrivateRoute>
              )}
              {isEmployee && (
                <PrivateRoute path="/dashboard">
                <EmployeeLayout />
                </PrivateRoute>
              )}
              {isSeeker && (
                <PrivateRoute path="/dashboard">
                  <SeekerLayout />
                </PrivateRoute>
              )}
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/signup-employer">
                <EmployerSignup />
              </Route>
              <Route path="/signup-seeker">
                <SeekerSignUp />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          )}
        </Router>
    </AuthContext.Provider>
  );
}

export default App;
