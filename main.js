"use strict";
import "./villager.js";
import {$, $$} from "./helpers.js";

const navbarMenu = $(".navbar__menu");
const encyclopediaNav = $(".encyclopedia__nav");
const collectionNav = $(".collection__nav");

const sections = $$("section");

///////////////////////////

//navbar
navbarMenu.addEventListener("click", (event) => {
  const link =
    event.target.dataset.link || event.target.parentNode.dataset.link;
  if (link == null) {
    return;
  }
  sections.forEach((section) => {
    if (link === section.id) {
      section.classList.remove("invisible");
    } else {
      section.classList.add("invisible");
    }
  });
  //change active
  const active = $(".selected")
  const target = event.target;

  active.classList.remove("selected");
  target.classList.add("selected");
});

const navbarItemOpen = function (nav) {
  nav.addEventListener("click", () => {
    const navList = nav.nextElementSibling;
    const closed = navList.classList.contains("invisible");
    if (closed) {
      navList.classList.remove("invisible");
      nav.firstElementChild.innerText = "expand_less";
    } else if (!closed) {
      navList.classList.add("invisible");
      nav.firstElementChild.innerText = "expand_more";
    }
  });
};

navbarItemOpen(encyclopediaNav);
navbarItemOpen(collectionNav);
