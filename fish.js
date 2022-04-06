import { $, $$ } from "./helpers.js";

const encyclopediaGrid = $(".encyclopedia__grid");
const encyclopediaSection = $("section#encyclopedia");

// variable to hold data of ALL fishes
let allFishData;

//render fish
function renderFishes(data) {
  encyclopediaGrid.innerHTML = "";
  data.forEach((fish) => renderFish(fish));
  encyclopediaSection.classList.remove("invisible");
}

//render fish
const renderFish = function (data) {
  const html = `
          <div class="encyclopedias__img">
            <img src="${data.icon_uri}" alt="encyclopedias" />
          </div>
          <h3>${data.name["name-EUen"]}</h3>
          <div class="encyclopedia__info__categories">
            <div class="encyclopedia__info" data-link="#location">
              <div>Location</div>
              <div>${data.availability.location}</div>
            </div>
            <div class="encyclopedia__info" data-link="#price">
              <div>Price</div>
              <div>${data.price}</div>
            </div>
            <div class="encyclopedia__info" data-link="#northern">
              <div>northern</div>
              <div>${
                data.availability["month-northern"]
                  ? data.availability["month-northern"]
                  : "Every Month"
              }</div>
            </div>
            <div class="encyclopedia__info" data-link="#southern">
              <div>southern</div>
              <div>${
                data.availability["month-southern"]
                  ? data.availability["month-southern"]
                  : "Every Month"
              }</div>
            </div>
            <div class="encyclopedia__info" data-link="#time">
              <div>time</div>
              <div>${
                data.availability.time ? data.availability.time : "Every Time"
              }
              </div>
            </div>
          </div>
            `;

  const child = document.createElement("div");
  child.classList.add("encyclopedias__categories");
  child.innerHTML = html;
  encyclopediaGrid.appendChild(child);
};

//api
export const showFish = async function () {
  try {
    const res = await fetch("https://acnhapi.com/v1a/fish/");
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} ({${res.status})`);

    allFishData = data;
    renderFishes(data);
  } catch (err) {
    alert(err);
  }
};
