import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsCalendar3 } from "react-icons/bs";

import { FlexFooter } from "../components/FlexFooter";

import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import FollowCardSide from "../components/FollowCardSide";
import TweetCard from "../components/TweetCard";
import CommentCard from "../components/CommentCard";

import { UserContext } from "../contexts/User";

import cameraLogo from "../images/camera.png";
import { useParams } from "react-router-dom";

import Edit from "../components/Edit";
import moment from "moment";

const Main = styled.main`
  font-family: "Twitter Heavy";
  height: 100%;
`;

const Button = styled.button`
  width: 50%;
  background: white;
  color: ${props => props.isSelected === "Tweets" ? "black" : "#64737f"};
  border: none;
  text-decoration: ${props => props.isSelected === "Tweets" ? "underline" : "none"};
`

const Profile = () => {
  //modal upadte user profile
  const [modalShow, setModalShow] = useState(false);

  const { username, connected } = useParams();
  const { user, setUser } = useContext(UserContext);

  const [countFollowers, setCountFollowers] = useState();
  const [countFollowing, setCountFollowing] = useState();
  const [userInfo, setUserInfo] = useState({});
  const [activeTab, setActiveTab] = useState("Tweets");

  // componentDidmount hook
  useEffect(() => {
    getUser()
  }, []);

  const getUser = async () => {
    const response = await fetch(`http://localhost:5000/users/${username}`, {
      credentials: "include",
    });
    const data = await response.json();
    setUserInfo(data);
  };

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
    onCountFollowers();
    onCountFollowing();
  };

  const onCountFollowers = () => {
    const count = userInfo.followers.length;

    setCountFollowers(count);
  };
  const onCountFollowing = () => {
    const count = userInfo.following.length;

    setCountFollowing(count);
  };

  const handleButtonClick = (tab) => {
    setActiveTab(tab);
  };

  console.log(userInfo);

  if (!userInfo) {
    return <p>Chargement...</p>;
  }

  return (
    <Main>
      <Container>
        <Row>
          <Col xs={3} className="none width">
            <Sidebar />
            <FlexFooter>
              <Footer />
            </FlexFooter>
          </Col>

          <Col className="profile flex-column">
            <div className="flex-column">
              <div className="banner">
                {userInfo.bannerProfile !== "" && (
                  <img
                    src={userInfo.profilePicture}
                    style={{ width: "100%" }}
                  />
                )}
              </div>
              <div className="profile-data">
                <div className="avatar">
                  <img
                    src={
                      userInfo.profilePicture === ""
                        ? `http://localhost:5000/22-01-2022-03-10-18-default_profile_400x400.png`
                        : `${userInfo.profilePicture}`
                    }
                    style={{ width: 145 }}
                    alt="avatar"
                  />
                </div>
                {connected ? (
                  user.username === userInfo.username ? (
                    <>
                      <button
                        className="edit-follow-profile-btn"
                        onClick={() => setModalShow(true)}
                      >
                        Éditer le profil
                      </button>
                      <Edit
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                      />
                    </>
                  ) : (
                    <button
                      className="edit-follow-profile-btn"
                      onClick={() => onHandleClickFollow(userInfo._id)}
                    >
                      Suivre
                    </button>
                  )
                ) : null}
                <div className="nickname-ctn">
                  <p style={{ margin: 0, padding: 0, fontSize: 20 }}>
                    {userInfo.username}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      padding: 0,
                      fontSize: 20,
                      color: "#7d8a94",
                      fontSize: 16,
                    }}
                  >
                    @{userInfo.username}
                  </p>
                </div>
                <div style={{ marginLeft: 30, marginTop: 15 }}>
                  <p>{userInfo.description}</p>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <BsCalendar3
                    style={{ marginLeft: 30, marginTop: 15, color: "#7d8a94" }}
                  />
                  <p
                    style={{ marginLeft: 10, marginTop: 12, color: "#7d8a94" }}
                  >
                    A rejoint Twitter en {" "}
                    {moment(userInfo.createdAt).local("fr").format("MMMM YYYY")}
                  </p>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Link
                    to={`/${userInfo.username}/followers`}
                    style={{
                      fontSize: 13,
                      marginLeft: 30,
                      color: "black",
                      textDecoration: "none",
                    }}
                  >
                    <p>{countFollowers} abonnements</p>
                  </Link>
                  <Link
                    to={`/${userInfo.username}/following`}
                    style={{
                      fontSize: 13,
                      marginLeft: 30,
                      color: "black",
                      textDecoration: "none",
                    }}
                  >
                    <p>{countFollowing} abonnés</p>
                  </Link>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 70, width: "100%", display: "flex", height: 50 }}>
              <Button
                isSelected={activeTab === "Tweets"}
                onClick={() => handleButtonClick("Tweets")}
              >
                Tweets
              </Button>
              <Button
                isSelected={activeTab === "Résponses"}
                onClick={() => handleButtonClick("Résponses")}
              >
                Réponses
              </Button>
            </div>
            <div>
              {userInfo.tweets &&
                activeTab === "Tweets" &&
                userInfo.tweets.map((tweet) => {
                  <TweetCard
                    key={tweet._id}
                    tweet={tweet._id}
                    username={userInfo.username}
                    content={tweet.content}
                    photo={userInfo.profilePicture}
                    comments={tweet.comments}
                    retweets={tweet.retweets}
                    userId={userInfo._id}
                    createdAt={tweet.createdAt}
                  />;
                })}
            </div>
            <div>
              {userInfo.comments &&
                activeTab === "Tweets" &&
                userInfo.comments.map((comment) => {
                  <CommentCard
                    key={comment._id}
                    comment={comment._id}
                    username={userInfo.username}
                    content={comment.content}
                    photo={userInfo.profilePicture}
                    userId={userInfo._id}
                    createdAt={comment.createdAt}
                  />;
                })}
            </div>
          </Col>

          <Col xs={4} className="none-right width-right">
            <SearchBar />
            <FollowCardSide />
          </Col>
        </Row>
      </Container>
    </Main>
  );
};

export default Profile;
