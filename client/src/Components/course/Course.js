import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCourse, getCourse , toggleEdit } from "../../JS/actions/lesson";
import { Button } from "react-bootstrap";
import "./Course.css";

const Course = ({ course }) => {
    const dispatch = useDispatch();
    const handleEdit = (id)=>{
      dispatch(toggleEdit())
      dispatch(getCourse(id))
    }
  
    return (
      <div className="card">
        <div className="text">
          <p>{course.name}</p>
          <p>{course.courseFor}</p>
          <p>{course.matiere}</p>
          <p>{course.exercice}</p>
          <p></p>
        </div>
        <div className="btns">
          <Link to='/coursesList/edit'>
            <Button onClick={() => handleEdit(course._id)}>
              Edit Course
            </Button>
          </Link>
          <Button
            variant="danger"
            onClick={() => dispatch(deleteCourse(course._id))}
          >
            Delete
          </Button>
        </div>
      </div>
    );
  };
  
  export default Course;