import React from "react";
import { useContext } from "react";
import { Image } from "react-bootstrap";

import { UserContext } from "../contexts/User";

import { ImageBox } from "./styledComponents/StyledComponents";

const CommentCard = (props) => {

  return (
    <div>
      <ImageBox>
        <Image
          roundedCircle="true"
          style={{ width: 40 }}
          // src={
          //   user.profilePicture === ""
          //     ? `http://localhost:5000/22-01-2022-03-10-18-default_profile_400x400.png`
          //     : `${user.profilePicture}`
          // }
        />
      </ImageBox>
      <div>
        <div>
          <p>username</p>
          <p>@username</p>
          <p>9h</p>
        </div>
        <p>En reponse @username</p>
        <p>Content</p>
      </div>
    </div>
  );
};

export default CommentCard;
