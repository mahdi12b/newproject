//  student Login todkhel ema fiha mochkel a voir 
import React from "react";
import { Route, Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { logout } from "../../JS/actions/student";
import {logoutProf} from "../../JS/actions/professor"


import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "./NavBarr.css";
import { Icon } from "react-icons-kit";
import { unlock } from "react-icons-kit/ikons/unlock";
import { mail } from "react-icons-kit/ikons/mail";
import { ic_stars } from "react-icons-kit/md/ic_stars";
import {ic_subdirectory_arrow_left} from 'react-icons-kit/md/ic_subdirectory_arrow_left'

import { ic_library_add } from "react-icons-kit/md/ic_library_add";

import { ic_subscriptions } from "react-icons-kit/md/ic_subscriptions";

const NavBarr = () => {

  const dispatch = useDispatch();
  const professor = useSelector((state) => state.professorReducer);
  const student = useSelector((state) => state.studentReducer); 
  return (
    <SideNav style={{ height: "100vh", position: "fixed" }}>
      <SideNav.Toggle />
      <SideNav.Nav style={{ opacity: 1 }} defaultSelected="home">
        <NavItem eventKey="home">
          <NavIcon>
            <Link to="/">
              <i className="fa fa-fw fa-home" style={{ fontSize: "1.75em" }} />
            </Link>
          </NavIcon>
          <NavText>Home</NavText>
        </NavItem>
        <NavItem eventKey="coursesList">
          <NavIcon>
            <Link to={"/coursesList"}>
              <Icon
                size={25}
                icon={ic_subscriptions}
                style={{ fontSize: "1.75em" }}
              />
            </Link>
          </NavIcon>
          <NavText>Courses List</NavText>
        </NavItem>

        <NavItem eventKey="favourite courses">
          <NavIcon>
            <Link to={"/favouriteCourses"}>
              <Icon size={25} icon={ic_stars} style={{ fontSize: "1.75em" }} />
            </Link>
          </NavIcon>

          <NavText>Favourite Courses </NavText>
        </NavItem>

        <NavItem eventKey="uploadCourse">
          <NavIcon>
            <Link to={"/UploadCourse"}>
              <Icon
                size={25}
                icon={ic_library_add}
                style={{ fontSize: "1.75em" }}
              />
            </Link>
          </NavIcon>
          <NavText>Upload Video</NavText>
        </NavItem>

        <NavItem eventKey="contact us">
          <NavIcon>
            <Link to="/contactus">
              <Icon size={25} icon={mail} style={{ fontSize: "1.75em" }} />
            </Link>
          </NavIcon>
          <NavText>contact us </NavText>
        </NavItem>
{(professor&&professor.isAuthProfessor)?
 <NavItem eventKey="home">
 <NavIcon>
   <Link to="/" onClick={() => dispatch(logoutProf())}>
   <Icon size={25} icon={ic_subdirectory_arrow_left} style={{ fontSize: "1.75em" }} />
   </Link>
 </NavIcon>
 <NavText>Logout</NavText>
</NavItem>
:
student&&student.isAuthStudent?
<NavItem eventKey="home">
 <NavIcon>
   <Link to="/" onClick={() => dispatch(logout())}>
   <Icon size={25} icon={ic_subdirectory_arrow_left} style={{ fontSize: "1.75em" }} />
   </Link>
 </NavIcon>
 <NavText>Logout</NavText>
</NavItem>
:
        <NavItem eventKey="logim-logout">
          <NavIcon>
            <Icon size={25} icon={unlock} style={{ fontSize: "1.75em" }} />
            
          </NavIcon>
          <NavText>SignIn</NavText>
          <NavItem eventKey="Signinprof">
            <NavText>
              <Link
                style={{ color: "gray", fontWeight: "500" }}
                to="/professor/signin"
              >
                Professor
              </Link>
            </NavText>
          </NavItem>
          <NavItem eventKey="signinstudent">
            <NavText>
              <Link
                style={{ color: "gray", fontWeight: "500" }}
                to="/student/signin"
              >
                Student
              </Link>
            </NavText>
          </NavItem>
        </NavItem>
}
      </SideNav.Nav>
    </SideNav>
  );
};

export default NavBarr;
/*  {isAuthStudent ? (
          <NavItem eventKey="logout">
            <NavIcon>
              <Link to="/" onClick={() => dispatch(logout())}>
                <Icon size={25} icon={ic_lock} style={{ fontSize: "1.75em" }} />
              </Link>
            </NavIcon>
            <NavText>logout</NavText>
          </NavItem>
        ) : isAuthProfessor ? (
          <NavItem eventKey="logout">
            <NavIcon>
              <Link to="/" onClick={() => dispatch(logout())}>
                <Icon size={25} icon={ic_lock} style={{ fontSize: "1.75em" }} />
              </Link>
            </NavIcon>
            <NavText>logout</NavText>
          </NavItem>
        ) : (
          <NavItem eventKey="logim-logout">
            <NavIcon>
              <Icon size={25} icon={unlock} style={{ fontSize: "1.75em" }} />
            </NavIcon>
            <NavText>SignIn</NavText>
            <NavItem eventKey="Signinprof">
              <NavText>
                <Link
                  style={{ color: "gray", fontWeight: "500" }}
                  to="/professor/signin"
                >
                  Professor
                </Link>
              </NavText>
            </NavItem>
            <NavItem eventKey="signinstudent">
              <NavText>
                <Link
                  style={{ color: "gray", fontWeight: "500" }}
                  to="/student/signin"
                >
                  Student
                </Link>
              </NavText>
            </NavItem>
          </NavItem>
            
            
          {professor&&professor.isAuthProfessor?
        )}*/
