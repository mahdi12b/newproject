import React, { useState } from "react";
import { Comment, Avatar, Button, Input } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
const { TextArea } = Input;
function SingleComment(props) {
  const student = useSelector((state) => state.studentReducer);
  const professor = useSelector((state) => state.professorReducer);
  const [CommentValue, setCommentValue] = useState("");
  const [OpenReply, setOpenReply] = useState(false);

  const handleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };

  const openReply = () => {
    setOpenReply(!OpenReply);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    var variables = {};
    if (professor && professor.isAuthProfessor) {
      variables = {
        content: Comment,
        professor: professor.professor._id,
        postId: props.postId,
      };
    } else {
      variables = {
        content: Comment,
        student: student.student,
        postId: props.postId,
      };
    }

    if (professor.isAuthProfessor) {
      axios
        .post("/api/comment/saveComment/professor", variables)
        .then((response) => {
          if (response.data.success) {
            setCommentValue("");
            setOpenReply(!OpenReply);
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
            setCommentValue("");
            setOpenReply(!OpenReply);
            props.refreshFunction(response.data.result);
          } else {
            alert("Failed to save Comment");
          }
        });
    }
  };

  const actions = [
    <span onClick={openReply} key="comment-basic-reply-to">
      Reply to{" "}
    </span>,
  ];
  if (professor && professor.isAuthProfessor) {
    return (
      <div>
        <Comment
          actions={actions}
          author={professor.professor.name}
          //   avatar={/*
          //             <Avatar
          //              src={props.comment.proffessor.lastName}
          //            alt="image"
          //     />

          content={<p>{props.comment.content}</p>}
        ></Comment>

        {OpenReply && (
          <form style={{ display: "flex" }} onSubmit={onSubmit}>
            <TextArea
              style={{ width: "100%", borderRadius: "5px" }}
              onChange={handleChange}
              value={CommentValue}
              placeholder="write some comments"
            />
            <br />
            <Button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
              Submit
            </Button>
          </form>
        )}
      </div>
    );
  } else {
    return (
      <div>
        <Comment
          actions={actions}
          author={student?.student?.name}
          //   avatar={/*
          //             <Avatar
          //              src={props.comment.proffessor.lastName}
          //            alt="image"
          //     />

          content={<p>{props.comment.content}</p>}
        ></Comment>

        {OpenReply && (
          <form style={{ display: "flex" }} onSubmit={onSubmit}>
            <TextArea
              style={{ width: "100%", borderRadius: "5px" }}
              onChange={handleChange}
              value={CommentValue}
              placeholder="write some comments"
            />
            <br />
            <Button style={{ width: "20%", height: "52px" }} onClick={onSubmit}>
              Submit
            </Button>
          </form>
        )}
      </div>
    );
  }
}

export default SingleComment;
