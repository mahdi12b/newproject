import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Typography, Button, Form, message, Input, Icon } from "antd";
import Dropzone from "react-dropzone";
import { useHistory } from "react-router-dom";
import axios from "axios";

const { Title } = Typography;
const { TextArea } = Input;

const Private = [
  { value: 0, label: "Private" },
  { value: 1, label: "Public" },
];

const Catogory = [
  { value: 0, label: "7eme" },
  { value: 0, label: "8eme" },
  { value: 0, label: "9eme" },
  { value: 0, label: "1ere" },
  { value: 0, label: "2eme" },
  { value: 0, label: "3eme" },
  { value: 0, label: "Bac" },
  
];

const UpdateCourse = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState(0);
  const [Categories, setCategories] = useState("Any");
  const [FilePath, setFilePath] = useState("");
  const [Duration, setDuration] = useState("");
  const [message, setMessage] = useState("");
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

  //////
  const onSubmit = (event) => {
    event.preventDefault();
    console.log(professor.isAuthProfessor);

    if (professor.isAuthProfessor === false) {
      return alert("Please Log in First");
    }
    if (
      title === "" ||
      description === "" ||
      Categories === ""
      // FilePath === ""
      //|| Duration === ""
    ) {
      alert("Please first fill all the fields");
    }

    const variables = {
      professor_id: professor.professor._id,
      title: title,
      description: description,
      privacy: privacy,
      filePath: FilePath,
      category: Categories,
      // duration: Duration,
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
    axios
      .put(`/api/video/update/${props.match.params.id}`, variables)
      .then((response) => {
        alert(response.data);
        props.history.push("/coursesList");
      })
      .catch((err) => {
        alert("Failed to update video");
      });
  };

  useEffect(() => {
    axios
      .get(`/api/video/${props.match.params.id}`)
      .then((res) => [
        setTitle(res.data.title),
        setDescription(res.data.description),
        setPrivacy(res.data.privacy),
        setCategories(res.data.Categories),
      ])
      .catch((error) => console.log(error));
  }, [props]);

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}> Updated Video</Title>
      </div>
      <span>{message}</span>

      <Form onSubmit={onSubmit}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {/*
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
                */}

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
        <TextArea onChange={handleChangeDecsription} value={description} />
        <br />
        <br />

        <select onChange={handleChangeOne}>
          {Private.map((item, index) => (
            <option key={index} value={item.privacy}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />

        <select onChange={handleChangeTwo}>
          {Catogory.map((item, index) => (
            <option key={index} value={item.Categories}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />

        <Button type="primary" size="large" onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default UpdateCourse;
