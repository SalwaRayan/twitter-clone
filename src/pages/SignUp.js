
import { Modal, Button, Form } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'

import styled from "styled-components"
import { default as twitterBlue } from '../images/twitter-blue.svg'

import { useFormik } from "formik"
import *  as Yup from 'yup'
import { useNavigate } from "react-router-dom"


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
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 30px;
`

const Signup = props => {
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordConfirmation: "",
      email: ""
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
        email: user.email,
        password: user.password
      })
    })

    if (loginResponse.status >= 400) {
      alert(loginResponse.statusText)
    } else {
      // console.log(loginResponse)
      navigate('/homepage')
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

        <Form onSubmit={formik.handleSubmit} >

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control 
              isInvalid={formik.errors.username}
              onChange={formik.handleChange}
              type="text" 
              name="username" 
              plac eholder="Entrez votre username" 
              style={{ borderRadius: 50 }} 
            />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Addresse e-mail</Form.Label>
            <Form.Control 
              isInvalid={formik.errors.email}
              onChange={formik.handleChange}
              type="email" 
              name="email" 
              plac eholder="Entrez votre email" 
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
              placeholder="Entrez un nouveau mot de passe" 
              style={{ borderRadius: 50 }} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Confirmation du mot de passe</Form.Label>
            <Form.Control 
              isInvalid={formik.errors.passwordConfirmation}
              onChange={formik.handleChange}
              type="password"
              name="passwordConfirmation" 
              placeholder="Entrez un nouveau mot de passe" 
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

export default Signup