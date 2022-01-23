import React, { useContext } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'

import { Modal, Button } from "react-bootstrap"
import { useFormik } from "formik"

import { UserContext } from "../contexts/User"

import '../App.css'

import styled from "styled-components"

const Input = styled.input`
  padding: 15px;
  font-size: 30px;
  width: 100%;
  margin-bottom: 50px;
  background-color: #ECE9E8;
  border-radius: 3px;
  border: 0.5px solid lightgray;
  color: black;
  text-align: left;
  display: block;
`

const EditForm = styled.form`
    padding: 50px;
    display: flex;
    flex-direction: column;
    border-radius: 50px;
`

const Edit = props => {

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
        console.log('62', data)
    }

    console.log(user)

    return (
        <Modal
            show={props.show}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >

            <Modal.Header>
                <Modal.Title>
                    Éditer le profil
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <EditForm onSubmit={formik.handleSubmit}>
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
                </EditForm>
                <button type="submit">
                    Sauvegarder
                </button>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={props.onHide}>
                    Fermer
                </Button>
            </Modal.Footer>
        </Modal>
        
    )
}

export default Edit