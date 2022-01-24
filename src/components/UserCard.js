import React, { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { Image } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import { UserContext } from "../contexts/User"
// import { HiOutlineDotsHorizontal } from "react-icons/hi";
// import { BsDot } from "react-icons/bs";
// import { ImageBox } from "./styledComponents/StyledComponents";

const Text = styled.p`
  font-family: ${(props) =>
    props.type === "name" ? "Twitter bold" : "Twitter Regular"};
  margin: 0;

  &:hover {
    text-decoration: ${(props) => props.type === "name" && "underline"};
  }
`;

const Button = styled.button`
  border: none;
  background: black;
  border-radius: 9999px;
  color: white;
  font-family: "Twitter bold";
  font-size: 12px;
  padding: 5px 10px;

  &:hover {
    background: #272c30;
  }
`;

const UserInfo = styled.div`
  margin-top: 1.5px;
  display: flex;
  flex-direction: row;
  height: 70px;
  align-items: center;
  background: #f7f9f9;
  width: 90%;
  padding: 15px 10px;
  align-items: center;
  margin-left: 15px;
  border-radius: 20px;

  &:hover {
    background-color: #e7e7e8;
    }
`;

const User = styled.div`
  width: 80%;
  margin: 0 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const BoxImage = styled.div`
  margin: 4px;
  border-radius: 9999px;
  // background: black;
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




const UserCard = ({ username, profilePicture, id }) => {

  const { connected, user, setUser } = useContext(UserContext)

  const [countComment, setCountComment] = useState();
  const [countRetweet, setCountRetweet] = useState();

  useEffect(() => {
    // countComments();
    // countRet weets();
  }, []);

  const onHandleClickFollow = async (id) => {
    const response = await fetch(
      `http://localhost:5000/follow/${user._id}/${id}`,
      {
        credentials: "include",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.error) {
      alert(response.error);
      return;
    }

    if (response.status >= 400) {
      alert(response.statusText);
    }

    const data = await response.json();

    setUser(data);
    // setFollow(follow)
  };

  // const countComments = () => {
  //   console.log(props.comments);
  //   const count = props.comments.length;

  //   setCountComment(count);
  // };
  // const countRetweets = () => {
  //   const count = props.retweets.length;

  //   setCountRetweet(count);
  // };

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
    <UserInfo>
      <BoxImage>
        <Image
          roundedCircle="true"
          style={{ width: 40 }}
          src={
              profilePicture === ""
              ? `http://localhost:5000/22-01-2022-03-10-18-default_profile_400x400.png`
              : `${profilePicture}`
          }
        />
      </BoxImage>
      <User>
        <Link to={`/${username}`} className="link">
          <Text type="name">{username}</Text>
          <Text type="username">@{username}</Text>
        </Link>
        <div>
          {connected ? (
            user.following.includes(id) ? (
              <Button onClick={() => onHandleClickFollow(id)}>
                Abonné
              </Button>
            ) : (
              <Button onClick={() => onHandleClickFollow(id)}>
                Suivi
              </Button>
            )
          ) : null}
        </div>
      </User>
    </UserInfo>
  );
};

export default UserCard;
