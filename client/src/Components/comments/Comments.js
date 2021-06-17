import React, { useState } from "react";
import { Button, Input } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";

import OneComment from "../oneComment/OneComment";
import ReplyComment from "../replyComment/ReplyComment";

const { TextArea } = Input;

function Comments(props) {
  const professor = useSelector((state) => state.professorReducer);
  const student = useSelector((state) => state.studentReducer);
  const [Comment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    var variables = {};
    professor.isAuthProfessor
      ? (variables = {
          content: Comment,
          professor: professor.professor._id,
          postId: props.postId,
        })
      : (variables = {
          content: Comment,
          student: student.student._id,
          postId: props.postId,
        });
    if (professor.isAuthProfessor) {
      axios
        .post("/api/comment/saveComment/professor", variables)
        .then((response) => {
          if (response.data.success) {
            setComment("");
            props.refreshFunction(response.data.result);
          } else {
            alert("Failed to save Comment");
          }
        });
    } else {
      axios
        .post("/api/comment/saveComment/student", variables)
        .then((response) => {
          if (response.data.success) {
            setComment("");
            props.refreshFunction(response.data.result);
          } else {
            alert("Failed to save Comment");
          }
        });
    }
  };

  return (
    <div>
      <br />
      <p> replies</p>
      <hr />

      {props.CommentLists &&
        props.CommentLists.map(
          (comment, index) =>
            !comment.responseTo && (
              <div>
                <OneComment
                  comment={comment}
                  postId={props.postId}
                  refreshFunction={props.refreshFunction}
                />
                <ReplyComment
                  CommentLists={props.CommentLists}
                  postId={props.postId}
                  parentCommentId={comment._id}
                  refreshFunction={props.refreshFunction}
                />
              </div>
            )
        )}

      {/* Root Comment Form */}
      <form style={{ display: "flex" }} onSubmit={onSubmit}>
        <TextArea
          style={{ width: "100%", borderRadius: "5px" }}
          onChange={handleChange}
          value={Comment}
          placeholder="write some comments"
        />
        <br />
        <Button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Comments;
