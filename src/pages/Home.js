import React from 'react';
import { useState } from 'react';


import styled from 'styled-components'

import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, Col, Container, Row } from 'react-bootstrap';

import { default as twitter } from '../images/twitter.svg'
import { default as twitterBlue } from '../images/twitter-blue.svg'

import SignUp from '../components/SignUp'

const Main = styled.main`
    background-color: #fff;
    width: 100%;
    font-family: 'Twitter';
    display: flex;   
`

const ContainerImg = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 900px;
`

const Img = styled.img`
    position: relative;
`

const ImgSvg = styled.img`
    z-index: 200;
    position: absolute;
    width: 29em;
`

const ImgSvg2 = styled.img`
    width: 3em;
    fill: #1DA1F2;
    margin: 40px 100px;
`

const ContainerBtn = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 80px;
`

const Home = () => {
    const [modalShow, setModalShow] = useState(false);

    return (
        <Main>
            <Row>
                <Col sm={6} style={{ backgroundColor: 'black' }}>
                    <ContainerImg>
                        <Img src="http://localhost:5000/17-01-2022-12-29-45-twitter-bckg-home.png" />
                        <ImgSvg src={twitter} />
                    </ContainerImg>
                </Col>
                <Col sm={6} style={{ backgroundColor: 'white' }}>
                    <Container>
                        <ImgSvg2 src={twitterBlue} />
                        <h1 style={{ fontSize: 75, marginTop: 25, marginBottom: 45, marginLeft: 100 }}>Ça se passe <br /> maintenant</h1>
                        <h2 style={{ fontSize: 30, marginLeft: 100, marginTop: 40 }}>Rejoignez Twitter dès aujourd'hui.</h2>
                    </Container>
                    <ContainerBtn>
                        <Button
                            variant="primary"
                            style={{
                                fontSize: 27,
                                marginLeft: 100,
                                marginTop: 40,
                                borderRadius: 50
                            }}
                            onClick={() => setModalShow(true)}
                        >
                            S'inscrire
                        </Button>
                        <p style={{ marginTop: 200, marginLeft: 100 }}>Vous avez déjà un compte ?</p>
                        <Button
                            variant="dark"
                            style={{
                                fontSize: 27,
                                marginLeft: 100,
                                marginTop: 2,
                                borderRadius: 50,
                                borderColor: 'black',
                                border: 1
                            }}
                        >
                            Se connecter
                        </Button>
                        <SignUp
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />
                    </ContainerBtn>
                </Col>
            </Row>

        </Main>
    );
};

export default Home;