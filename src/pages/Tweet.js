import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";

import styled from "styled-components";
import { Container, Row, Col, Image, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ImageBox } from "../components/styledComponents/StyledComponents";
import { FiArrowLeft } from "react-icons/fi";

import { UserContext } from "../contexts/User";

import CommentCard from "../components/CommentCard";
import { FlexFooter } from "../components/FlexFooter";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import FollowCardSide from "../components/FollowCardSide";
import { useFormik } from "formik";
import * as Yup from "yup";

const Main = styled.main`
  font-family: "Twitter";
  height: 100%;
`;

const Button = styled.button`
  background-color: #1da1f2;
  border: none;
  border-radius: 9999px;
  padding: 5px 15px;
  color: white;
  font-family: "Twitter bold";
  align-self: flex-end;
`;

const Text = styled.p`
  margin-right: 5px;
  color: ${(props) => (props.type === "username" ? "#7d8a94" : "black")};
  font-family: ${(props) =>
    props.type === "name" ? "Twitter bold" : "Twitter Regular"};
  padding: 0;
  margin: 0;
`;

const User = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Back = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
`;

const Count = styled.div`
  height: 60px;
  border-top: 1px solid lightgrey;
  border-bottom: 1px solid lightgrey;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 10px;
  padding-left: 10px;
  justify-content: space-around;
`;

const G = styled.g`
  fill: "black";

  :hover {
    fill: #1da1f2;
  }
`;

const HoverIcons = styled.button`
  display: flex;
  flex-direction: row;
  background: none;
  border: none;
  border-radius: 9999px;
  transition-duration: 0.2s;
  width: 40px;
  height: 40px;

  &:hover {
    color: ${(props) => (props.name === "comment" ? "#e8f5fd" : "#00BA7C")};
    background: ${(props) =>
      props.name === "comment" ? "#e8f5fd" : "#DEF1EB"};
  }
`;

const Icon = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 20px;
  padding-bottom: 5px;
  border-bottom: 1px solid lightgrey;
`;

// path => /:username/:idTweet/tweet

