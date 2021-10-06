"use strict";
//modal

const modalButton = document.querySelector("#modalButton");
const modalBackground = document.querySelector("#modalBackground");
const modal = document.querySelector(".modal");

modalButton.addEventListener("click", () => {
  modal.classList.add("is-active");
});

modalBackground.addEventListener("click", () => {
  modal.classList.remove("is-active");
});

