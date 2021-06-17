import { Route, Switch, useHistory } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Row, Col } from "antd";
import { useSelector } from "react-redux";

import NavBarr from "./Components/NavBarr/NavBarr";
import LandPage from "./pages/landPage/LandPage";
import ContactUs from "./pages/contactus/ContactUs";
import ProfileStudent from "./pages/student/profile/Profile";
import ProfileProfessor from "./pages/professor/profile/Profile";
import SignInStudent from "./pages/student/signin/SignIn";
import SignInProfessor from "./pages/professor/signin/SignIn";
import SignUpStudent from "./pages/student/signup/SignUp";
import SignUpProfessor from "./pages/professor/signup/SignUp";
import Courses from "./pages/courses/Courses";
import UploadVideo from "./pages/uploadVideo/UploadVideo";
import UpdateCourse from "./pages/updateCourse/UpdateCourse";
import DetailCourse from "./pages/detailCourse/DetailCourse";
import FavouriteCourses from "./pages/favouritecourses/FavouriteCourses";
import PrivateRoute from "./router/PrivateRoute";
import Errors from "./pages/errors/Errors";
import { currentStudent } from "./JS/actions/student";
import { currentProfessor } from "./JS/actions/professor";
import UsersManagment from"./pages/usersManagment/UsersManagment"
import "./App.css";
import "antd/dist/antd.css";

function App() {
  const dispatch = useDispatch();

  const history = useHistory();
  const professor = useSelector((state) => state.professorReducer);


  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(currentStudent());
      dispatch(currentProfessor());
    }
  }, []);

  return (
    <Row className="App">
      {/* <NavBar />*/}
      <Col xl={1} xs={3} md={2}>
        <NavBarr />
      </Col>
      <Col xl={23} xs={21} md={22}>
        <Switch>
          <Route exact path="/" component={LandPage} />
          <Route exact path="/ContactUs" component={ContactUs} />
          <Route exact path="/student/signin" component={SignInStudent} />
          <Route exact path="/professor/signin" component={SignInProfessor} />
          <Route exact path="/student/signup" component={SignUpStudent} />
          <Route exact path="/professor/signup" component={SignUpProfessor} />
          <Route exact path="/coursesList" component={Courses} />
          <PrivateRoute
            exact
            path="/student/profile"
            component={ProfileStudent}
          />
          <PrivateRoute
            exact
            path="/professor/profile"
            component={ProfileProfessor}
          />
          <PrivateRoute path="/UploadCourse" component={UploadVideo} />
          <PrivateRoute path="/update/:id" component={UpdateCourse} />
          <PrivateRoute exact path="/video/:videoId" component={DetailCourse} />

          <PrivateRoute
            e
            path="/favouriteCourses"
            component={FavouriteCourses}
          />
          
          <PrivateRoute
        exact
      path='/users'
    component={UsersManagment}/>

          <Route path="/*" component={Errors} />
        </Switch>
      </Col>
    </Row>
  );
}

export default App;
