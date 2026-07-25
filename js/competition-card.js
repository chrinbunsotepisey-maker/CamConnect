
function createCompetitionCard(competition) {
  return `
    <div class="col-12 col-md-6 col-lg-4">
      <div class="card event-card h-100">

        <img src="${competition.image}" class="card-img-top" alt="${competition.name}">

        <div class="card-body d-flex flex-column p-4">

          <div class="mb-3">
            <span class="badge bg-primary bg-opacity-25 text-primary-emphasis rounded-pill">${competition.category}</span>
            <span class="badge bg-primary bg-opacity-25 text-primary-emphasis rounded-pill">${competition.level}</span>
            <span class="badge bg-success bg-opacity-25 text-success rounded-pill">${competition.status}</span>
          </div>

          <h5 class="card-title fw-bold mb-2">${competition.name}</h5>
          <p class="card-text text-muted small mb-3">${competition.description}</p>

          <div class="d-flex justify-content-between align-items-center mt-auto p-3 event-card-footer">
            <small class="text-danger fw-medium event-date">${competition.deadline}</small>
            <a href="competition-detail.html?id=${competition.id}" class="btn btn-outline-primary btn-sm rounded-pill pill-sm">Register</a>
          </div>

        </div>
      </div>
    </div>
  `;
}


function renderCompetitions(competitionList, containerId) {

    const container = document.getElementById(containerId);

    if (!container) return;

    let cardsHTML = "";

    competitionList.forEach(function(competition){

        cardsHTML += createCompetitionCard(competition);

    });

    container.innerHTML = cardsHTML;

}
