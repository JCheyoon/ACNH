"use strict";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const island = $("#island");
const villagers = $("#villagers");
const encyclopedia = $("#encyclopedia");
const collection = $("#collection");

///////////////////////////
// temporary hide
window.addEventListener("load", function () {
  island.classList.add("hide");
  villagers.classList.add("hide");
  encyclopedia.classList.add("hide");
});
////////////////////////////
