import React from "react"
import styled from "styled-components"
import { Container, Row, Col } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

import { FlexFooter } from "../components/FlexFooter" 

import Sidebar from "../components/Sidebar"
import Footer from "../components/Footer"
import SearchBar from "../components/SearchBar"
import FollowCardSide from "../components/FollowCardSide"

const Main = styled.main`
  font-family: "Twitter";
  height: 100%;
`

const HomepageAnon = () => {
  return (
    <Main>
      <Container>
        <Row>
          <Col xs={3} className="none width">

            <Sidebar mode="anon"/>

          </Col>
          <Col>
            list tweet
          </Col>
          <Col xs={4} className="none-right width-right">

            <SearchBar/>

          </Col>
        </Row>
      </Container>
    </Main>
  );
};

export default HomepageAnon;