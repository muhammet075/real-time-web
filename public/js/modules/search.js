import { scrollInto } from "./scroll.js";

document.querySelector("#zoekenKnop").addEventListener("click", toonZoekbalk);
document
  .querySelector("#zoekenSluiten")
  .addEventListener("click", sluitZoekbalk);
document.querySelector("#extraZoeken").addEventListener("click", sluitZoekbalk);

document
  .querySelector("#resultatenResetten")
  .addEventListener("click", resetZoekgegevens);

export function toonZoekbalk() {
  document.querySelector(".zoekbalk").style.display = "block";
  document
    .querySelector(".zoekbalk")
    .classList.remove("zoekbalkAnimatieSluiten");
  document.querySelector(".zoekbalk").classList.add("zoekbalkAnimatie");
}
export function sluitZoekbalk() {
  document.querySelector(".zoekbalk").classList.add("zoekbalkAnimatieSluiten");
  document.querySelector(".zoekbalk").classList.remove("zoekbalkAnimatie");
  scrollInto();

  setTimeout(() => {
    document.querySelector(".zoekbalk").style.display = "none";
  }, 130);
}

//zoeken
document.querySelector("#zoekVeld").addEventListener("keyup", function () {
  filterOnClass("cryptoGegevens", this.value);
});

//Filter zoek functie
export function filterOnClass(baseClass, s) {
  document.querySelector("#resultatenResetten").style.display = "block";
  let re = new RegExp(s.trim(), "i");
  document.querySelectorAll("." + "cryptoContainer").forEach((node) => {
    let cNames = Array.from(node.classList);
    if (s.trim() == "") {
      node.style.display = "none";
    } else if (cNames.some((cName) => re.test(cName))) {
      node.style.display = "block";
    } else {
      node.style.display = "none";
    }
  });
}

//Filter zoek gegevens resetten
export function resetZoekgegevens() {
  document.querySelector("#resultatenResetten").style.display = "none";
  document.querySelector("#zoekVeld").value = "";
  location.reload();
}
