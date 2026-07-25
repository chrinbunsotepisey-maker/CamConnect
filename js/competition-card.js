// builds the HTML string for one competition card
function createCompetitionCard(competition) {
  return `
    <div class="col-12 col-md-6 col-lg-4">
      <div class="card event-card h-100">

        <!-- competition cover image -->
        <img src="${competition.image}" class="card-img-top" alt="${competition.name}">

        <div class="card-body d-flex flex-column p-4">

          <!-- category, level, and status badges -->
          <div class="mb-3">
            <span class="badge bg-primary bg-opacity-25 text-primary-emphasis rounded-pill">${competition.category}</span>
            <span class="badge bg-primary bg-opacity-25 text-primary-emphasis rounded-pill">${competition.level}</span>
            <span class="badge bg-success bg-opacity-25 text-success rounded-pill">${competition.status}</span>
          </div>

          <!-- competition name and short description -->
          <h5 class="card-title fw-bold mb-2">${competition.name}</h5>
          <p class="card-text text-muted small mb-3">${competition.description}</p>

          <!-- footer: deadline date + register button -->
          <div class="d-flex justify-content-between align-items-center mt-auto p-3 event-card-footer">
            <small class="text-danger fw-medium event-date">${competition.deadline}</small>
            <a href="competition-detail.html?id=${competition.id}" class="btn btn-outline-primary btn-sm rounded-pill pill-sm">Register</a>
          </div>

        </div>
      </div>
    </div>
  `;
}

// renders a list of competitions into a container element by id
function renderCompetitions(competitionList, containerId) {

    // find the target container in the page
    const container = document.getElementById(containerId);

    // stop if the container doesn't exist
    if (!container) return;

    // build up all card HTML as one big string
    let cardsHTML = "";

    competitionList.forEach(function(competition){

        cardsHTML += createCompetitionCard(competition);

    });

    // inject all cards into the container at once
    container.innerHTML = cardsHTML;

}