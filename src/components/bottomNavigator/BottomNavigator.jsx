import React from "react";
import { Link } from "react-router-dom";
import {
  IoIosHome,
  IoIosSearch,
  IoIosRocket,
  IoIosOptions
} from "react-icons/io";
import "./bottomnavigator.css";

function BottomNavigator(props) {
  const menuOptions = [
    {
      id: 1,
      icon: <IoIosHome size="30" color="#f953c6" />,
      url: "/home"
    },
    {
      id: 2,
      icon: <IoIosSearch size="30" color="#f953c6" />,
      url: "/search"
    },
    // {
    //   id: 3,
    //   icon: <IoIosRocket size="30" color="#f953c6"/>,
    //   url: '/'
    // },
    {
      id: 4,
      icon: <IoIosOptions size="30" color="#f953c6" />,
      url: "profile"
    }
  ];

  return (
    <div id="bottom-navigator">
      <ul>
        {menuOptions.map(option => {
          return (
            <li key={option.id}>
              <Link to={option.url}>{option.icon}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default BottomNavigator;
