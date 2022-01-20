import React, { useContext } from "react"
import styled from "styled-components"
import { Container, Row, Col, Button } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

import { FlexFooter } from "../components/FlexFooter"

import Sidebar from "../components/Sidebar"
import Footer from "../components/Footer"
import SearchBar from "../components/SearchBar"
import FollowCardSide from "../components/FollowCardSide"

import { UserContext } from "../contexts/User"

import cameraLogo from '../images/camera.png'

const Main = styled.main`
  font-family: "Twitter Bold";
  height: 100%;
`

const User = () => {

  const { user } = useContext(UserContext)

  return (
    <Main>
      <Container>
        <Row>

          <Col xs={3} className="none width">
            <Sidebar />
            <FlexFooter>
              <Footer />
            </FlexFooter>
          </Col>


          {/* CENTER */}
          <Col style={{ width: 10, paddingTop: 20, display: 'flex', flexDirection: 'column' }}>

            <div style={{ backgroundColor: "lightgrey", width: "100%", paddingTop: 100, display: 'flex', }}>
              <Container style={{ width: 130, height: 130, backgroundColor: "lightblue", borderRadius: 9999, position: 'relative', marginTop: 33, marginLeft: 30, bottom: -65 }}>
                <input type="file" id="actual-btn" />
                <label for="actual-btn">
                  <img src={cameraLogo} style={{ width: 70, alignContent: 'center', position: "relative", left: 8 }} alt="Logo" />
                </label>
              </Container>
              <Button style={{ backgroundColor: 'white', position: 'relative', color: 'black', borderRadius: 50, borderColor: 'black', borderWidth: 1, height: "fit-content", bottom: -175 }}>Éditer le profil</Button>
            </div>
            <div style={{ paddingTop: 90, display: 'flex', paddingLeft: 30, flexDirection: 'column' }}>
              <p style={{ marginBlock: -4, fontSize: 30 }}>{user.username}</p>
              <p style={{ marginBlock: -4, fontSize: 20, fontFamily: "Twitter Regular", color: "grey" }}>@{user.username}</p>
            </div>
          </Col>
          <Col xs={4} className="none-right width-right">
            <SearchBar />

            <FollowCardSide />
          </Col>
        </Row>
      </Container>
    </Main>
  );
};

export default User