import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { BsDot } from "react-icons/bs";
import { UserContext } from "../contexts/User";
import { ImageBox } from "./styledComponents/StyledComponents";

const Card = styled.div`
  /* background: orange; */
  width: 100%;
  border-bottom: 1px solid lightgrey;
  display: flex;
  flex-direction: row;
`;

const TweetInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 60px);
  padding-right: 10px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
  height: 22px;
`;

const Text = styled.p`
  margin-right: 5px;
`;

const Content = styled.div`
  margin: 0;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: row;
`;

const Icons = styled.button`
  display: flex;
  flex-direction: row;
  margin-right: 100px;
  background: none;
  border: none;
  border-radius: 9999px;
  margin-bottom: 10px;
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

const SpaceLeft = styled.div`
  display: flex;
  flex-direction: row;
`;

const G = styled.g`
  fill: "black";

  :hover {
    fill: #1da1f2;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  border-radius: 9999px;
  transition-duration: 0.2s;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-content: center;

  &:hover {
    background: #fccbcb;
  }
`;

const TweetCard = (props) => {
  const { user } = useContext(UserContext);
  const [countComment, setCountComment] = useState();
  const [countRetweet, setCountRetweet] = useState();

  useEffect(() => {
    countComments();
    countRetweets();
  }, []);

  const countComments = () => {
    const count = props.comments.length;

    setCountComment(count);
  };
  const countRetweets = () => {
    const count = props.retweets.length;

    setCountRetweet(count);
  };

  const deleteTweet = async (id) => {
    const response = await fetch(`http://localhost:5000/tweets/${id}`, {
      credentials: "include",
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.error) {
      alert(response.error);
      return;
    }

    if (response.status >= 400) {
      alert(response.statusText);
    }
  };

  // const

  return (
    <div style={{ width: "100%" }}>
      <Card>
        <ImageBox>
          <Image />
        </ImageBox>
        <TweetInfo>
          <UserInfo>
            <SpaceLeft>
              <Link to={`/${props.username}`} className="link">
                <Text style={{ fontFamily: "Twitter Bold" }}>
                  {props.username}
                </Text>
              </Link>
              <Text style={{ color: "#96a0a8" }}>@{props.username}</Text>
              <Text style={{ color: "#96a0a8" }}>
                <BsDot style={{ color: "#96a0a8" }} />
              </Text>
              <Text style={{ color: "#96a0a8" }}>2h</Text>
            </SpaceLeft>
            <div>
              {props.userId === user._id && (
                <Button type="button" onClick={() => deleteTweet(props.tweet)}>
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    style={{ width: 18, paddingBottom: 15, paddingTop: 5 }}
                  >
                    <g fill="red">
                      <path d="M20.746 5.236h-3.75V4.25c0-1.24-1.01-2.25-2.25-2.25h-5.5c-1.24 0-2.25 1.01-2.25 2.25v.986h-3.75c-.414 0-.75.336-.75.75s.336.75.75.75h.368l1.583 13.262c.216 1.193 1.31 2.027 2.658 2.027h8.282c1.35 0 2.442-.834 2.664-2.072l1.577-13.217h.368c.414 0 .75-.336.75-.75s-.335-.75-.75-.75zM8.496 4.25c0-.413.337-.75.75-.75h5.5c.413 0 .75.337.75.75v.986h-7V4.25zm8.822 15.48c-.1.55-.664.795-1.18.795H7.854c-.517 0-1.083-.246-1.175-.75L5.126 6.735h13.74L17.32 19.732z"></path>
                      <path d="M10 17.75c.414 0 .75-.336.75-.75v-7c0-.414-.336-.75-.75-.75s-.75.336-.75.75v7c0 .414.336.75.75.75zm4 0c.414 0 .75-.336.75-.75v-7c0-.414-.336-.75-.75-.75s-.75.336-.75.75v7c0 .414.336.75.75.75z"></path>
                    </g>
                  </svg>
                </Button>
              )}
            </div>
          </UserInfo>
          <Content>
            <Link to={`/${props.username}/${props.tweet}/tweet`} className="link">
              <p>{props.content}</p>
            </Link>
          </Content>
          <Actions>
            <Icons>
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
              <p>{countComment}</p>
            </Icons>
            <Icons>
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
              <p>{countRetweet}</p>
            </Icons>
          </Actions>
        </TweetInfo>
      </Card>
    </div>
  );
};

export default TweetCard;
