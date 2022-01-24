import moment from "moment";
import React from "react";
import { useContext } from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { UserContext } from "../contexts/User";

import { ImageBox } from "./styledComponents/StyledComponents";

const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
`;

const Text = styled.p`
  margin-right: 5px;
  color: ${(props) => (props.type === "username" ? "#7d8a94" : "black")};
  font-family: ${(props) =>
    props.type === "name" ? "Twitter bold" : "Twitter Regular"};
  padding: 0;
  margin: 0;
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

const CommentCard = ({
  username,
  content,
  photo,
  usernameTweet,
  tweetId,
  createdAt,
  userId,
  commentId
}) => {
  const { user } = useContext(UserContext)

  // console.log("userId: ", userId)
  // console.log("user._id: ", user._id)

  const deleteComment = async (id) => {
    const response = await fetch(`http://localhost:5000/comments/${id}`, { 
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
  }

  return (
    <div style={{ borderBottom: "1px solid lightgrey", width: "100%" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <ImageBox>
          <Image
            roundedCircle="true"
            style={{ width: 40 }}
            src={
              photo === ""
                ? `http://localhost:5000/22-01-2022-03-10-18-default_profile_400x400.png`
                : `${photo}`
            }
          />
        </ImageBox>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <UserInfo>
            <Text type="name">{username}</Text>
            <Text type="username" style={{ marginLeft: 7, marginRight: 7 }}>
              @{username}
            </Text>
            <Text type="username">
              {moment(createdAt).local("fr").format("LT - DD MMM YYYY")}
            </Text>
          </UserInfo>
          <div>
            <p style={{ margin: 0, padding: 0, color: "#7d8a94" }}>
              En reponse{" "}
              <Link
                to={`/${usernameTweet}/${tweetId}/tweet`}
                style={{ color: "#1da1f2" }}
              >
                @{usernameTweet}
              </Link>
            </p>
            <div>
              {userId === user._id && (
                <Button type="button" onClick={() => deleteComment(commentId)}>
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    style={{ width: 18 }}
                  >
                    <g fill="red">
                      <path d="M20.746 5.236h-3.75V4.25c0-1.24-1.01-2.25-2.25-2.25h-5.5c-1.24 0-2.25 1.01-2.25 2.25v.986h-3.75c-.414 0-.75.336-.75.75s.336.75.75.75h.368l1.583 13.262c.216 1.193 1.31 2.027 2.658 2.027h8.282c1.35 0 2.442-.834 2.664-2.072l1.577-13.217h.368c.414 0 .75-.336.75-.75s-.335-.75-.75-.75zM8.496 4.25c0-.413.337-.75.75-.75h5.5c.413 0 .75.337.75.75v.986h-7V4.25zm8.822 15.48c-.1.55-.664.795-1.18.795H7.854c-.517 0-1.083-.246-1.175-.75L5.126 6.735h13.74L17.32 19.732z"></path>
                      <path d="M10 17.75c.414 0 .75-.336.75-.75v-7c0-.414-.336-.75-.75-.75s-.75.336-.75.75v7c0 .414.336.75.75.75zm4 0c.414 0 .75-.336.75-.75v-7c0-.414-.336-.75-.75-.75s-.75.336-.75.75v7c0 .414.336.75.75.75z"></path>
                    </g>
                  </svg>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <p style={{ marginLeft: 70 }}>{content}</p>
      </div>
    </div>
  );
};

export default CommentCard;
