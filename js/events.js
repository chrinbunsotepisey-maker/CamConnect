const events = [
  {
    name: "Competition's Name",
    description: "Competition's Description",
    field: "Field",
    scope: "Open to All",
    date: "Competition's Date",
    status: "Open",
    image: "https://placehold.co/400x220"
  },

  {
    name: "Competition's Name",
    description: "Competition's Description",
    field: "Field",
    scope: "Open to All",
    date: "Competition's Date",
    status: "Open",
    image: "https://placehold.co/400x220"
  },

  {
    name: "Competition's Name",
    description: "Competition's Description",
    field: "Field",
    scope: "Open to All",
    date: "Competition's Date",
    status: "Open",
    image: "https://placehold.co/400x220"
  }
];


function createCard(event) {
  return `
    <div class="col-md-6 col-lg-4">
      <div class="card event-card h-100">

        <img src="${event.image}" class="card-img-top" alt="Trophy">

        <div class="card-body d-flex flex-column p-4">

          <div class="mb-3">
            <span class="badge bg-primary bg-opacity-25 text-primary-emphasis rounded-pill">${event.field}</span>
            <span class="badge bg-primary bg-opacity-25 text-primary-emphasis rounded-pill">${event.scope}</span>
          </div>

          <h5 class="card-title fw-bold mb-2">${event.name}</h5>
          <p class="card-text text-muted small mb-3">${event.description}</p>

          <div class="d-flex justify-content-between align-items-center mt-auto p-3 event-card-footer">
            <small class="text-danger fw-medium event-date">${event.date}</small>
            <div class="d-flex align-content-center gap-2">
              <span class="badge bg-success bg-opacity-25 text-success rounded-pill pill-sm">${event.status}</span>
              <a href="#" class="btn btn-outline-primary btn-sm rounded-pill pill-sm">Register</a>
            </div>
          </div>

        </div>
      </div>
    </div>
  `;
}

const container = document.getElementById("featuredEvents");

let cardsHTML = "";

events.forEach(function (event) {
  cardsHTML = cardsHTML + createCard(event);
});

container.innerHTML = cardsHTML;