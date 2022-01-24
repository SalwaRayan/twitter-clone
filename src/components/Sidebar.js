import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { Nav, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";

import { UserContext } from "../contexts/User";
import ModalTweet from "./ModalTweet";

const Svg = styled.svg`
  width: 25px;
`;

const SvgLogo = styled.svg`
  width: 50px;
  border-radius: 9999px;
  padding: 10px;
  transition-duration: 0.2s;

  &:hover {
    background: #e8f5fd;
  }

  @media (max-width: 1280px) {
    padding: 0;
    width: 30px;
  }
`;

const Text = styled.h3`
  font-size: 20px;
  margin: 0;

  @media (max-width: 1280px) {
    display: none;
  }
`;

const Hover = styled.div`
  border-radius: 9999px;
  border: none;
  padding: 10px;
  min-height: 52px;
  font-family: "Twitter bold";
  cursor: pointer;
  transition-duration: 0.2s;

  &:hover {
    background-color: #e7e7e8;
  }
`;

const Button = styled.button`
  border-radius: 9999px;
  border: none;
  width: 100%;
  margin-top: 4px;
  margin-bottom: 4px;
  margin-left: 30px;
  background-color: #1da1f2;
  padding-left: 32px;
  padding-right: 32px;
  min-width: 52px;
  min-height: 52px;
  font-family: "Twitter bold";
  color: white;

  &:hover {
    background-color: #1a8cd8;
  }

  @media (max-width: 1280px) {
    min-width: 0;
    min-height: 0;
    width: 35px;
    height: 35px;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const SvgTweet = styled.svg`
  width: 20px;
  display: none;

  @media (max-width: 1280px) {
    display: initial;
  }
`;

const Row = styled.div`
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  display: flex;
  margin-top: calc(-1 * var(--bs-gutter-y));
  margin-right: calc(-0.5 * var(--bs-gutter-x));
  margin-left: calc(-0.5 * var(--bs-gutter-x));
`;

const Sidebar = () => {
  const { user, connected } = useContext(UserContext);
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Nav
        defaultActiveKey="/home"
        className="flex-column center"
        style={{ position: "fixed", alignItems: "flex-start" }}
      >
        {/* Acceuil */}
        <Nav.Link style={{ marginLeft: 10, flexWrap: "none" }}>
          <Row style={{ width: 100, flexDirection: "row", flexWrap: "none" }}>
            <Col xs={6} md={2}>
              <Link to={connected ? "/homepage" : "/"}>
                <SvgLogo viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <path
                      fill="#1da1f2"
                      d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"
                    ></path>
                  </g>
                </SvgLogo>
              </Link>
            </Col>
            <Col xs={12} md={10} className="none-big"></Col>
          </Row>
        </Nav.Link>

        {/* Homepage */}
        <Nav.Link
          eventKey="/homepage"
          style={{ color: "black", marginLeft: 10, flexWrap: "none" }}
        >
          <Hover>
            <Row
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "none",
              }}
            >
              <Col xs={6} md={2} style={{ marginRight: 20 }}>
                <Link to="/homepage">
                  <Svg viewBox="0 0 24 24" aria-hidden="true">
                    <g>
                      <path d="M22.46 7.57L12.357 2.115c-.223-.12-.49-.12-.713 0L1.543 7.57c-.364.197-.5.652-.303 1.017.135.25.394.393.66.393.12 0 .243-.03.356-.09l.815-.44L4.7 19.963c.214 1.215 1.308 2.062 2.658 2.062h9.282c1.352 0 2.445-.848 2.663-2.087l1.626-11.49.818.442c.364.193.82.06 1.017-.304.196-.363.06-.818-.304-1.016zm-4.638 12.133c-.107.606-.703.822-1.18.822H7.36c-.48 0-1.075-.216-1.178-.798L4.48 7.69 12 3.628l7.522 4.06-1.7 12.015z"></path>
                      <path d="M8.22 12.184c0 2.084 1.695 3.78 3.78 3.78s3.78-1.696 3.78-3.78-1.695-3.78-3.78-3.78-3.78 1.696-3.78 3.78zm6.06 0c0 1.258-1.022 2.28-2.28 2.28s-2.28-1.022-2.28-2.28 1.022-2.28 2.28-2.28 2.28 1.022 2.28 2.28z"></path>
                    </g>
                  </Svg>
                </Link>
              </Col>
              <Col xs={12} md={10} className="none-big">
                <Link
                  to={`/homepage`}
                  className="link"
                  style={{ height: 0, margin: 0, padding: 0 }}
                >
                  <Text>Acceuil</Text>
                </Link>
              </Col>
            </Row>
          </Hover>
        </Nav.Link>

        {/* List User */}
        <Nav.Link
          eventKey="/homepage"
          style={{ color: "black", marginLeft: 10, flexWrap: "none" }}
        >
          <Hover>
            <Row
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "none",
              }}
            >
              <Col xs={6} md={2} style={{ marginRight: 9 }}>
                <Link
                  to="/users"
                  style={{ height: 0, margin: 0, padding: 0, color: "black" }}
                >
                  <HiOutlineDotsCircleHorizontal style={{ fontSize: 25 }} />
                </Link>
              </Col>
              <Col xs={12} md={10} className="none-big">
                <Link
                  to={`/users`}
                  className="link"
                  style={{ height: 0, margin: 0, padding: 0, color: "black" }}
                >
                  <Text>Liste utilisateurs</Text>
                </Link>
              </Col>
            </Row>
          </Hover>
        </Nav.Link>

        {/* Profile */}
        {connected && (
          <Nav.Link
            eventKey="profile"
            style={{ color: "black", marginLeft: 10, flexWrap: "none" }}
          >
            <Hover>
              <Row className="row-menu">
                <Col xs={6} md={2} style={{ marginRight: 20 }}>
                  <Link to={`/${user.username}`}>
                    <Svg viewBox="0 0 24 24" aria-hidden="true">
                      <g>
                        <path d="M12 11.816c1.355 0 2.872-.15 3.84-1.256.814-.93 1.078-2.368.806-4.392-.38-2.825-2.117-4.512-4.646-4.512S7.734 3.343 7.354 6.17c-.272 2.022-.008 3.46.806 4.39.968 1.107 2.485 1.256 3.84 1.256zM8.84 6.368c.162-1.2.787-3.212 3.16-3.212s2.998 2.013 3.16 3.212c.207 1.55.057 2.627-.45 3.205-.455.52-1.266.743-2.71.743s-2.255-.223-2.71-.743c-.507-.578-.657-1.656-.45-3.205zm11.44 12.868c-.877-3.526-4.282-5.99-8.28-5.99s-7.403 2.464-8.28 5.99c-.172.692-.028 1.4.395 1.94.408.52 1.04.82 1.733.82h12.304c.693 0 1.325-.3 1.733-.82.424-.54.567-1.247.394-1.94zm-1.576 1.016c-.126.16-.316.246-.552.246H5.848c-.235 0-.426-.085-.552-.246-.137-.174-.18-.412-.12-.654.71-2.855 3.517-4.85 6.824-4.85s6.114 1.994 6.824 4.85c.06.242.017.48-.12.654z"></path>
                      </g>
                    </Svg>
                  </Link>
                </Col>
                <Col xs={12} md={10} className="none-big">
                  <Link
                    to={`/${user.username}`}
                    className="link"
                    style={{ height: 0, margin: 0, padding: 0 }}
                  >
                    <Text>Profil</Text>
                  </Link>
                </Col>
              </Row>
            </Hover>
          </Nav.Link>
        )}

        {connected && (
          <>
            <Button onClick={() => setModalShow(true)}>
              <Text>Tweeter</Text>
              <SvgTweet viewBox="0 0 24 24" aria-hidden="true">
                <g>
                  <path
                    fill="white"
                    d="M8.8 7.2H5.6V3.9c0-.4-.3-.8-.8-.8s-.7.4-.7.8v3.3H.8c-.4 0-.8.3-.8.8s.3.8.8.8h3.3v3.3c0 .4.3.8.8.8s.8-.3.8-.8V8.7H9c.4 0 .8-.3.8-.8s-.5-.7-1-.7zm15-4.9v-.1h-.1c-.1 0-9.2 1.2-14.4 11.7-3.8 7.6-3.6 9.9-3.3 9.9.3.1 3.4-6.5 6.7-9.2 5.2-1.1 6.6-3.6 6.6-3.6s-1.5.2-2.1.2c-.8 0-1.4-.2-1.7-.3 1.3-1.2 2.4-1.5 3.5-1.7.9-.2 1.8-.4 3-1.2 2.2-1.6 1.9-5.5 1.8-5.7z"
                  ></path>
                </g>
              </SvgTweet>
            </Button>
            <ModalTweet show={modalShow} onHide={() => setModalShow(false)} />
          </>
        )}
      </Nav>
    </>
  );
};

export default Sidebar;
