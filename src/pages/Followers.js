import React, { useContext, useEffect, useState } from "react"
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

const Followers = () => {

  const { connected } = useContext(UserContext)
  const [user, setUser] = useState()
  const { username } = useParams()

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const response = await fetch(`http://localhost:5000/users/${username}`, {
      credentials: "include",
    })
    const data = await response.json()
    setUser(data)
    console.log(data)
  }

  if (!user) {
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
            {user.followers.map((follow, index) => (
              <>
                <UserCard
                  key={index}
                  username={follow.username}
                  profilePicture={follow.profilePicture}
                  user={follow.user}
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

export default Followers