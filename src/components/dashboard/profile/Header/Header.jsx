import React from "react";
import { MdAddAPhoto } from "react-icons/md";
import ImageUploader from "react-images-upload";

export default function Header(props) {
  const { user } = props;

  return (
    <header id="header-profile" className="header-profile">
      <div>
        <span className="user-img">
          <MdAddAPhoto size={50} />
        </span>
        <span className="user-name">
          <h3>{user.name}</h3>
        </span>
      </div>
    </header>
  );
}