const Tweet = () => {
  const { connected, user, setUser } = useContext(UserContext);
  const { username, idTweet } = useParams();
  const [tweet, setTweet] = useState();
  const [comment, setComment] = useState();
  const [comments, setComments] = useState();
  const [countComment, setCountComment] = useState();
  const [countRetweet, setCountRetweet] = useState();

  const formik = useFormik({
    initialValues: {
      content: "",
    },
    onSubmit: (values) => {
      postComment(values);
      // getAllComments();
      formik.resetForm();
    },
    validateOnChange: false,
    validationSchema: Yup.object({
      content: Yup.string().required("comment needs a content to be posted"),
    }),
  });

  useEffect(() => {
    getTweet();
  }, [tweet, comments]);

  const postComment = async (values) => {
    const response = await fetch(
      `http://localhost:5000/comments/${user._id}/${idTweet}`,
      {
        credentials: "include",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );

    const data = await response.json();

    setComment(data);
  };

  const getTweet = async () => {
    const response = await fetch(`http://localhost:5000/tweets/${idTweet}`, {
      credentials: "include",
    });

    if (response.error) {
      alert(response.error);
      return;
    }

    if (response.status >= 400) {
      alert(response.statusText);
    }

    const data = await response.json();

    setTweet(data);
    getAllComments();
  };

  const countComments = () => {
    const count = tweet.comments.length;

    setCountComment(count);
  };
  const countRetweets = () => {
    const count = tweet.retweets.length;

    setCountRetweet(count);
  };

  const getAllComments = async () => {
    const response = await fetch(
      `http://localhost:5000/tweets/comments/${idTweet}`,
      {
        credentials: "include",
      }
    );

    const data = await response.json();

    setComments(data);
    countComments();
    countRetweets();
  };

  if (!tweet) {
    return <p>Chargement....</p>;
  }

  const date = moment(tweet.createdAt).local("fr").format("LT - D MMM YYYY");

  return (
    <Main>
      <Container>
        <Row>
          <Col xs={3} className="none">
            <Sidebar />

            {connected && (
              <FlexFooter>
                <Footer />
              </FlexFooter>
            )}
          </Col>

          <Col
            style={{
              borderLeft: "1px solid lightgrey",
              borderRight: "1px solid lightgrey",
            }}
          >
            <Back>
              <FiArrowLeft className="arrow" />
              <h4
                style={{
                  fontFamily: "Twitter bold",
                  marginTop: 10,
                  marginLeft: 10,
                }}
              >
                Tweet
              </h4>
            </Back>
            <div>
              <User>
                <ImageBox>
                  <Image
                    roundedCircle="true"
                    style={{ width: 40 }}
                    src={
                      tweet.user.profilePicture === ""
                        ? `http://localhost:5000/22-01-2022-03-10-18-default_profile_400x400.png`
                        : `${tweet.user.profilePicture}`
                    }
                    alt={`${tweet.user.username}`}
                  />
                </ImageBox>
                <Link
                  to={`/${tweet.user.username}`}
                  className="link"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Text type="name">{tweet.user.username}</Text>
                  <Text type="username">@{tweet.user.username}</Text>
                </Link>
              </User>
              <div>
                <p style={{ fontSize: 30 }}>{tweet.content}</p>
              </div>
              <div>
                <p style={{ color: "#7d8a94" }}>{date}</p>
              </div>
            </div>
            <Count>
              {countComment !== 0 && (
                <div>
                  <p>{countComment} Comments</p>
                </div>
              )}
              {countRetweet !== 0 && (
                <div>
                  <p>{countRetweet} Retweets</p>
                </div>
              )}
            </Count>
            <Icon>
              <HoverIcons name="comment">
                <svg
                  style={{
                    width: 18,
                    paddingBottom: 15,
                    marginRight: 5,
                    paddingTop: 2,
                  }}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <G>
                    <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path>
                  </G>
                </svg>
              </HoverIcons>
              <HoverIcons name="retweet">
                <svg
                  style={{
                    width: 18,
                    paddingBottom: 15,
                    marginRight: 5,
                    paddingTop: 2,
                  }}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <G>
                    <path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path>
                  </G>
                </svg>
              </HoverIcons>
            </Icon>
            {connected && (
              <div
                style={{
                  borderBottom: "1px solid lightgrey",
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <ImageBox>
                  <Image
                    roundedCircle="true"
                    style={{ width: 40 }}
                    src={
                      user.profilePicture === ""
                        ? `http://localhost:5000/22-01-2022-03-10-18-default_profile_400x400.png`
                        : `${user.profilePicture}`
                    }
                    alt={`${user.username}`}
                  />
                </ImageBox>
                <Form
                  onSubmit={formik.handleSubmit}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignSelf: "center",
                    width: "100%",
                  }}
                >
                  <Form.Group>
                    <Form.Control
                      name="content"
                      className="input-text"
                      style={{
                        border: "none",
                        overflow: "auto",
                        outline: "none",
                        resize: "none",
                        width: "100%",
                      }}
                      value={formik.values.content}
                      type="text"
                      placeholder="Tweetez votre réponse."
                      as="input"
                      onChange={formik.handleChange}
                    />
                  </Form.Group>
                  <Button type="submit">Répondre</Button>
                </Form>
              </div>
            )}
            <div>
              {comments &&
                comments.map((comment) => (
                  <CommentCard
                    key={comment._id}
                    username={comment.user.username}
                    content={comment.content}
                    photo={comment.user.profilePicture}
                    usernameTweet={tweet.user.username}
                    tweetId={tweet._id}
                    createdAt={comment.createdAt}
                    userId={comment.user}
                    commentId={comment._id}
                  />
                ))}
            </div>
          </Col>

          <Col xs={4} className="none-right fixed-right">
            <SearchBar />
            {connected && <FollowCardSide />}
          </Col>
        </Row>
      </Container>
    </Main>
  );
};

export default Tweet;
