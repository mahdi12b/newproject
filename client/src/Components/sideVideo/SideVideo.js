import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SideVideo = () => {
  const [SideVideo, setSideVideo] = useState([]);
  useEffect(() => {
    axios.get("/api/video/getVideos").then((response) => {
      if (response.data.success) {
        console.log(response.data.videos);
        setSideVideo(response.data.videos);
      } else {
        alert("Failed to get videos");
      }
    });
  }, []);

  const sideVideoItem = SideVideo.map((video) => {
    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);
    console.log(video);
    return (
      <div
        key={video._id}
        style={{
          display: "flex",
          marginTop: "1rem",
          padding: "0 2rem",
        }}
      >
        <div style={{ width: "40%", marginRight: "1rem" }}>
          <Link to={`/video/${video._id}`} style={{ color: "gray" }}>
            <img
              src={`http://localhost:4000/${video.thumbnail}`}
              alt="hahah" 
            />
          </Link>
        </div>
        <div style={{ margin: "50%" }}>
          <Link to={`/video/${video._id}`} style={{ color: "gray" }}>
            <span style={{ fontSize: "1rem", color: "black" }}>
              {video.title}
            </span>
            <br />
            <span>Mr{}</span> <br />
            <span>{video.views}</span>
            <br />
            <span>
              {minutes}:{seconds}
            </span>
            <br />
          </Link>
        </div>
      </div>
    );
  });

  return (
    <React.Fragment>
      <div style={{ marginTop: "3rem" }}></div>
      {sideVideoItem}
    </React.Fragment>
  );
};

export default SideVideo;
