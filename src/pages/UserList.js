import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { Container, Row, Col, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

import { FlexFooter } from "../components/FlexFooter";

import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import FollowCardSide from "../components/FollowCardSide";
import { UserContext } from "../contexts/User";

const Main = styled.main`
  font-family: "Twitter";
  height: 100%;
`;

const Text = styled.p`
  font-family: ${(props) =>
    props.type === "name" ? "Twitter bold" : "Twitter Regular"};
  margin: 0;

  &:hover {
    text-decoration: ${(props) => props.type === "name" && "underline"};
  }
`;

const Button = styled.button`
  border: none;
  background: black;
  border-radius: 9999px;
  color: white;
  font-family: "Twitter bold";
  font-size: 12px;
  padding: 5px 10px;
  align-self: flex-end;

  &:hover {
    background: #272c30;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  height: 70px;
  align-items: center;
  background: #ffffff;
  width: 100%;
  align-items: center;
  border-bottom: 1px solid lightgrey;

  &:hover {
    background-color: #f7f9f9;
  }
`;

const User = styled.div`
  margin: 0 10px;
  width: 90%;
  margin-right: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const BoxImage = styled.div`
  margin: 4px;
  border-radius: 9999px;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  @media (max-width: 1400px) {
    height: 45px;
  }
`;

const ContainerView = styled.div`
  width: 100%;
  height: 100%;
  border-left: 1px solid lightgrey;
  border-right: 1px solid lightgrey;
  z-index: 5;
`;

const UserList = () => {
  const { user, setUser, connected, users, getUsers } = useContext(UserContext);

  useEffect(() => {
    getUsers();
  }, []);

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
  }

  if(!users) {
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
            <ContainerView>
              {users.map((userElement) => 
                
                  // console.log(userElement)
                // console.log(userElement)

                user._id !== userElement._id ? (
                  <UserInfo>
                    <BoxImage>
                      <Image
                        roundedCircle="true"
                        style={{ width: 40 }}
                        src={userElement.profilePicture === "" ? `http://localhost:5000/22-01-2022-03-10-18-default_profile_400x400.png` : `${userElement.profilePicture}`}
                      />
                    </BoxImage>
                    <User>
                      <Link to={`/${userElement.username}`} className="link">
                        <Text type="name">{userElement.username}</Text>
                        <Text type="username">@{userElement.username}</Text>
                      </Link>
                      <div>
                        {connected ? 
                          user.following.includes(userElement._id) ? (
                            <Button
                              onClick={() =>
                                onHandleClickFollow(userElement._id)
                              }
                            >
                              Abonné
                            </Button>
                          ) : (
                            <Button
                              onClick={() =>
                                onHandleClickFollow(userElement._id)
                              }
                            >
                              Suivi
                            </Button>
                          ) : 
                          null
                        }
                      </div>
                    </User>
                    </UserInfo>
                ): (
                  null
                ))}
            </ContainerView>
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

export default UserList;
