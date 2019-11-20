import React from "react";
import { IoIosPerson } from "react-icons/io";

export default function Header(props) {
  const { user } = props;

  return (
    <header id="header-profile" className="header-profile">
      <div>
        <span className="user-img">
          <IoIosPerson />
          {/* <img /> */}
        </span>
        <span className="user-name">
          <h3>{user.name}</h3>
        </span>
      </div>
    </header>
  );
}
