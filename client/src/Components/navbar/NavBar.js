import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../JS/actions/student";
import { logoutProf } from "../../JS/actions/professor";
import "./Navbar.css";
const NavBar = () => {
  const isAuthStudent = useSelector(
    (state) => state.studentReducer.isAuthStudent
  );
  const isAuthProfessor = useSelector(
    (state) => state.professorReducer.isAuthProfessor
  );

  const dispatch = useDispatch();
  return (
    <header>
      <Link to="/">
        <h2>WS_Authentification</h2>
      </Link>
      {isAuthStudent ? (
        <Link to="/" onClick={() => dispatch(logout())}>
          {" "}
          Logout
        </Link>
      ) : isAuthProfessor ? (
        <Link to="/" onClick={() => dispatch(logoutProf())}>
          {" "}
          Logout
        </Link>
      ) : (
        <div className="btns">
          <Link to="/student/signup"> SignUp</Link>

          <Link to="/student/signin">SignIn</Link>
        </div>
      )}
    </header>
  );
};

export default NavBar;
