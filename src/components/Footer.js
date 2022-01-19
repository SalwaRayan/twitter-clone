import React, { useContext, useEffect } from "react";
import { Col, Row, Image } from "react-bootstrap";
import styled from "styled-components";
import { HiOutlineLogout } from "react-icons/hi";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/User";

const Container = styled.div`
  fontfamily: "Twitter bold";
  font-size: 15px;
`;

const Text = styled.p`
  font-family: ${(props) =>
    props.type === "name" ? "Twitter bold" : "TwitterRegular"};
  margin: 0;

  @media (max-width: 1280px) {
    display: none;
  }
`;

const Right = styled.div`
  display: flex;
  justify-content: flex-end;

  @media (max-width: 1280px) {
    display: none;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
`

const Footer = (props) => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)

  const logout = async () => {
    await fetch('http://localhost:5000/logout', {
      credentials: 'include',
      method: 'delete'
    })

    navigate('/')
  }

  return (
    <Container>
      <Row
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Col xs={3}>
          <Image roundedCircle="true" src={user.profilePicture}></Image>
        </Col>
        <Col xs={9}>
          <Row
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Col>
              <Text type="name">{user.username}</Text>
              <Text type="username">@{user.username}</Text>
            </Col>
            <Col>
              <Right>
                <Button
                  onClick={logout}
                >
                  <HiOutlineLogout style={{ fontSize: 25 }} />
                </Button>
              </Right>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
