import React, { useState } from 'react'

import { Modal, Button, Form } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'

import styled from "styled-components"
import { default as twitterBlue } from '../images/twitter-blue.svg'

import { useFormik } from "formik"
import *  as Yup from 'yup'
import { useNavigate, Link } from "react-router-dom";


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

const SignUp = () => {

  // const navigate = useNavigate()
  const [passwordVisible, setPasswordVisible] = useState(true)

  const formik = useFormik({
    initialValues: {
      username: "Leslie",
      password: "hellohello",
      passwordConfirmation: "hellohello",
      email: "les@les.les"
    },

    onSubmit: values => {
      signup(values)
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required").min(8, "Password is too short"),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref("password"), null], 'Password must match'),
      email: Yup.string().required("Email is required").email("Email is invalid")
    })
  })

  const signup = async values => {
    // fetch signup
    const signupResponse = await fetch('http://localhost:5000/signup', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password
      })
    })

    const user = await signupResponse.json()

    if (user.error) {
      alert(user.error)
      return
    }

    const loginResponse = await fetch('http://localhost:5000/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        username: user.username,
        password: user.password
      })
    })

    if (loginResponse.status >= 400) {
      alert(loginResponse.statusText)
    } else {
      console.log(loginResponse)
      //navigate('')
    }

    const togglePasswordVisible = () => {
      setPasswordVisible(!passwordVisible)
    }

  }

  return (
    <Modal
      show={props.show}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ paddingLeft: 50 }}
    >
      <Modal.Header style={{ paddingBottom: 30, paddingTop: 30, display: "flex", justifyContent: "center" }}>
        <Modal.Title id="contained-modal-title-vcenter">
          <ImgSvgModal src={twitterBlue} />
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <H2>Connectez-vous à Twitter</H2>

        <Form onSubmit={formik.handleSubmit}>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Addresse e-mail</Form.Label>
            <Form.Control type="email" placeholder="Enter email" style={{ borderRadius: 50 }} />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control type="password" placeholder="Password" style={{ borderRadius: 50 }} />
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