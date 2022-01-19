import React from "react"
import styled from "styled-components"
import { Container, Row, Col } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

import { FlexFooter } from "../components/FlexFooter" 

import Sidebar from "../components/Sidebar"
import Footer from "../components/Footer"
import SearchBar from "../components/SearchBar"
import FollowCardSide from "../components/FollowCardSide"
import ComposeTweetForm from '../components/ComposeTweetForm'

const Main = styled.main`
  height: 100%;
`



const Homepage = () => {
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
          <Col>
            <ComposeTweetForm />
          </Col>
          <Col xs={4} className="none-right width-right">
            <SearchBar/>
            <FollowCardSide />
          </Col>
        </Row>
      </Container>
    </Main>
  )
}

export default Homepage
