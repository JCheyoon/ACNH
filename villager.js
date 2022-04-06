import { $, $$ } from "./helpers.js";
import { isVillagerStored, storeVillager } from "./island.js";

const villagerGrid = $(".villagers__grid");

// variable to hold data of ALL villagers
let allVillagerData;

//render villagers
function renderVillagers(data) {
  villagerGrid.innerHTML = "";
  data.forEach((villager) => renderVillager(villager));
  myVillagerBtn();
}

const renderVillager = function (data) {
  const isStored = isVillagerStored(data.id);
  const html = `
          <div class="villager">
            <img src="${data.icon_uri}"/>
            <span>${
              data.name["name-EUen"]
            }</span><span class="material-icons"> ${data.gender.toLowerCase()} </span>
            <!--my villager btn-->
            <button class="villager__honeBtn ${
              isStored ? "homeBtn_stored" : ""
            }" data-id="${data.id}">
              <span class="material-icons">home</span>
            </button>
          </div>
          <div class="villager__description">
            <img
              src="${data.image_uri}"
              alt="villager"
            />
            <div class="villager__catch_phrase">
              <div class="catch_phrase_bubble"></div>
              <div>${data["catch-phrase"]}</div>
            </div>

            <div class="villager__description__specific">
              <!--description1-->
              <div>
                <div>Personality</div>
                <div
                  class="villager__description__item villager__personality" data-type="${
                    data.personality
                  }">
                 ${data.personality}
                </div>
              </div>
              <!--description2-->
              <div>
                <div>Birthday</div>
                <div class="villager__description__item">
                  ${data["birthday-string"]}
                </div>
              </div>
              <!-- description3-->
              <div>
                <div>Species</div>
                <div class="villager__description__item">
                  ${data.species}
                </div>
              </div>
            </div>
          </div>`;
  const child = document.createElement("div");
  child.classList.add("villager__container");
  child.innerHTML = html;
  villagerGrid.appendChild(child);
};

//villager filter
const villagerCategoriesBtn = $(".villagers__categories");

const villagerFilter = function () {
  villagerCategoriesBtn.addEventListener("click", (event) => {
    const chosenFilter = event.target.dataset.filter;

    if (chosenFilter == null) {
      return;
    } else if (chosenFilter === "*") {
      renderVillagers(allVillagerData);
    } else {
      const filteredVillagers = allVillagerData.filter(
        (villager) =>
          villager.personality.toLowerCase() === chosenFilter.toLowerCase()
      );
      renderVillagers(filteredVillagers);
    }
  });
};
villagerFilter();

//my villager

function myVillagerBtn() {
  const homeBtn = $$(".villager__honeBtn");
  homeBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id ?? e.target.parentElement.dataset.id;
      const numberId = Number(id);
      const villager = allVillagerData.find((v) => v.id === numberId);
      if (!villager) throw new Error("Villager not found!");

      storeVillager({
        id: villager.id,
        name: villager.name["name-EUen"],
        iconUrl: villager.icon_uri,
      });
      if (isVillagerStored(villager.id)) {
        const button =
          e.target.tagName === "button" ? e.target : e.target.parentElement;
        button.classList.add("homeBtn_stored");
      }
    });
  });
}

//api
export const showVillagers = async function () {
  try {
    const res = await fetch("https://acnhapi.com/v1a/villagers/");
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} ({${res.status})`);

    allVillagerData = data;
    renderVillagers(data);
  } catch (err) {
    alert(err);
  }
};
