import React, { useContext, useEffect } from "react";
import { Col, Row, Image } from "react-bootstrap";
import styled from "styled-components";
import { HiOutlineLogout } from "react-icons/hi";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { UserContext } from "../contexts/User";

const Container = styled.div`
  font-family: "Twitter Bold";
  font-size: 15px;
`;

const Text = styled.p`
  font-family: ${(props) =>
    props.type === "name" ? "Twitter Bold" : "Twitter Regular"};
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
`;

const Footer = () => {
  const navigate = useNavigate();
  const { user, setConnected } = useContext(UserContext);

  const logout = async () => {
    await fetch("http://localhost:5000/logout", {
      credentials: "include",
      method: "delete",
    });

    setConnected(false);
    navigate("/");
  };

  return (
    <Container>
      <Row
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Col xs={3}>
          <Image
            roundedCircle="true"
            style={{ width: 40 }}
            src={
              user.profilePicture === ""
                ? `http://localhost:5000/22-01-2022-03-10-18-default_profile_400x400.png`
                : `${user.profilePicture}`
            }
            onClick={logout}
          />
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
              <Link
                to={`/${user.username}`}
                className="link"
                style={{ height: 0, margin: 0, padding: 0 }}
              >
                <Text type="name">{user.username}</Text>
                <Text type="username">@{user.username}</Text>
              </Link>
            </Col>
            <Col>
              <Right>
                <Button onClick={logout}>
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
