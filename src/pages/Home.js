import { useState } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components'
import { default as twitter } from '../images/twitter.svg'
import { default as twitterBlue } from '../images/twitter-blue.svg'
import { Button, Col, Container, Row } from 'react-bootstrap';
import SignUp from './Login'
import 'bootstrap/dist/css/bootstrap.min.css';

import '../App.css'


const Main = styled.main`
    background-color: #fff;
    min-width: 100vw;
    font-family: 'Twitter';
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
    /* margin-left: 100px; */
`

const H2 = styled.h2`
    font-size: 25px; 
`

const Home = () => {
    const [modalShow, setModalShow] = useState(false);

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
                            variant="primary"
                            style={{
                                fontSize: 22,
                                marginLeft: 100,
                                marginTop: 40,
                                borderRadius: 50, 
                                paddingLeft: 60,
                                paddingRight: 60
                            }}
                            onClick={() => setModalShow(true)}
                        >
                            S'inscrire
                        </Button>

                        <Link to="/login" style={{ color: "black", textDecoration: "none", marginLeft: 100, }}>
                            <h3 style={{ marginTop: 70 }} mt={2} >
                                Vous avez déjà un compte ?
                            </h3>
                        </Link>
                        <Button
                            variant="dark"
                            style={{
                                fontSize: 22,
                                marginLeft: 100,
                                marginTop: 2,
                                borderRadius: 50,
                                paddingLeft: 47,
                                paddingRight: 47
                            }}
                        >
                            Se connecter
                        </Button>
                        <SignUp
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />
                    </Container>
                </Col>
            </Row>
        </Main>
    );
};

export default Home;