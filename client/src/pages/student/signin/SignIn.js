import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, videErrors } from "../../../JS/actions/student";
import { Link } from "react-router-dom";
import { Button } from "antd";
import ReactNotification from "react-notifications-component"
import {store} from "react-notifications-component"
import 'animate.css'
import 'react-notifications-component/dist/theme.css'
import "./SignIn.css";

const SignIn = ({ history }) => {
  const [student, setStudent] = useState({});

  const dispatch = useDispatch();

  const errors = useSelector((state) => state.studentReducer.errors);
  console.log(errors);
  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    return () => {
      dispatch(videErrors());
    };
  }, []);


  const handleClickError =(title,message,type)=>{
    store.addNotification({
      title: title,
      message: message,
      type: type,
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 2000,
        showIcon:true,
      },
      width:500,
    });
  }

  return (
    
    <div>
       <ReactNotification/>
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}></div>
      <div className="bg-img">
        <div className="content">
          <header>Student Login</header>
          <form action="#">
            <div className="field">
              <span className="fa fa-user" />
              <input
                className="mb-4"
                type="text"
                name="email"
                onChange={handleChange}
                placeholder="Enter a valid email address"
              />{" "}
            </div>
            <div className="field space">
              <span className="fa fa-lock" />
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Enter password"
              />{" "}
              <span className="show">SHOW</span>
            </div>
            <Button
              style={{ marginTop: 30, marginBottom: 15 }}
              type="submit"
              className="btn btn-blue text-center primary"
              onClick={(e) => {
                 e.preventDefault();
                  dispatch(login(student, history));
              }}
            >
              SignIn
            </Button>{" "}
          </form>

          <div className="signup">
            Don't have account?
            <a className="text-danger ">
              <Link style={{ color: "#dd4040" }} to="/student/signup">
                Register
              </Link>{" "}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

/*
<div className="login">Or login with</div>
<div className="links">
  <div className="facebook">
    <i className="fab fa-facebook-f">
      <span>Facebook</span>
    </i>
  </div>
  <div className="instagram">
    <i className="fab fa-instagram">
      <span>Instagram</span>
    </i>
  </div>
</div>
<div className="signup">
  Don't have account?*/
