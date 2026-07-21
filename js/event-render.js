
function createCard(event) {
  return `
    <div class="col-md-6 col-lg-4">
      <div class="card event-card h-100">

        <img src="${event.image}" class="card-img-top" alt="${event.name}">

        <div class="card-body d-flex flex-column p-4">

          <div class="mb-3">
            <span class="badge bg-primary bg-opacity-25 text-primary-emphasis rounded-pill">${event.category}</span>
            <span class="badge bg-primary bg-opacity-25 text-primary-emphasis rounded-pill">${event.level}</span>
          </div>

          <h5 class="card-title fw-bold mb-2">${event.name}</h5>
          <p class="card-text text-muted small mb-3">${event.description}</p>

          <div class="d-flex justify-content-between align-items-center mt-auto p-3 event-card-footer">
            <small class="text-danger fw-medium event-date">${event.deadline}</small>
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


function renderEvents(eventList, containerId) {

    const container = document.getElementById(containerId);

    if (!container) return;

    let cardsHTML = "";

    eventList.forEach(function(event){

        cardsHTML += createCard(event);

    });

    container.innerHTML = cardsHTML;

}