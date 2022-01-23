import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Form, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import styled from "styled-components";
import { IoMdClose } from "react-icons/io";

import { useFormik } from "formik";
import * as Yup from "yup";
import { UserContext } from "../contexts/User";

const Button = styled.button`
  background-color: #1da1f2;
  border: none;
  border-radius: 9999px;
  padding: 5px 15px;
  color: white;
  font-family: "Twitter bold";
  align-self: flex-end;
`;

const Close = styled.button`
  background: none;
  border: none;
  border-radius: 9999px;
  width: 40px;
  height: 40px;

  &:hover {
    background-color: #f7f9f9;
  }
`;

const TweetBody = styled.div`
  display: flex;
  flex-direction: row;
`;

const ImageBox = styled.div`
  margin: 4px;
  border-radius: 9999px;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  @media (max-width: 1400px) {
    height: 45px;
  }
`;

const ModalTweet = ({ show, onHide }) => {
  const { user } = useContext(UserContext)
  const [tweet, setTweet] = useState({});

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    onSubmit: (values) => {
      postTweet(values);
      formik.resetForm();
      onHide()
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      content: Yup.string().required("tweet needs a content to be posted"),
    }),
  });

  const postTweet = async (values) => {
    const response = await fetch(`http://localhost:5000/tweets/${user._id}`, {
      credentials: "include",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    setTweet(data);
  };

  return (
    <Modal show={show} size="md" animation={false} style={{ paddingLeft: 50 }}>
      <Modal.Header>
        <Modal.Title>
          <Close onClick={onHide}>
            <IoMdClose />
          </Close>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <TweetBody>
          <ImageBox>
            <Link to={`/${user.username}`}>
              <Image
                roundedCircle="true"
                style={{ width: 40 }}
                src={
                  user.profilePicture === ""
                    ? `http://localhost:5000/22-01-2022-03-10-18-default_profile_400x400.png`
                    : `${user.profilePicture}`
                }
              />
            </Link>
          </ImageBox>
          <Form
            onSubmit={formik.handleSubmit}
            style={{
              marginLeft: 10,
              marginTop: 10,
              width: "100%",
              marginRight: 20,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Form.Group className="mb-3">
              <Form.Control
                name="content"
                className="input-text"
                style={{ 
                  border: "none",
                  overflow: "auto",
                  outline: "none", 
                  resize: "none" 
                }}
                value={formik.values.content}
                type="text"
                placeholder="Quoi de neuf ?"
                as="textarea" 
                aria-label="With textarea"
                onChange={formik.handleChange}
              />
            </Form.Group>
            <Button type="submit">Tweeter</Button>
          </Form>
        </TweetBody>
      </Modal.Body>
    </Modal>
  );
};

export default ModalTweet;
