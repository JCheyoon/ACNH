"use strict";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const navbarMenu = $(".navbar__menu");
const encyclopediaNav = $(".encyclopedia__nav");
const collectionNav = $(".collection__nav");

const sections = $$("section");

const villagerGrid = $(".villagers__grid")
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

//render villager
const renderVillager= function (data) {
  const html = `
          <div class="villager">
            <img src="${data.icon_uri}"/>
            <span>${data.name['name-EUen']}</span><span class="material-icons"> ${data.gender.toLowerCase()} </span>
            <!--my villager btn-->
            <div class="villager__honeBtn">
              <span class="material-icons">home</span>
            </div>
          </div>
          <div class="villager__description">
            <img
              src="${data.image_uri}"
              alt="villager"
            />
            <div class="villager__catch_phrase">
              <div class="catch_phrase_bubble"></div>
              <div>${data['catch-phrase']}</div>
            </div>

            <div class="villager__description__specific">
              <!--description1-->
              <div>
                <div>Personality</div>
                <div
                  class="villager__description__item"
                  data-link="#personality"
                >
                 ${data.personality}
                </div>
              </div>
              <!--description2-->
              <div>
                <div>Birthday</div>
                <div class="villager__description__item" data-link="#birthday">
                  ${data["birthday-string"]}
                </div>
              </div>
              <!-- description3-->
              <div>
                <div>Species</div>
                <div class="villager__description__item" data-link="#species">
                  ${data.species}
                </div>
              </div>
            </div>
          </div>`;
  const child = document.createElement('div')
  child.classList.add('villager__container')
  child.innerHTML = html
  villagerGrid.appendChild(child);
};

//api
const showAcnh = async function(){
  try {
    const res = await fetch('https://acnhapi.com/v1a/villagers/')
    const data = await res.json()

    if(!res.ok) throw new Error(`${data.message} ({${res.status})`)

    console.log(res,data)

    data.forEach((data) => renderVillager(data))
  }catch (err){alert(err)}
}
showAcnh()