"use strict";
import { $, $$ } from "./helpers.js";
import { renderIslandVillagers } from "./island.js";
import { showVillagers } from "./villager.js";
import { showBugs } from "./encyclopedia.js";

const navbarMenu = $(".navbar__menu");
const encyclopediaNav = $(".encyclopedia__nav");
const collectionNav = $(".collection__nav");

const sections = $$("section");

const navbarItemLists = $$(".item__list_lists");
const encyclopediaList = $$(".encyclopedias__list");
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
  const active = $(".selected");
  const target = event.target;

  active.classList.remove("selected");
  target.classList.add("selected");

  //rerender
  switch (link) {
    case "island":
      renderIslandVillagers();

      break;
    case "villagers":
      showVillagers();

      break;
    case "encyclopedia":
      showBugs();
      break;
  }
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

//encyclopedia list
navbarItemLists.forEach((list) => {
  list.addEventListener("click", function (e) {
    console.log("test");
  });
});
