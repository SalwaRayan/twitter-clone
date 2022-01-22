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

import EditProfile from "./EditProfile"

const Main = styled.main`
  font-family: "Twitter Heavy";
  height: 100%;
`


// 


const User = () => {


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






          <Col style={{ width: 10, paddingTop: 20, display: 'flex', flexDirection: 'column' }}>


            <div style={{ backgroundColor: "lightgrey", width: "100%", paddingTop: 100, display: 'flex', }}>
              <Container style={{ width: 130, height: 130, backgroundColor: "lightblue", borderRadius: 9999, position: 'relative', marginTop: 33, marginLeft: 30, bottom: -65 }}>
                <input type="file" id="actual-btn" />
                <label htmlFor="actual-btn">
                  <img src={cameraLogo} style={{ width: 70, alignContent: 'center', position: "relative", left: 8 }} alt="Logo" />
                </label>
              </Container>

              {user.username === userInfo.username ?


                <>
                  <Button
                    style={{
                      backgroundColor: 'white',
                      position: 'relative',
                      color: 'black',
                      borderRadius: 50,
                      borderColor: 'black',
                      borderWidth: 1,
                      height: "fit-content",
                      bottom: -175
                    }}
                    variant="primary"
                    onClick={() => setModalShow(true)}>
                      Éditer le profil
                  </Button>

                  <EditProfile
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                </>

                :

                <Button 
                  style={{
                    backgroundColor: 'white',
                    position: 'relative',
                    color: 'black',
                    borderRadius: 50,
                    borderColor: 'black',
                    borderWidth: 1,
                    height: "fit-content",
                    bottom: -175
                  }}
                  onClick={() => onHandleClickFollow(userInfo._id)}
                >
                  Suivre
                </Button>

              }

            </div>
            <div style=

              {{
                paddingTop: 90,
                display: 'flex',
                paddingLeft: 30,
                flexDirection: 'column'
              }}>

              <p style=
                {{
                  marginBlock: -4,
                  fontSize: 30
                }}>
                {userInfo.username}
              </p>

              <p style=
                {{
                  marginBlock: -4,
                  fontSize: 20,
                  fontFamily: "Twitter Regular",
                  color: "grey"
                }}>
                @{userInfo.username}</p>
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