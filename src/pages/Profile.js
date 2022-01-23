import React, { useContext, useEffect, useState } from "react"
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
import { useParams } from "react-router-dom"

import Edit from "../components/Edit"

const Main = styled.main`
  font-family: "Twitter Heavy";
  height: 100%;
`

const Profile = () => {


  //modal upadte user profile
  const [modalShow, setModalShow] = useState(false)

  const { username } = useParams()
  const { user, setUser } = useContext(UserContext)



  const [userInfo, setUserInfo] = useState({})

  // componentDidmount hook
  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    const response = await fetch(`http://localhost:5000/users/${username}`, {
      credentials: "include"
    })
    const data = await response.json()
    setUserInfo(data)
    console.log(data)
  }

  const onHandleClickFollow = async (id) => {
    const response = await fetch(
      `http://localhost:5000/follow/${user._id}/${id}`,
      {
        credentials: "include",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.error) {
      alert(response.error);
      return;
    }

    if (response.status >= 400) {
      alert(response.statusText);
    }

    const data = await response.json()

    setUser(data)
  };



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
          <Col className="profile flex-column">
            <div className="flex-column">
              <div className="banner"></div>
              <div className="profile-data">
                <div className="avatar">
                  {userInfo.profilePicture ? (
                    <img
                      src={userInfo.profilePicture}
                      style={{ width: "150px", borderRadius: 9999 }}
                      alt="avatar"
                    />
                  ) : (
                    <div className="no-avatar"></div>
                  )}
                </div>
                {user.username === userInfo.username ?
                  (
                    <>
                      <button
                        className="edit-follow-profile-btn"
                        onClick={() => setModalShow(true)}>
                          Éditer le profil
                      </button>
                      <Edit
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                      />
                    </>
                  ) : (
                    <button
                      className="edit-follow-profile-btn"
                      onClick={() => onHandleClickFollow(userInfo._id)}>
                      Suivre
                    </button>
                  )}
                <div className="nickname-ctn">
                  <p>{userInfo.username}</p>
                  <p>@{userInfo.username}</p>
                </div>
              </div>
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

export default Profile