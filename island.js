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
  if (isVillagerStored(villager.id)) {
    alert("This villager already in my island!");
    return;
  }

  let villagers = [];
  const stored = localStorage.getItem(ISLAND_KEY);
  if (stored) {
    villagers = JSON.parse(stored);
  }
  if (villagers.length >= 10) {
    alert("villagers over 10");
    return;
  }

  villagers.push(villager);

  localStorage.setItem(ISLAND_KEY, JSON.stringify(villagers));
}

function removeVillager(id) {
  const storedVillagers = getStoredVillagers();
  const index = storedVillagers.findIndex((villager) => villager.id === id);
  if (index < 0) {
    return;
  }
  const villagers = [...storedVillagers];
  villagers.splice(index, 1);

  localStorage.setItem(ISLAND_KEY, JSON.stringify(villagers));
}

//render villagers
const islandVillagerContainer = $(".island__villagers");

export function renderIslandVillagers() {
  const data = getStoredVillagers();
  islandVillagerContainer.innerHTML = "";
  data.forEach((villager) => renderIslandVillager(villager));
  addVillagerRemoveListener();
}

renderIslandVillagers();

//render myIsland Villager
function renderIslandVillager(data) {
  const html = `
   <div class="island__villager">
            <div>
              <img src="${data.iconUrl}" />
              <button class="island__villager_removeBtn" data-id="${data.id}">
              <span class="material-icons-outlined">
              remove_circle
              </span></button>
              
            </div>
            <h3>${data.name}</h3>
          </div>`;
  const child = document.createElement("div");
  child.classList.add("island__villager__container");
  child.innerHTML = html;
  islandVillagerContainer.appendChild(child);
}

//island__villager_remove

function addVillagerRemoveListener() {
  const islandVillagerRemoveBtn = $$(".island__villager_removeBtn");

  islandVillagerRemoveBtn.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const id = e.target.dataset.id ?? e.target.parentElement.dataset.id;
      const numberId = Number(id);
      removeVillager(numberId);
      renderIslandVillagers();
    });
  });
}
