import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {Card, Avatar, Col, Typography, Row, message } from "antd";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import './CoursesList.css'
import ReactNotification from "react-notifications-component"
import {store} from "react-notifications-component"
import 'animate.css'
import 'react-notifications-component/dist/theme.css'

import Search from "../search/Search";
//import video from "../../../../models/video";

const { Title } = Typography;
const { Meta } = Card;

function ListCourses() {
  const professor = useSelector((state) => state.professorReducer);
  const [Videos, setVideos] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchCategory, setSearchCategory] = useState("");
  console.log(Videos);


  const handleClickDelete =(title,message,type)=>{
    store.addNotification({
      title: title,
      message:message,
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

console.log(professor)

  const deleteCourse = (id) => {
    axios.delete(`/api/video/coursesList/${id}`);
    setVideos(
      Videos.filter((video) => {
        return (
          video._id != id , 
          handleClickDelete('Course Deleted Succesfully','Deleted','success')
          )
      })
    );
  };

  useEffect(() => {
    axios.get("/api/video/getVideos").then((response) => {
      if (response.data.success) {
        setVideos(response.data.videos);
      } else {
        alert("Failed to get videos");
      }
    });
  }, []);

  const renderCards = Videos.filter((course) =>
  course.category.toLowerCase().includes(searchCategory.toLowerCase())||course.title.toLowerCase().includes(searchCategory.toLowerCase()))
  .map((video, index) => {
    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);
    
    return (
     
      <div>
        
      <Col style={{ margin: 50}} col={6} md={6} xs={18} key={video._id}>
        <div className="cardCourse" style={{boxShadow:"1px 3px 1px rgb(255, 255, 255)"}}>
        <div style={{ position: "relative"}} >
          <Link to={`/video/${video._id}`}>
            <img style={{ width: "200px" }} src={`http://localhost:4000/${video.thumbnail}`} alt="hahah" />
            <div
              className="duration"
              style={{
                bottom: 0,
                right: 0,
                position: "absolute",
                margin: "4px",
                color: "#fff",
                backgroundColor: "rgba(17, 17, 17, 0.8)",
                opacity: 0.8,
                padding: "2px 4px",
                borderRadius: "2px",
                letterSpacing: "0.5px",
                fontSize: "12px",
                fontWeight: "500",
                lineHeight: "12px",
              }}
            >
              <span>
                {minutes} : {seconds}
              </span>
            </div>
          </Link>
        </div>
        <br />
        
         <span>{video.title}</span><br/>
        
        <span>{video.description}</span><br/>
{/*    <span style={{ marginLeft: "3rem" }}>{/*video.views}</span>*/}
        <span> {moment(video.createdAt).format("MMM Do YY")}</span>
        {professor.isAuthProfessor &&
        professor.professor._id === video.professor_id || professor?.professor?.isAdmin? (
          <div className='editDelete'>
            {" "}
            <button className="Deletebutton"
              onClick={() => {
                deleteCourse(video._id);
              }}
            >
              Delete
            </button >
            <Link className='editLink'  to={`/update/${video._id}`}>
            <button className="Editbutton" >
              Edit
            </button >
            </Link>
          </div>
        ) : "a"}
        </div>
      </Col>
      </div>
    );
  })


  return (
    <div >
      <ReactNotification/>

    <div style={{ width: "85%", margin: "3rem auto" }}>
      <Title className='Recomended'level={2}>Recomended</Title>
      <Search className="search" setSearchTitle={setSearchTitle} setSearchCategory={setSearchCategory}/>
      
    </div>
    <Row className='roww' >{renderCards}</Row>
    </div>
  );
  
  
}


export default ListCourses;

{
  /*import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getAllCourses, toggleAdd } from "../../JS/actions/lesson";

import Load from "../spinner/Spinner";
import Course from "../course/Course";

import "./CoursesList.css";
const CourseList = ({ search }) => {
//hook
//useState
//useselector

const courseList = useSelector(
(state) => state.courseReducer.courseList.listCourses
);

const loadCourse = useSelector((state) => state.courseReducer.loadCourse);

const professorAuth = useSelector(
(state) => state.professorReducer.isAuthProfessor
);

//usedispatch
const dispatch = useDispatch();
useEffect(() => {
dispatch(getAllCourses());
}, []);

return (
<div className="coursesList">
    {professorAuth ? (
    <Link to="/UploadCourse">
        {" "}
        <button onClick={() => dispatch(toggleAdd())}>Add Course</button>
    </Link>
    ) : null}
    {loadCourse ? (
    <Load />
    ) : (
    courseList &&
    courseList
        .filter(
        (course) =>
            course.name.toLowerCase().includes(search.toLowerCase()) ||
            course.courseFor.toLowerCase().includes(search.toLowerCase())
        )
        .map((el) => (
        <div>{<Course key={el._id} course={el} courseCard={true} />}</div>
        ))
    )}
</div>
);
};

export default CourseList;*/
}
