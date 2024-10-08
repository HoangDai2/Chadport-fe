import React, { useEffect } from "react";

type Props = {};

const CartList = (props: Props) => {
  useEffect(() => {
    const toggleButton = document.getElementById("toggleButton");
    const toggleList = document.getElementById("toggleList");
    const closeMenuIcon = document.getElementById("closeMenuIcon");

    console.log("DOM loaded successfully");

    const handleToggleButtonClick = () => {
      if (toggleList) {
        toggleList.classList.toggle("show");
      }
    };

    const handleCloseMenuIconClick = () => {
      if (toggleList) {
        toggleList.classList.remove("show");
      }
    };

    const handleDocumentClick = (event: MouseEvent) => {
      if (toggleList && toggleButton) {
        const isClickInsideMenu = toggleList.contains(event.target as Node);
        const isClickToggleButton = toggleButton.contains(event.target as Node);
        if (!isClickInsideMenu && !isClickToggleButton) {
          toggleList.classList.remove("show");
        }
      }
    };

    const handleScroll = () => {
      if (window.scrollY > 100 && toggleButton) {
        toggleButton.classList.remove("hidden");
      } else if (toggleButton) {
        toggleButton.classList.add("hidden");
      }
    };

    if (toggleButton && toggleList && closeMenuIcon) {
      toggleButton.addEventListener("click", handleToggleButtonClick);
      closeMenuIcon.addEventListener("click", handleCloseMenuIconClick);
      document.addEventListener("click", handleDocumentClick);
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (toggleButton) {
        toggleButton.removeEventListener("click", handleToggleButtonClick);
      }

      if (closeMenuIcon) {
        closeMenuIcon.removeEventListener("click", handleCloseMenuIconClick);
      }

      document.removeEventListener("click", handleDocumentClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="container">
      <button id="toggleButton" className="toggle-button">
        <i
          className="fas fa-shopping-bag text-lg"
          style={{ fontSize: "25px" }}
        ></i>
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
  );
};

export default CartList;
