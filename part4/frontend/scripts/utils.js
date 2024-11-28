export function displayErrorMessage(message) {
  document.getElementById(
    "place-details"
  ).innerHTML = `<p class="error">${message}</p>`;
}