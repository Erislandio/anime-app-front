import React from "react";
import {
  IoIosArrowForward,
  IoIosRemoveCircleOutline,
  IoIosClose
} from "react-icons/io";
import classnames from "classnames";

export function FilterContainer({ open, onClose }) {
  const actionsButtons = [
    {
      name: "Filtar",
      icon: <IoIosArrowForward size={25} color="#fff" />
    },
    {
      name: "Remover",
      icon: <IoIosRemoveCircleOutline size={25} color="#f953c6" />
    }
  ];

  const filters = [
    {
      name: "Tudo",
      icon: <IoIosArrowForward size={25} color="#f953c6" />
    },
    {
      name: "Genero",
      icon: <IoIosArrowForward size={25} color="#f953c6" />
    }
  ];

  const openModal = classnames({ open: open });

  return (
    <div id="filter-container" className={openModal}>
      <div>
        <div className="filter-content-top">
          <span>
            <h2>Filtar</h2>
            <p>Muitas coisas para voce!</p>
          </span>
          <IoIosClose
            size={40}
            color="#2c3e50"
            id="close-btn-filter"
            onClick={() => onClose()}
          />
        </div>
        <ul>
          {filters.map((filter, index) => {
            return (
              <li key={index}>
                <h4>{filter.name}</h4>
                <span>{filter.icon}</span>
              </li>
            );
          })}
        </ul>
        <div className="btn-container">
          {actionsButtons.map((action, index) => {
            return (
              <div key={index}>
                <button>
                  {action.name}
                  <span>{action.icon}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
