import React from 'react';

import { Modal, Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

import styled from "styled-components";
import { default as twitterBlue } from '../images/twitter-blue.svg'


const ImgSvgModal = styled.img`
    fill: #1DA1F2;
    width: 35px;
    align-self: center;
    align-items: center;
    -webkit-box-align: center;
    -webkit-box-flex: 1;
    flex-grow: 3;
`

const H2 = styled.h2`
  font-family: 'Twitter';
  font-size: 35px;
  font-weight: 700;
  margin-bottom: 30px;
`

const SignUp = props => {


  return (
    <Modal
      show={props.show}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header style={{ paddingBottom: 30, paddingTop: 30, display: "flex", justifyContent: "center" }}>
        <Modal.Title id="contained-modal-title-vcenter">
          <ImgSvgModal src={twitterBlue} />
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <H2>Connectez-vous à Twitter</H2>

        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Addresse e-mail</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Button variant="dark" type="submit" style={{ borderRadius: 50, marginTop: 20, paddingLeft: 30, paddingRight: 30, fontFamily: 'Twitter' }}>
            Suivant
          </Button>
        </Form>

      </Modal.Body>

      <Modal.Footer>
        <Button onClick={props.onHide} style={{ borderRadius: 50, paddingLeft: 30, paddingRight: 30, fontFamily: 'Twitter' }}>Annuler</Button>
      </Modal.Footer>

    </Modal >
  );
};

export default SignUp;