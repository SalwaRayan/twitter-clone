import React from "react";
import { Col, Row, Image } from "react-bootstrap";
import styled from "styled-components";

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

const Svg = styled.svg`
  width: 18px;
`;

const Right = styled.div`
  display: flex;
  justify-content: flex-end;

  @media (max-width: 1280px) {
    display: none;
  }
`

const Footer = props => {
  return (
    <Container>
      <Row
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Col xs={3}>
          <Image roundedCircle="true"></Image>
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
              <Text type="name">User</Text>
              <Text type="username">@User</Text>
            </Col>
            <Col>
              <Right>
                <Svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <g>
                    <circle cx="5" cy="12" r="2"></circle>
                    <circle cx="12" cy="12" r="2"></circle>
                    <circle cx="19" cy="12" r="2"></circle>
                  </g>
                </Svg>
              </Right>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
