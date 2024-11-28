import { checkAuthentication, getAuthHeaders, getUserId } from "./auth.js";
import { displayErrorMessage } from "./utils.js";

function placeDetails(placeId) {
  fetch(`http://127.0.0.1:5000/api/v1/places/${placeId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error retrieving details");
      }
      return response.json();
    })
    .then((place) => {
      const title = document.getElementById("place-title");
      const detail = document.getElementById("place-details");
      const reviews = document.getElementById("reviews");
      title.textContent = place.title;
      detail.innerHTML = `
                <p><b>Host:</b> ${place.owner.first_name} ${
        place.owner.last_name
      } </p>
                <p><b>Price per night:</b> $${place.price}</p>
                <p><b>Description :</b> ${formatDescription(
                  place.description
                )}</p>
                <p><b>Amenities :</b> ${formatAmenities(place.amenities)}</p>
            `;

      reviews.innerHTML = formatReviews(place.reviews);

      const addReview = document.getElementById("add-review");
      if (checkAuthentication()) {
        fetch("add_review.html")
          .then((response) => {
            if (!response.ok) {
              throw new Error("Unable to load comment form");
            }
            return response.text();
          })
          .then((html) => {
            addReview.innerHTML = html;
            const reviewForm = document.getElementById("review-form");
            reviewForm.addEventListener("submit", (e) =>
              submitReview(e, placeId)
            );
          })
          .catch((error) => {
            console.error("Erreur :", error);
            displayErrorMessage("Unable to load comment form");
          });
      } else {
        addReview.style.display = "none";
      }
    })
    .catch((error) => {
      console.error("Error :", error);
      displayErrorMessage("Unable to load location details");
    });
}

function formatAmenities(amenities) {
  if (!amenities || amenities.length === 0) {
    return "No amenities available";
  }
  return amenities.join(", ");
}

function formatDescription(description) {
  if (description.length > 50) {
    return description.slice(0, 47) + "...";
  }
  return description;
}

function formatReviews(reviews) {
  if (!reviews || reviews.length === 0) {
    return "<p>No reviews yet for this place.</p>";
  }

  return reviews
    .map(
      (review) => `
        <div class="review-card">
          <p><b>Name:</b> ${review.name}</p>
          <p><b>Review:</b> ${review.text}</p>
          <p><b>Rating:</b> ${review.rating} / 5</p>
        </div>
      `
    )
    .join("");
}

async function submitReview(e, placeId) {
  e.preventDefault();

  const reviewTextArea = document.getElementById("review").value;
  const reviewText = reviewTextArea.trim();
  const reviewRating = document.getElementById("rating").value;
  const userId = await getUserId();

  if (!reviewText) {
    alert("Please enter a comment");
    return;
  }
  console.log("reviewText");
  console.log(reviewText);
  console.log("reviewRating");
  console.log(reviewRating);
  console.log("userId");
  console.log(userId);
  console.log("placeId");
  console.log(placeId);

  fetch(`http://127.0.0.1:5000/api/v1/reviews`, {
    method: "POST",
    headers: {
      ...getAuthHeaders(),
    },
    body: JSON.stringify({
      text: reviewText,
      rating: String(reviewRating),
      place_id: String(placeId),
      user_id: String(userId),
    }),
  })
    .then((response) => {
      console.log("Response status:", response.status);
      if (!response.ok) {
        return response.json().then((data) => {
          console.error("Error details:", data);
          throw new Error("Failed to send review");
        });
      }
      return response.json();
    })

    .catch((error) => {
      console.error("Error :", error);
      displayErrorMessage("Unable to send comment");
    });
}

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const placeId = urlParams.get("id");

  if (placeId) {
    placeDetails(placeId);
  } else {
    console.log("No place ID supplied");
    displayErrorMessage("No location selected");
  }
});
