import { checkAuthStatus } from './auth.js';

function include(file, elementId) {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Error: Element with ID "${elementId}" not found.`);
    return;
  }
  fetch(file)
    .then((response) => response.text())
    .then((html) => {
      element.innerHTML = html;
    })
    .catch((err) => console.error("Error: ", err));
}

const params = new URLSearchParams(window.location.search);

const loadHeader = params.get("header") !== "false";
const loadFooter = params.get("footer") !== "false";


window.addEventListener("DOMContentLoaded", () => {
  if (loadHeader) include("layout/header.html", "header");
  if (loadFooter) include("layout/footer.html", "footer");
  checkAuthStatus();
});
