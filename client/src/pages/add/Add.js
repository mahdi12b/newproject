import React, { useEffect, useState } from "react";
import {useHistory}  from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { postCourse,editCourse } from "../../JS/actions/lesson";
import "./Add.css";
const Add = ({history}) => {
  const [course, setCourse] = useState({});
  // const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState();
  const courseReducer = useSelector((state) => state.courseReducer.courseList.listCourses);
  console.log(courseReducer)
  const edit = useSelector((state) => state.courseReducer.edit);
  const dispatch = useDispatch();
  const History = useHistory();
  useEffect(() => {
    edit
    ? setCourse(courseReducer)
    :setCourse({name:"",email:"",phone:""})
}, [courseReducer,edit]);
const handleChange =(e)=>{
   e.preventDefault();
    edit
    ?
    dispatch(editCourse(courseReducer._id,course))
    : dispatch(postCourse(course))
    History.push("/");
}
    const handleCourse = (e)=>{
        setCourse({...course,[e.target.name]: e.target.value})
    } 
  return (
    <div>
      <div className="add">
        <label>Video</label>
        <input name="video" value={course.video} onChange={handleCourse} />
      </div>
      <div className="add">
        <label>Exercice</label>
        <input name="exercice" value={course.exercice} onChange={handleCourse} />
      </div>
      <div className="add">
        <label>name</label>
        <input name="name" value={course.name} onChange={handleCourse} />
      </div>
      <div className="add">
        <label>matiere</label>
        <input name="matiere" value={course.matiere} onChange={handleCourse} />
      </div>
      <div className="add">
        <label>courseFor</label>
        <input name="courseFor" value={course.courseFor} onChange={handleCourse} />
      </div>
      <button onClick={(e)=>handleChange(e)}>{edit?'edit':'add'}</button>

    </div>
  );
};

export default Add;