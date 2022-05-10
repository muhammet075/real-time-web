import { scrollInto } from "./modules/scroll.js";
import {
  toonZoekbalk,
  sluitZoekbalk,
  filterOnClass,
  resetZoekgegevens,
} from "./modules/search.js";

let closeform = document.querySelectorAll(".closeform");

for (let i = 0; i < closeform.length; i++) {
  closeform[i].addEventListener("click", sluitpopup);
  function sluitpopup() {
    let cryptopagina = document.querySelectorAll(".cryptopagina");
    for (let i = 0; i < cryptopagina.length; i++) {
      cryptopagina[i].classList.remove("cryptopagina");
    }
  }
}

let coinul = document.querySelectorAll(".coinul");

coinul.forEach((li) => {
  li.addEventListener("click", toonpagina);
  function toonpagina() {
    console.log(li);
    li.classList.toggle("coinulpage");
  }
});
