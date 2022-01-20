import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";

const Form = styled.form`
  margin-top: 10px;
  margin-bottom: 25px;
  margin-left: 15px;
  width: 90%;
  display: flex;
  border-radius: 9999px;
  background: #f7f9f9;
  padding: 10px 15px;

  &:focus {
    border: 2px solid #1da1f2;
    background: #ffffff;
    color: #1da1f2;
  }
`

const Input = styled.input`
  border: none;
  background: none;
  outline: none !important;
  margin-left: 10px;
  width: 100%;
`;

const Button = styled.button`
  border: none;
  background: none;
`;

const Cancel = styled.div`
  border: none;
  background: #1da1f2;
  border-radius: 9999px;
  height: 27px;
  width: 31px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #1a8cd8;
  }
`;

const Svg = styled.svg`
  width: ${(props) => (props.type === "button" ? "20px" : "13px")};
`;

const SearchBar = () => {
  return (
    <Form>
      <Button>
        <Svg viewBox="0 0 24 24" aria-hidden="true" type="button">
          <g>
            <path
              fill="#778590"
              d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
            ></path>
          </g>
        </Svg>
      </Button>
      <Input type="text" placeholder="Recherche Twitter" />
      {/* <Cancel>
        <Svg
          viewBox="0 0 15 15"
          aria-hidden="true"
        >
          <g>
            <path fill="white" d="M8.914 7.5l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L7.5 6.086 1.707.293c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L6.086 7.5.293 13.293c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L7.5 8.914l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L8.914 7.5z"></path>
          </g>
        </Svg>
      </Cancel> */}
    </Form>
  );
};

export default SearchBar;
