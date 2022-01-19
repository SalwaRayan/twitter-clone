import React, { useState } from 'react'
import { Button, Form } from "react-bootstrap"
import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = styled.div`
    font-family: "Twitter Bold";
    height: 73px;
    position: sticky;
    backface-visibility: hidden;
    z-index: 3;
    display: flex;
    flex-direction: row;
`

const ContainerTweetView = styled.div`
    max-width: 600px;    
    height: 100vh;
    border-left: 1px solid lightgrey;
    border-right: 1px solid lightgrey;
    z-index: 5;
`

const H4 = styled.h4`
    margin: 20px;
`

const ComposeTweetForm = () => {

    const [tweetValueEdit, setTweetValueEdit] = useState('')

    const handleChangeTweetValue = e => {
        const { value } = e.target
        setTweetValueEdit(value)
    }

    const handleTweetSubmit = e => {
        e.preventDefault()
        setTweetValueEdit('')
    }

    return (
        <ContainerTweetView>

        <Header>
            <H4>Accueil</H4>
        </Header>
            <Form className="compose-tweet-form" onSubmit={handleTweetSubmit}>
                <Form.Group className="mb-3">
                    <Form.Control
                            className="input-text"
                            value={tweetValueEdit}
                            type="text"
                            placeholder="Quoi de neuf ?"
                            as="input"
                            rows={3}
                            onChange={handleChangeTweetValue}
                        />
                </Form.Group>
                <Link>
                    <div style={{ borderRadius: 100 }}>
                    </div>      
                </Link>
                <Button style={{ position: "relative", right: -300, borderRadius: 50, paddingLeft: 27, paddingRight: 27 }}>Tweeter</Button>
            </Form>
        </ContainerTweetView>
    );
};

export default ComposeTweetForm