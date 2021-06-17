import React from "react";
import { Card, Avatar, Col, Typography, Row } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";

const ProfCourses = ({ video }) => {
  const { Title } = Typography;
  const { Meta } = Card;
  var minutes = Math.floor(video.duration / 60);
  var seconds = Math.floor(video.duration - minutes * 60);
  return (
    <Col style={{ margin: 50 }} col={6} md={8} xs={18} key={video._id}>
      <div style={{ position: "relative" }}>
        <Link to={`/video/${video._id}`}>
          <img style={{ width: "100%" }} src="" alt="hahah" />
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
      <Meta
        ///// avataar image

        title={video.title}
      />
      <span>aaaaaa</span>
      <span style={{ marginLeft: "3rem" }}>{video.views}</span>
      <span> {moment(video.createdAt).format("MMM Do YY")}</span>
    </Col>
  );
};

export default ProfCourses;
