export const $ = document.querySelector.bind(document);
export const $$ = document.querySelectorAll.bind(document);

//arrowup btn
export function handleArrowUpBtn() {
  //show arrow-up btn when scrolling down
  const arrowUp = $(".arrowUp-btn");

  document.addEventListener("scroll", () => {
    window.scrollY >= 400
      ? arrowUp.classList.remove("invisible")
      : arrowUp.classList.add("invisible");
  });

  arrowUp.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
