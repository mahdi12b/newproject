import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Typography, Button, Form, message, Input, Icon } from "antd";
import Dropzone from "react-dropzone";
import ReactNotification from "react-notifications-component"
import {store} from "react-notifications-component"
import 'animate.css'
import 'react-notifications-component/dist/theme.css'


const { Title } = Typography;
const { TextArea } = Input;

const Private = [
  { value: 0, label: "Any" },
  { value: 0, label: "High School" },
  { value: 0, label: "Middle School" },
  { value: 0, label: "Other" },
];

const Catogory = [
  { value: 0, label: "Any" },
  { value: 0, label: "7eme" },
  { value: 0, label: "8eme" },
  { value: 0, label: "9eme" },
  { value: 0, label: "1ere" },
  { value: 0, label: "2eme" },
  { value: 0, label: "3eme" },
  { value: 0, label: "bac" },
];

const UploadVideo = (props) => {
  const [title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState(0);
  const [Categories, setCategories] = useState("Any");
  const [FilePath, setFilePath] = useState("");
  const [Duration, setDuration] = useState("");
  const [Thumbnail, setThumbnail] = useState("");
  console.log(Thumbnail);

  let history = useHistory();

  const professor = useSelector((state) => state.professorReducer);
  console.log(professor);
  const student = useSelector((state) => state.studentReducer);
  console.log(professor);
  const handleChangeTitle = (event) => {
    setTitle(event.currentTarget.value);
  };
  //////
  const handleChangeDecsription = (event) => {
    console.log(event.currentTarget.value);

    setDescription(event.currentTarget.value);
  };
  ////
  const handleChangeOne = (event) => {
    setPrivacy(event.currentTarget.value);
  };
  /////
  const handleChangeTwo = (event) => {
    setCategories(event.currentTarget.value);
  };

  ///////
  const handleClickError =(title,message,type)=>{
    store.addNotification({
      title: title,
      message: message,
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
 

  


  //////
  const onSubmit = (event) => {
    event.preventDefault();
    console.log(professor.isAuthProfessor);

    if (professor.isAuthProfessor === false) {
      return handleClickError('Course Is Not Added', 'Please Login First', "danger")
    }
    if (
      title === "" ||
      Description === "" ||
      Categories === "" ||
      FilePath === ""
      //|| Duration === ""
    ) {
     return handleClickError('Course Is Not Added', 'Fill All The Fields"', "danger")
    }

    const variables = {
      professor_id: professor.professor._id,
      title: title,
      description: Description,
      privacy: privacy,
      filePath: FilePath,
      category: Categories,
      thumbnail:Thumbnail
      // duration: Duration,
    };


    axios.post("/api/video/UploadCourse", variables).then((response) => {
      if (response.data.success) {
        return handleClickError('Course Added', 'rr', "success") ,props.history.push("/coursesList")
      } else {
        return handleClickError('Course Is Not Added', 'technical problem, it must be solved in a few minutes', "danger")
      }
      
    });
  };

  ///

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    console.log(files);
    formData.append("file", files[0]);

    axios
      .post("/api/video/uploadfiles", formData, config)

      .then((response) => {
        if (response.data.success) {
          let variable = {
            filePath: response.data.filePath,
            fileName: response.data.fileName,
          };
          setFilePath(response.data.filePath);
          setDuration(response.data.fileDuration);
          setThumbnail(response.data.thumbsFilePath);
          // generate thumbnail with this file path
        } else {
          alert("failed to save the video in server");
        }
      });
  };

  return (
  <div>
     <ReactNotification/>
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>

      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}> Upload Video</Title>
      </div>

      <Form onSubmit={onSubmit}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {
            <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
              {({ getRootProps, getInputProps }) => (
                <div
                  style={{
                    width: "300px",
                    height: "240px",
                    border: "1px solid lightgray",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  {...getRootProps()}
                >
                  <input {...getInputProps()} />
                  <span type="plus" style={{ fontSize: "3rem" }}>
                    +
                  </span>
                </div>
              )}
            </Dropzone>
          }

          {Thumbnail !== "" && (
            <div>
              <img src={`http://localhost:4000/${Thumbnail}`} alt="haha" />
            </div>
          )}
        </div>

        <br />
        <br />
        <label>Title</label>
        <br />
        <Input onChange={handleChangeTitle} value={title} />
        <br />
        <br />
        <label>Description</label>
        <br />
        <TextArea onChange={handleChangeDecsription} value={Description} />
        <br />
        <br />

        <select onChange={handleChangeOne}>
          {Private.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />

        <select onChange={handleChangeTwo}>
          {Catogory.map((item, index) => (
            <option key={index} value={item.label}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />

        <Button type="primary" size="large" onClick={onSubmit}>
         submit 
        </Button>
      </Form>
    </div>
    </div>
  );
};

export default UploadVideo;
