import { useState } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components'
import { default as twitter } from '../images/twitter.svg'
import { default as twitterBlue } from '../images/twitter-blue.svg'
import { Button, Col, Container, Row } from 'react-bootstrap';
import SignUp from './SignUp'
import 'bootstrap/dist/css/bootstrap.min.css';

import '../App.css'
import Login from "./Login";


const Main = styled.main`
    background-color: #fff;
    min-width: 100vw;
    display: flex;
    align-self: center;
    align-content: center;
    justify-content: center;
    align-items: center;
`

const ContainerImg = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 100%;
`

const BackgroundImg = styled.img`
    position: relative;
`

const ImgSvg = styled.img`
    z-index: 20;
    position: absolute;
    width: 19em;
`

const TwitterLogoBlue = styled.img`
    margin-top: 25px;
    width: 30px;
    fill: #1DA1F2;
`

const ContainerBtn = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    left: -80px;
`

const H1 = styled.h1`
    font-size: 50px; 
    margin-top: 25px; 
    margin-bottom: 35px; 
    font-family: 'Twitter Extended Heavy';
    /* margin-left: 100px; */
`

const H2 = styled.h2`
    font-size: 25px; 
    font-family: 'Twitter Extended Heavy';
`

const Home = () => {
    const [modalShowSignup, setModalShowSignup] = useState(false);
    const [modalShowLogin, setModalShowLogin] = useState(false);

    return (
        <Main>

            <Row className="row-twt-hm">

                <Col className="div-twt-two" lg={6} xs={0}>
                    <ContainerImg>
                        <BackgroundImg className="twitter-logo" src="http://localhost:5000/17-01-2022-12-29-45-twitter-bckg-home.png" />
                        <ImgSvg src={twitter} />
                    </ContainerImg>
                </Col>

                <Col className="div-twt-one" lg={6} xs={12}>
                    <Container>
                        <TwitterLogoBlue src={twitterBlue} />
                        <H1>Ça se passe <br /> maintenant</H1>
                        <H2>Rejoignez Twitter dès aujourd'hui.</H2>
                    </Container>
                    <Container>
                        <Button
                            style={{
                                fontSize: 22,
                                marginTop: 40,
                                borderRadius: 50, 
                                paddingLeft: 60,
                                paddingRight: 60,
                                borderColor: "#1DA1f2",
                                background: "#1DA1F2",
                                fontFamily: 'Twitter Bold'
                            }}
                            onClick={() => setModalShowSignup(true)}
                        >
                            S'inscrire
                        </Button>
                        <SignUp
                            show={modalShowSignup}
                            onHide={() => setModalShowSignup  (false)}
                        />

                        <Link to="/login" style={{ color: "black", textDecoration: "none", marginLeft: 100, }}>
                            <h3 style={{ marginTop: 70, fontFamily: 'Twitter Extended Heavy' }} mt={2} >
                                Vous avez déjà un compte ?
                            </h3>
                        </Link>
                        <Button
                            variant="dark"
                            style={{
                                fontSize: 22,
                                marginTop: 2,
                                borderRadius: 50,
                                paddingLeft: 47,
                                paddingRight: 47,
                                fontFamily: 'Twitter Bold'
                            }}
                            onClick={() => setModalShowLogin(true)}
                        >
                            Se connecter
                        </Button>
                         <Login
                            show={modalShowLogin}
                            onHide={() => setModalShowLogin(false)}
                        />
                    </Container>
                </Col>
            </Row>
        </Main>
    );
};

export default Home;
