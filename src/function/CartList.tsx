import React from "react";

type Props = {};

const CartList = (props: Props) => {
  return (
    <>
      <div className="container">
        <button id="toggleButton" className="toggle-button">
          ☰
        </button>

        <div id="toggleList" className="side-panel">
          <ul id="tocList">
            <div className="out">
              <span>Nội Dung Bài Viết</span>
              <span id="closeMenuIcon">X</span>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default CartList;
