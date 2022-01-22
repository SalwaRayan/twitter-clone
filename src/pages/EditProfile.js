import React, { useContext } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'

import { Modal, Button, Form } from "react-bootstrap"
import { useFormik } from "formik"

import { UserContext } from "../contexts/User"

import '../App.css'

import styled from "styled-components"

const Input = styled.input`
  font-size: 34px;
  display: block;
  width: 100%;
  margin-bottom: 50px;
  padding-top: $width/15;
  border: none;
  border-radius: 0; // For iOS
  // border-bottom: solid $width/150 rgba(white, .5);
  color: black;
  background: $main-color;
  font-size: $width/15;
  transition: .3s ease;
  &:valid {
    // border-bottom-color: rgba(white, .5);
    ~label {
      top: 0;
      font: 700 $width/25 Roboto;
      color: rgba(white, .5);
    }
  }
  &:focus {
    outline: none;
    // border-bottom-color: $secondary-color;
    ~label {
      top: 0;
      font: 700 $width/25 Roboto;
      color: $secondary-color;
    }    
    ~ .bar:before {
    transform: translateX(0);
    }
  }
`

const UpdateProfile = props => {

    const { user, setUser } = useContext(UserContext)

    const formik = useFormik({
        initialValues: {
            username: user.username,
            email: user.email,
            description: user.description
        },
        onSubmit: values => {
            editProfile(values)
            props.onHide()
        }
    })

    const editProfile = async values => {
        const response = await fetch(`http://localhost:5000/users/${user._id}`, {
            method: 'put',
            headers: {
                'Content-type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(values)
        })

        const data = await response.json()
        setUser(data)
        console.log(data)
    }

    console.log(user)

    return (
        <Modal
            className="" 
            show={props.show}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{ background: "transparent", fontFamily: "Twitter Heavy" }}
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Éditer le profil
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={formik.handleSubmit}>
                    <Input
                        type='text'
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                    />
                    <Input
                        type='text'
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                    <Input
                        type='text'
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                    />
                </form>
                <button
                    type="submit"
                >
                    Sauvegarder
                </button>
            </Modal.Body>
            <Modal.Footer>
                <Button 
                    onClick={props.onHide}>Fermer la fenêtre
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default UpdateProfile