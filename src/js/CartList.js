// src/js/CartList.js

export function initializeMenu() {
  document.addEventListener("DOMContentLoaded", function () {
    var toggleButton = document.getElementById("toggleButton");
    var toggleList = document.getElementById("toggleList");
    var closeMenuIcon = document.getElementById("closeMenuIcon");
    var tocList = document.getElementById("tocList");

    console.log(toggleButton);
    toggleButton.addEventListener("click", function () {
      toggleList.classList.toggle("show");
    });

    closeMenuIcon.addEventListener("click", function () {
      toggleList.classList.remove("show");
    });

    document.addEventListener("click", function (event) {
      var isClickInsideMenu = toggleList.contains(event.target);
      var isClickToggleButton = toggleButton.contains(event.target);

      if (!isClickInsideMenu && !isClickToggleButton) {
        toggleList.classList.remove("show");
      }
    });

    window.addEventListener("scroll", function () {
      if (window.scrollY > 100) {
        toggleButton.classList.remove("hidden");
      } else {
        toggleButton.classList.add("hidden");
      }
    });
  });
}
export default initializeMenu;
