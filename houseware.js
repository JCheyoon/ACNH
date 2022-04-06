import { $, $$ } from "./helpers.js";

const collectionGrid = $(".collection__grid");
const collectionSection = $("section#collection");

// variable to hold data of ALL houseware
let allHousewareData;

//render housewares
function renderHousewares(data) {
  collectionGrid.innerHTML = "";
  data.forEach((h) => renderHouseware(h[0]));
  collectionSection.classList.remove("invisible");
}

//render housewares
const renderHouseware = function (data) {
  const html = `  <img
            class="collection__img"
            src="${data.image_uri}"
            alt="collection"
          />
          <h3>${data.name["name-EUen"]}</h3>
          <div class="collection__info__categories">
            <div class="collection__info" data-link="#size">
              <div>size</div>
              <div>
                <img src="img/${data.size}.png" alt="size" />
                <span>${data.size}</span>
              </div>
            </div>
            <div class="collection__info" data-link="#price">
              <div>Buy Price</div>
              <div>${
                data["buy-price"] ? data["buy-price"] : "Recipe making"
              }</div>
            </div>
          </div>`;
  const child = document.createElement("div");
  child.classList.add("collection__categories");
  child.innerHTML = html;
  collectionGrid.appendChild(child);
};

//api
export const showHousewares = async function () {
  try {
    const res = await fetch("https://acnhapi.com/v1a/houseware/");
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} ({${res.status})`);

    allHousewareData = data;
    renderHousewares(data);
  } catch (err) {
    alert(err);
  }
};
