import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { List, Avatar, Typography, Row, Col } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import SideVideo from "../../Components/sideVideo/SideVideo";
import Subscriber from "../../Components/subscriber/Subscriber";
import Comments from "../../Components/comments/Comments";

const DetailCourse = (props) => {
  let history = useHistory();
  const videoId = props.match.params.videoId;
  const student = useSelector((state) => state.studentReducer);
  console.log(student.student);
  const professor = useSelector((state) => state.professorReducer);
  const [Video, setVideo] = useState({});
  const [CommentLists, setCommentLists] = useState([]);
  //console.log(videoId);
  const videoVariable = {
    videoId: videoId,
  };

  useEffect(() => {
    axios.post("/api/video/getVideo", videoVariable).then((response) => {
      if (response.data.success) {
        console.log(response.data.video);
        setVideo(response.data.video);
      } else {
        alert("failed to get video Info");
      }
    }, []);

    axios
      .post("/api/comment/getComments/professor", videoVariable)
      .then((response) => {
        if (response.data.success) {
          console.log("response.data.comments", response.data.comments);
          setCommentLists(response.data.comments);
        } else {
          alert("Failed to get video Info");
        }
      });

    axios
      .post("/api/comment/getComments/student", videoVariable)
      .then((response) => {
        if (response.data.success) {
          console.log("response.data.comments", response.data.comments);
          setCommentLists(response.data.comments);
        } else {
          alert("Failed to get video Info");
        }
      });
  }, []);

  const updateComment = (newComment) => {
    setCommentLists(CommentLists.concat(newComment));
  };

  if (
    (student && student.isAuthStudent) ||
    (professor && professor.isAuthProfessor)
  ) {
    return (
      <Row>
        <Col lg={18} xs={24}>
          <div
            className="postPage"
            style={{ width: "100%", padding: "3rem 4rem" }}
          >
            <video
              style={{ width: "100%" }}
              src={`http://localhost:4000/${Video.filePath?.replaceAll(
                "\\",
                "/"
              )}`}
              controls
            ></video>

            <List.Item
              actions={
                student.isAuthStudent
                  ? [
                      <Subscriber
                        userTo={Video.professor_id}
                        userFrom={localStorage.getItem("userId")}
                      />,
                    ]
                  : [
                      <Subscriber
                        userTo={Video.professor_id}
                        userFrom={professor?.professor?._id}
                      />,
                    ]
              }
            >
              <List.Item.Meta
                avatar={<Avatar />}
                title={<Link to="https://ant.design">{Video.title}</Link>}
                description={Video.description}
              />
              <div></div>
            </List.Item>
            <Comments
              CommentLists={CommentLists}
              postId={Video._id}
              refreshFunction={updateComment}
            />
          </div>
        </Col>
        <Col lg={6} xs={24}>
          <SideVideo />
        </Col>
      </Row>
    );
  } else {
    history.push("/student/signin");
  }
};

export default DetailCourse;
