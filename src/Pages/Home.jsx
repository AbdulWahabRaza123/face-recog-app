import React, { useState, useRef, useCallback, useEffect } from "react";
import { Container, Image } from "../../components/Layout";
import { Wrapper, P } from "../../components/Typography";
import { useMediaQuery } from "react-responsive";
import { Spacer } from "../../components/Spacer";
import Webcam from "react-webcam";
import axios from "axios";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import {
  videoConstraints,
  BackgroundCamera,
  BackgroundTranslation,
  ButtonStyle,
  RedDotOpen,
  SearchButton,
} from "../../components/Style";

const Home = (props) => {
  const isResponsive = useMediaQuery({ query: "(max-width: 453px)" });
  const [camera, setCamera] = useState(false);
  const [upload, setUpload] = useState(null);
  const [picture, setPicture] = useState(null);
  const [translation, setTranslation] = useState("");
  const [counter, setCounter] = useState(-1);
  const [on, setOn] = useState(false);
  const webcamRef = useRef(null);

  const [capturing, setCapturing] = useState(false);
  function base64StringtoFile(base64String, filename) {
    const arr = base64String.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }
  const capture = useCallback(async () => {
    const pictureSrc = webcamRef.current.getScreenshot();
    setPicture(pictureSrc);
    const mkFile = base64StringtoFile(pictureSrc, "image.jpg");
    setTranslation("Loading...");
    await UploadData(mkFile);
    // console.log("This is picture ", mkFile);
  });
  const UploadData = async (data) => {
    try {
      const formData = new FormData();
      formData.append("img1", data);
      setTranslation("Loading...");
      const res = await axios.post("http://localhost:5000/single", formData);
      setTranslation(res.data.name);
    } catch (e) {
      console.log(e);
      setTranslation("");
      alert("Got Error");
    }
  };

  return (
    <>
      <Container>
        <Spacer height="30px" />
        {props.page === 0 || props.page === 1 ? (
          <>
            <Wrapper className="d-flex flex-row justify-content-center mb-3">
              <BackgroundCamera>
                {!picture && camera ? (
                  <Webcam
                    imageSmoothing={true}
                    ref={webcamRef}
                    audio={false}
                    mirrored={true}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    width={isResponsive ? 400 : 720}
                    height={400}
                  />
                ) : (
                  camera && (
                    <div>
                      <img src={picture} alt="pic" />
                    </div>
                  )
                )}

                <Wrapper
                  className="d-flex flex-row justify-content-center"
                  style={{
                    position: "absolute",
                    bottom: "16px",
                    left: 0,
                    right: 0,
                  }}
                >
                  {!camera ? (
                    <button
                      className="btn btn-danger ms-3"
                      onClick={() => {
                        setCamera(true);
                      }}
                    >
                      turn on!
                    </button>
                  ) : capturing === true && camera === true ? (
                    <ButtonStyle
                      variant="outlined"
                      color="error"
                      className="d-flex flex-row justify-content-center align-items-center"
                    >
                      <P size="20px" color="red" weight="500" className="mb-0">
                        {counter}
                      </P>
                      {/* <RedDot /> */}
                    </ButtonStyle>
                  ) : !picture ? (
                    <ButtonStyle
                      variant="outlined"
                      color="error"
                      onClick={(e) => {
                        e.preventDefault();
                        capture();
                        setTranslation("");
                      }}
                    >
                      <RedDotOpen />
                    </ButtonStyle>
                  ) : (
                    <ButtonStyle
                      variant="outlined"
                      color="error"
                      onClick={(e) => {
                        e.preventDefault();
                        setPicture(null);
                      }}
                    >
                      Close
                    </ButtonStyle>
                  )}
                </Wrapper>
                {camera ? (
                  <Wrapper
                    className="d-flex flex-row justify-content-end"
                    style={{
                      position: "absolute",
                      top: "16px",
                      right: "10px",
                    }}
                  >
                    <P
                      color="red"
                      style={{
                        borderBottom: "1px solid red",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setCamera(false);
                        setTranslation("");
                      }}
                    >
                      close
                    </P>
                  </Wrapper>
                ) : (
                  <IconButton aria-label="upload image" component="label">
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={(e) => {
                        if (e.target.files[0]) {
                          UploadData(e.target.files[0]);
                        } else {
                          console.log("Please upload the file!!!");
                        }
                      }}
                    />
                    <PhotoCamera />
                  </IconButton>
                )}
              </BackgroundCamera>
            </Wrapper>

            <Wrapper className="d-flex flex-row justify-content-center mb-5 ">
              <BackgroundTranslation>{translation}</BackgroundTranslation>
            </Wrapper>
          </>
        ) : null}
        {/* {props.page === 1 ? <></> : null} */}
      </Container>
    </>
  );
};

export default Home;
