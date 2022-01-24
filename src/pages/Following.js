import React, { useContext, useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import styled from "styled-components"
import { Container, Row, Col } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

import { FlexFooter } from "../components/FlexFooter"
import Sidebar from "../components/Sidebar"
import Footer from "../components/Footer"
import SearchBar from "../components/SearchBar"
import FollowCardSide from "../components/FollowCardSide"
import { UserContext } from "../contexts/User"
import UserCard from "../components/UserCard"

const Main = styled.main`
  font-family: "Twitter";
  height: 100%;
`

const Following = () => {

  const { user, connected } = useContext(UserContext)
  const [currentUser, setCurrentUser] = useState()
  const { username } = useParams()

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const response = await fetch(`http://localhost:5000/users/${username}`, {
      credentials: "include",
    })
    const data = await response.json()
    setCurrentUser(data)
    console.log(data)
  }

  console.log(currentUser);

  if (!currentUser) {
    return <p>Chargement...</p>
  }

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
          <Col>
            {currentUser.following.map((flw, index) => (
              <>
                <UserCard
                  key={index}
                  username={flw.username}
                  profilePicture={flw.profilePicture}
                  user={flw.user}
                />
              </>
            ))}
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

export default Following