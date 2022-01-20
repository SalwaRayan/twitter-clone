import React, { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../contexts/User";
import User from "../pages/User";

import { useFormik } from "formik";
import * as Yup from "yup";

const Button = styled.button`
  background-color: #1da1f2;
  padding: 5px;
  width: 120px;
  border: none;
  border-radius: 9999px;
  color: white;
  font-family: 'twitter bold';
  margin-bottom: 10px;
  margin-right: 20px;
  right: -395px;
  align-self: flex-end;
`

const ComposeTweetForm = (props) => {
  const { user } = useContext(UserContext);
  const [ tweet, setTweet ] = useState({})

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    onSubmit: (values) => {
      postTweet(values)
      props.getTweets()
      formik.resetForm()
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      content: Yup.string().required("tweet needs a content to be posted")
    }),
  });

  const postTweet = async (values) => {
    const response = await fetch(`http://localhost:5000/tweets/${user._id}`, {
        credentials: 'include',
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    })

    const data = await response.json()

    setTweet(data)    
  }

  return (
      <Form className="compose-tweet-form bottom-right" onSubmit={formik.handleSubmit} style={{ borderBottom: '1px solid lightgrey' }}>
        <Form.Group className="mb-3">
          <Form.Control
            name="content"
            className="input-text"
            value={formik.values.content}
            type="text"
            placeholder="Quoi de neuf ?"
            as="input"
            rows={3}
            onChange={formik.handleChange}
          />
        </Form.Group>
        <Link to={`/${user.username}`}>
          <div style={{ borderRadius: 100 }}></div>
        </Link>
        <Button
          type="submit"
        >
          Tweeter
        </Button>
      </Form>
  );
};

export default ComposeTweetForm;
