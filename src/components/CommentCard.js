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

const CommentCard = ({
  username,
  content,
  photo,
  usernameTweet,
  tweetId,
  createdAt,
}) => {
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
