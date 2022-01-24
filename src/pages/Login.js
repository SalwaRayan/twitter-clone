import React, { useContext } from 'react'

import { Modal, Button, Form } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'

import styled from "styled-components"
import { default as twitterBlue } from '../images/twitter-blue.svg'

import { useFormik } from "formik"
import *  as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/User'
// import { useNavigate, Link } from "react-router-dom";


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
  font-family: 'Twitter bold';
  font-size: 35px;
  font-weight: 700;
  margin-bottom: 30px;
`

const Login = props => {
  const navigate = useNavigate()
  const { setUser, setConnected } = useContext(UserContext)


  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: values => {
      login(values)
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      email: Yup.string().required("Adresse email requise"),
      password: Yup.string().required("Mot de passe requis")
    })
  })

  const login = async values => {

    // fetch signup
    const response = await fetch('http://localhost:5000/login', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(values)
    })

    const data = await response.json()

    setUser(data)
    setConnected(true)

    if (response.error) {
      alert(response.error)
      return
    }

    if (response.status >= 400) {
      alert(response.statusText)
    } else {
      // console.log(response)
      navigate('/homepage')
    }

    //const togglePasswordVisible = () => {
    //setPasswordVisible(!passwordVisible)
    //}

  }

  return (
    <Modal
      show={props.show}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ paddingLeft: 50, borderRadius: 60 }}
      
    >
      <Modal.Header 
        style={{ 
          paddingBottom: 30, 
          paddingTop: 30,
          display: "flex", 
          justifyContent: "center" 
        }}>
        <Modal.Title id="contained-modal-title-vcenter">
          <ImgSvgModal src={twitterBlue} />
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <H2>Connectez-vous à Twitter</H2>

        <Form  onSubmit={formik.handleSubmit} >

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Addresse e-mail</Form.Label>
            <Form.Control
              isInvalid={formik.errors.username}
              onChange={formik.handleChange}
              type="email"
              name="email"
              placeholder="Entrez votre username"
              style={{ borderRadius: 50 }}
            />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              isInvalid={formik.errors.password}
              onChange={formik.handleChange}
              type="password"
              name="password"
              placeholder="Entrez votre mot de passe"
              style={{ borderRadius: 50 }} />
          </Form.Group>

          <Button variant="dark" type="submit" style={{ borderRadius: 50, marginTop: 20, paddingLeft: 30, paddingRight: 30, fontFamily: 'Twitter bold' }}>
            Suivant
          </Button>

        </Form>

      </Modal.Body>

      <Modal.Footer>
        <Button onClick={props.onHide} style={{ borderRadius: 50, paddingLeft: 30, paddingRight: 30, fontFamily: 'Twitter bold' }}>Annuler</Button>
      </Modal.Footer>

    </Modal >
  );
};

export default Login