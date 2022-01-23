import React, { useContext } from "react"
import styled from "styled-components"
import { Container, Row, Col } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

import { FlexFooter } from "../components/FlexFooter" 
import Sidebar from "../components/Sidebar"
import Footer from "../components/Footer"
import SearchBar from "../components/SearchBar"
import FollowCardSide from "../components/FollowCardSide"
import { UserContext } from "../contexts/User"

const Main = styled.main`
  font-family: "Twitter";
  height: 100%;
`

const Follow = () => {
  const { connected } = useContext(UserContext)

  return (
    <Main>
      <Container>
        <Row>
        <Col xs={3} className="none width">
            <Sidebar />

            {connected && (
              <FlexFooter>
                <Footer />
              </FlexFooter>
            )}
          </Col>
          <Col style={{ backgroundColor: "blue" }}>
            list follower/following
          </Col>
          <Col xs={4} className="none-right fixed-right">
            <SearchBar />
            {connected && <FollowCardSide />}
          </Col>
        </Row>
      </Container>
    </Main>
  );
};

export default Follow;