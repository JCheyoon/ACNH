import { $, $$ } from "./helpers.js";

const encyclopediaGrid = $(".encyclopedia__grid");
const encyclopediaSection = $("section#encyclopedia");

// variable to hold data of ALL fossils
let allFossilData;

//render fossils
function renderFossils(data) {
  encyclopediaGrid.innerHTML = "";
  data.forEach((fossil) => renderFossil(fossil));
  encyclopediaSection.classList.remove("invisible");
}

//render fossil
const renderFossil = function (data) {
  const html = `
          <div class="encyclopedias__img">
            <img src="${data.image_uri}" alt="encyclopedias" />
          </div>
          <h3>${data.name["name-EUen"]}</h3>
          <div class="encyclopedia__info__categories">
            <div class="encyclopedia__info" data-link="#price">
              <div>Price</div>
              <div>${data.price}</div>
            </div>
          </div>
            `;

  const child = document.createElement("div");
  child.classList.add("encyclopedias__categories");
  child.innerHTML = html;
  encyclopediaGrid.appendChild(child);
};

//api
export const showFossils = async function () {
  try {
    const res = await fetch("https://acnhapi.com/v1a/fossils/");
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} ({${res.status})`);

    allFossilData = data;
    renderFossils(data);
  } catch (err) {
    alert(err);
  }
};
