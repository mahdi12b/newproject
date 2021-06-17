
import React from "react";
import CourseList from "../../Components/coursesList/CoursesList";
import {Col,Row} from 'antd'
import './Courses.css'


const Courses = () => {
  return (
    <div className="coursesPage">
      <Row className='boxx container'>
        <Col xs={24} xl={6}  className='llllll'> your welcome in Connecti kraya</Col>
        <Col xs={24} xl={10} className='kkk'><img className='kkk' src='/images/a.jpg'/></Col>
      </Row>
      <CourseList />
    </div>
  );
};

export default Courses;
