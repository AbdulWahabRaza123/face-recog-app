import React from "react";
import { Container } from "../../components/Layout";
import { Wrapper, P } from "../../components/Typography";
const About = (props) => {
  return (
    <>
      <Container>
        <Container
          className="d-flex flex-row justify-content-center align-items-center"
          style={{ width: "80%" }}
        >
          <Wrapper className="mt-5">
            <P size="16px" color="black" weight="600" lHeight="21px">
              This is about
            </P>
          </Wrapper>
        </Container>
      </Container>
    </>
  );
};

export default About;
