function displayPlaceCards(maxPrice = "all") {
  const cards = document.getElementById("places-list");
  cards.innerHTML = "";

  fetch("http://127.0.0.1:5000/api/v1/places/")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Data recovery error");
      }
      return response.json();
    })
    .then((data) => {
      const filteredData =
        maxPrice === "all"
          ? data
          : data.filter((place) => place.price <= parseInt(maxPrice));

      if (filteredData.length === 0) {
        cards.innerHTML = "<p>No places match the selected criteria.</p>";
      } else {
        filteredData.forEach((place) => {
          const card = document.createElement("div");
          card.classList.add("place-card");
          card.innerHTML = `
            <h3>${place.title}</h3>
            <p>Price per night: $${place.price}</p>
            <button class="details-button" data-place-id="${place.id}">View Details</button>
          `;
          cards.appendChild(card);
        });

        cards.addEventListener("click", (e) => {
          const detailsButton = e.target.closest(".details-button");
          if (detailsButton) {
            const placeId = detailsButton.dataset.placeId;
            viewDetails(placeId);
          }
        });
      }
    })
    .catch((error) => {
      console.error("Erreur :", error);
      cards.innerHTML = "<p>Failed to load places. Please try again later.</p>";
    });
}

function viewDetails(placeId) {
  window.location.href = `place.html?id=${placeId}`;
}

document.getElementById("price-filter").addEventListener("change", (event) => {
  const maxPrice = event.target.value;
  displayPlaceCards(maxPrice);
});

document.addEventListener("DOMContentLoaded", () => {
  displayPlaceCards();
});
