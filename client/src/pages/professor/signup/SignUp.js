import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";

import { register, videErrors } from "../../../JS/actions/professor";

const SignUp = ({ history }) => {
  const [professor, setProfessor] = useState({});
  const errors = useSelector((state) => state.professorReducer);
  console.log(`this is the error ${errors}`);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setProfessor({ ...professor, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    return () => {
      dispatch(videErrors());
    };
  }, []);
  return (
    <div>
      <div className="bg-img">
        <div className="content">
          <header>Login Form</header>
          <form action="#">
            <div className="field">
              <span className="fa fa-user" />
              <input
                className="mb-4"
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="Enter a valid Name"
              />{" "}
            </div>

            <div className="field space">
              <div className="field">
                <span className="fa fa-user" />
                <input
                  className="mb-4"
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  placeholder="Enter a valid LastName"
                />
              </div>
            </div>

            <div className="field space">
              <div className="field">
                <span className="fa fa-user" />
                <input
                  className="mb-4"
                  type="text"
                  name="email"
                  onChange={handleChange}
                  placeholder="Enter a valid email address"
                />
              </div>
            </div>

            <div className="field space">
              <span className="fa fa-lock" />
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Enter password"
              />
              <span className="show">SHOW</span>
            </div>
            <div className="field space">
              <div className="field">
                <span className="fa fa-user" />
                <input
                  className="mb-4"
                  type="text"
                  name="adminCode"
                  onChange={handleChange}
                  placeholder="Enter your secret code"
                />
              </div>
            </div>
            <div className="pass">
              <a href="#">Forgot Password?</a>
            </div>
            <div className="row mb-3 px-3">
              {" "}
              <Button
                style={{ marginTop: 30, marginBottom: 15 }}
                type="submit"
                className="btn btn-blue text-center"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(register(professor, history));
                }}
              >
                SignUp
              </Button>{" "}
            </div>
          </form>

          <div className="signup">Thunks</div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

/*
<div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
      <div className="card card0 border-0">
        <div className="row d-flex">
          <div className="col-lg-6">
            {" "}
            <img src="https://i.imgur.com/uNGdWHi.png" className="image" />
          </div>{" "}
          <div className="col-lg-6">
            <div className="card2 card border-0 px-4 py-5">
              <div className="row mb-4 px-3">
                <h6 className="mb-0 mr-4 mt-2">Sign in with</h6>
                <div className="facebook text-center mr-3">
                  <i className="fab fa-facebook-f"></i>
                </div>
                <div className="twitter text-center mr-3">
                  <i className="fab fa-twitter"></i>
                </div>
                <div className="linkedin text-center mr-3">
                  <i className="fab fa-linkedin"></i>
                </div>
              </div>
              <div className="row px-3 mb-4">
                <div className="line" />{" "}
                <small className="or text-center">Or</small>
                <div className="line" />
              </div>
              <div className="row px-3">
                {" "}
                <label className="mb-1">
                  <h6 className="mb-0 text-sm">Name</h6>
                </label>{" "}
                <input
                  className="mb-4"
                  type="text"
                  name="name"
                  onChange={handleChange}
                  placeholder="Enter a valid Name"
                />{" "}
              </div>
              <div className="row px-3">
                {" "}
                <label className="mb-1">
                  <h6 className="mb-0 text-sm">LastName</h6>
                </label>{" "}
                <input
                  className="mb-4"
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  placeholder="Enter a valid LastName"
                />{" "}
              </div>
              <div className="row px-3">
                {" "}
                <label className="mb-1">
                  <h6 className="mb-0 text-sm">Email Address</h6>
                </label>{" "}
                <input
                  className="mb-4"
                  type="text"
                  name="email"
                  onChange={handleChange}
                  placeholder="Enter a valid email address"
                />{" "}
              </div>
             
              <div className="row px-3">
                {" "}
                <label className="mb-1">
                  <h6 className="mb-0 text-sm">Password</h6>
                </label>{" "}
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="Enter password"
                />{" "}
              </div>
              <div className="row mb-3 px-3">
                {" "}
                <button
                  type="submit"
                  className="btn btn-blue text-center"
                  onClick={() => dispatch(register(professor, history))}
                >
                  SignUp
                </button>{" "}
              </div>
              <div className="row mb-4 px-3">
                {" "}
                <small className="font-weight-bold">
                  you have an account?{" "}
                  <Link to="/professor/signin">
                    SignIn
                  </Link>
                </small>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
 



    
    
    
   */
