import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { FlexFooter } from "../components/FlexFooter";

import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import FollowCardSide from "../components/FollowCardSide";
import ComposeTweetForm from "../components/ComposeTweetForm";
import { UserContext } from "../contexts/User";
import TweetCard from "../components/TweetCard";

const Main = styled.main`
  height: 100%;
`;

const ContainerView = styled.div`
  width: 100%;
  height: 100%;
  border-left: 1px solid lightgrey;
  border-right: 1px solid lightgrey;
  z-index: 5;
`;

const Header = styled.div`
  font-family: "Twitter Bold";
  height: 73px;
  position: sticky;
  backface-visibility: hidden;
  z-index: 3;
  display: flex;
  flex-direction: row;
`;

const H4 = styled.h4`
  margin: 20px;
`;

const Homepage = () => {
  const { user, setConnected, connected } = useContext(UserContext);
  const [ tweets, setTweets ] = useState([]);

  useEffect(() => {
    verifyConnection();
    getTweets();
  }, [tweets]);

  const verifyConnection = () => {
    if (!user) {
      setConnected(false);
    }
  };

  const getTweets = async () => {
    if (connected) {
      if (user.following.length === 0) {
        const response = await fetch(
          `http://localhost:5000/tweets/${user._id}/tweets`,
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        setTweets(data);
      } else {
        getAllTweets()
      }
    } else {
      getAllTweets()
    }
  };

  const getAllTweets = async () => {
    const response = await fetch("http://localhost:5000/tweets", {
      credentials: "include",
    });

    const data = await response.json();

    setTweets(data);
  };

  if (!tweets) {
    return <p>Chargement...</p>;
  }

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
          <Col  xs={6}>
            <ContainerView>
              <Header>
                <H4>Accueil</H4>
              </Header>
              {connected ? (
                <>
                  <ComposeTweetForm getTweets={getTweets} />
                  {/* if connected show only tweets of user followed, if no user is followed show all tweets */}
                  {tweets.map((tweet) => (
                    <TweetCard
                      key={tweet._id}
                      tweet={tweet._id}
                      username={tweet.user.username}
                      content={tweet.content}
                      photo={tweet.user.profilePicture}
                      comments={tweet.comments}
                      retweets={tweet.retweets}
                      userId={tweet.user._id}
                      createdAt={tweet.createdAt}
                    />
                  ))}
                </>
              ) : (
                // if not connected show all tweets
                tweets.map((tweet) => (
                  <TweetCard
                    key={tweet._id}
                    tweet={tweet._id}
                    username={tweet.user.username}
                    content={tweet.content}
                    photo={tweet.user.profilePicture}
                    comments={tweet.comments}
                    retweets={tweet.retweets}
                    userId={tweet.user._id}
                    createdAt={tweet.createdAt}
                  />
                ))
              )}
            </ContainerView>
          </Col>
          <Col xs={3} className="none-right fixed-right">
            <SearchBar />
            {connected && <FollowCardSide />}
          </Col>
        </Row>
      </Container>
    </Main>
  );
};

export default Homepage;
