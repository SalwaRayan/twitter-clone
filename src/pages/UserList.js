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

const UserList = () => {
  return (
    <Main>
      <Container>
        <Row>
          <Col className={`none width ${!window.matchMedia("(max-width: 1280px)" && 'col-3' )}`}>
            <Sidebar />

            <FlexFooter>
              <Footer />
            </FlexFooter>
          </Col>
          <Col style={{ backgroundColor: "blue" }}>
            list users
          </Col>
          <Col xs={4} className="none-right width-right">
            <SearchBar/>

            <FollowCardSide />
          </Col>
        </Row>
      </Container>
    </Main>
  );
};

export default UserList;