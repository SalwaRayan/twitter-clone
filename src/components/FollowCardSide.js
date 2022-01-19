import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const HeightTitle = styled.div`
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  width: 90%;
  display: flex;
  height: 50px;
  align-items: center;
  background: #f7f9f9;
  // background: orange;
  padding: 15px 10px;
  margin-top: 20px;
  margin-left: 15px;
`;

const Next = styled.div`
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  width: 90%;
  display: flex;
  height: 50px;
  align-items: center;
  background: #f7f9f9;
  // background: orange;
  padding: 15px 10px;
  margin-bottom: 20px;
  margin-left: 15px;

  &:hover {
    background-color: #e7e7e8;
  }
`;

const Title = styled.h2`
  font-family: "Twitter bold";
  font-size: 25px;
`;

const Text = styled.p`
  font-family: ${(props) =>
    props.type === "name" ? "Twitter bold" : "Twitter"};
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
  display: flex;
  flex-direction: row;
  height: 70px;
  align-items: center;
  background: #f7f9f9;
  width: 90%;
  padding: 15px 10px;
  align-items: center;
  margin-left: 15px;

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
  background: black;
  width: 50px;
  height: 50px;

  @media (max-width: 1400px) {
    height: 45px;
  }
`;

const FollowCardSide = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    const response = await fetch('http://localhost:5000/users', {
      credentials: 'include'
    })

    const data = await response.json()

    if(data) {
      setUsers(data)
    }
  }


  return (
    <>
      <HeightTitle>
        <Title>Suggestions</Title>
      </HeightTitle>

      <UserInfo>
        <Link className="link-user" to="/">
          <BoxImage>
            <Image roundedCircle="true" />
          </BoxImage>
          <User>
            <div>
              <Text type="name">User</Text>
              <Text type="username">@User</Text>
            </div>
            <div>
              <Button>Suivre</Button>
            </div>
          </User>
        </Link>
      </UserInfo>
      <UserInfo>
        <Link className="link-user" to="/">
          <BoxImage>
            <Image roundedCircle="true" />
          </BoxImage>
          <User>
            <div>
              <Text type="name">User</Text>
              <Text type="username">@User</Text>
            </div>
            <div>
              <Button>Suivre</Button>
            </div>
          </User>
        </Link>
      </UserInfo>

      <Next>
        <Link className="link" to="">
          Voir plus
        </Link>
      </Next>
    </>
  );
};

export default FollowCardSide;
