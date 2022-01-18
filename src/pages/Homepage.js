import React from "react";
import styled from "styled-components";
import { Container, Nav, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../components/Sidebar";

const Main = styled.main`
  font-family: "Twitter";
  height: 100%;
`;

const Homepage = () => {
  return (
    <Main>
      <Container>
        <Row>
          <Col>
            <Sidebar />
          </Col>
          <Col xs={5} style={{ backgroundColor: "blue" }}>
          </Col>
          <Col xs={4}  style={{ backgroundColor: "red" }}>
          </Col>
        </Row>
      </Container>
    </Main>
  );
};

export default Homepage;
