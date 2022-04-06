import { $, $$ } from "./helpers.js";

const encyclopediaGrid = $(".encyclopedia__grid");
const encyclopediaSection = $("section#encyclopedia");

// variable to hold data of ALL Arts
let allArtData;

//render Arts
function renderArts(data) {
  encyclopediaGrid.innerHTML = "";
  data.forEach((art) => renderArt(art));
  encyclopediaSection.classList.remove("invisible");
}

//render art
const renderArt = function (data) {
  const html = `
          <div class="encyclopedias__img">
            <img src="${data.image_uri}" alt="encyclopedias" />
          </div>
          <h3>${data.name["name-EUen"]}</h3>
          <div class="encyclopedia__info__categories">
          
            <div class="encyclopedia__info" data-link="#price">
              <div>Buy Price</div>
              <div>${data["buy-price"]}</div>
            </div>
         
              <div class="encyclopedia__info" data-link="#price">
              <div>Sell Price</div>
              <div>${data["sell-price"]}</div>
            </div>
            
          </div>
            `;

  const child = document.createElement("div");
  child.classList.add("encyclopedias__categories");
  child.innerHTML = html;
  encyclopediaGrid.appendChild(child);
};

//api
export const showArts = async function () {
  try {
    const res = await fetch("https://acnhapi.com/v1a/art/");
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} ({${res.status})`);

    allArtData = data;
    renderArts(data);
  } catch (err) {
    alert(err);
  }
};
