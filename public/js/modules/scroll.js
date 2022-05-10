document.querySelector(".coinButton").addEventListener("click", scrollInto);

export function scrollInto() {
  document.querySelector(".cryptocoins").scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
  document.querySelector("#zoekVeld").value = "";
}
