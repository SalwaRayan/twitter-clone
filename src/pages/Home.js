import React from "react";
import styled from "styled-components";
import { Col, Container, Row } from "react-bootstrap";

const Main = styled.main`
  background-color: #fff;
  width: 100%;
  font-family: "Twitter bold";
  display: flex;
`;

const Home = () => {
  return (
    <Main>
      <Container>
        <Row>
          <Col sm={6}>
            <img
              src="http://localhost:5000/17-01-2022-12-29-45-twitter-bckg-home.png"
              alt=""
              style={{ width: 500 }}
            />
          </Col>
          <Col sm={6}>
            <h1>
              Ça se passe <br /> maintenant
            </h1>
          </Col>
        </Row>
      </Container>
    </Main>
  );
};

export default Home;
