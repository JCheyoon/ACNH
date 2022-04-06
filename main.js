"use strict";
import { $, $$, handleArrowUpBtn } from "./helpers.js";
import { renderIslandVillagers } from "./island.js";
import { showVillagers } from "./villager.js";
import { showBugs } from "./bugs.js";
import { showFish } from "./fish.js";
import { showSeaCreatures } from "./seaCreatures.js";
import { showFossils } from "./fossils.js";
import { showArts } from "./arts.js";
import { showHousewares } from "./houseware.js";
import { showWallmount } from "./wallmount.js";
import { showMisc } from "./miscellaneousc.js";

const navbarMenu = $(".navbar__menu");
const encyclopediaNav = $(".encyclopedia__nav");
const collectionNav = $(".collection__nav");

const sections = $$("section");

const navbarItemLists = $$(".item__list_lists");
const expandItemlists = $$(".expandItem__list");

///////////////////////////

//navbar
navbarMenu.addEventListener("click", (event) => {
  const link =
    event.target.dataset.link || event.target.parentNode.dataset.link;

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
    case "collection":
      showHousewares();
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

//encyclopedia,collection list
navbarItemLists.forEach((list) => {
  list.addEventListener("click", function (e) {
    const link = e.target.dataset.link || e.target.parentNode.dataset.link;

    expandItemlists.forEach((li) => {
      if (link === li.id) {
        li.classList.add("border");
      } else {
        li.classList.remove("border");
      }
    });

    //rerender
    switch (link) {
      case "bugs":
        showBugs();
        break;

      case "fish":
        showFish();
        break;

      case "seaCreatures":
        showSeaCreatures();
        break;
      case "fossils":
        showFossils();
        break;
      case "arts":
        showArts();
        break;
      case "houseware":
        showHousewares();
        break;
      case "wallmount":
        showWallmount();
        break;
      case "misc":
        showMisc();
        break;
    }
  });
});

handleArrowUpBtn();
