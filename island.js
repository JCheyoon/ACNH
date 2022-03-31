import { $, $$ } from "./helpers.js";
const ISLAND_KEY = "acnh-island";

export function isVillagerStored(id) {
  const stored = localStorage.getItem(ISLAND_KEY);
  if (!stored) return false;
  const villagers = JSON.parse(stored);
  return villagers.findIndex((villager) => villager.id === id) >= 0;
}

export function getStoredVillagers() {
  const stored = localStorage.getItem(ISLAND_KEY);
  if (!stored) return [];

  return JSON.parse(stored);
}

export function storeVillager(villager) {
  let villagers = [];
  const stored = localStorage.getItem(ISLAND_KEY);
  if (stored) {
    villagers = JSON.parse(stored);
  }

  villagers.push(villager);

  localStorage.setItem(ISLAND_KEY, JSON.stringify(villagers));
}

//render villagers
const islandVillagerContainer = $(".island__villagers");

function renderIslandVillagers() {
  const data = getStoredVillagers();
  islandVillagerContainer.innerHTML = "";
  data.forEach((villager) => renderIslandVillager(villager));
}

renderIslandVillagers();

//render myIsland Villager
function renderIslandVillager(data) {
  const html = `
   <div class="island__villager">
            <div>
              <img src="${data.iconUrl}" />
            </div>
            <h3>${data.name}</h3>
          </div>`;
  const child = document.createElement("div");
  child.classList.add("island__villager__container");
  child.innerHTML = html;
  islandVillagerContainer.appendChild(child);
}
