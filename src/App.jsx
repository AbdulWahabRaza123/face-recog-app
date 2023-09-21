import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import ASL from "./Pages/ASL";
import About from "./Pages/About";
import Instructions from "./Pages/Instructions";
import Error from "./Pages/404";
import DrawerComp from "../components/Drawer";
import { Wrapper } from "../components/Typography";
import { Container, Image } from "../components/Layout";
// import Logo from "./assets/logo.png";
function App() {
  const router = useNavigate();
  const [page, setPage] = useState(0);
  return (
    <>
      <Container>
        <Wrapper
          // style={{ position: "fixed" }}
          className="d-flex flex-row align-items-center justify-content-between mt-3"
        >
          <Wrapper>
            <DrawerComp page={page} setPage={setPage} />
          </Wrapper>
          <Image
            onClick={() => {
              router("/");
            }}
            style={{
              cursor: "pointer",
              marginLeft: "-50px",
              // position: "fixed",
              // right: "50%",
              // left: "50%",
            }}
            className="img-fluid"
            src={"/logo.png"}
            alt="Logo"
            width="100px"
            height="100px"
          />
          <Wrapper></Wrapper>
        </Wrapper>
      </Container>
      <Wrapper height="85vh">
        <Routes>
          <Route
            exact
            path="/"
            element={<Home page={page} setPage={setPage} />}
          />
          {/* <Route
          exact
          path="/asld"
          element={<ASL page={page} setPage={setPage} />}
        /> */}
          <Route
            exact
            path="/about"
            element={<About page={page} setPage={setPage} />}
          />
          <Route
            exact
            path="/instructions"
            element={<Instructions page={page} setPage={setPage} />}
          />
          <Route path="/*" element={<Error />} />
        </Routes>
      </Wrapper>
    </>
  );
}

export default App;
