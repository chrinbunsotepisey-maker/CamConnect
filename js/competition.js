// grab all the DOM elements we need for search/filter/sort/pagination
const searchInput = document.getElementById("searchInput");

const levelFilters = document.querySelectorAll(".level-filter");

const categoryFilters = document.querySelectorAll(".category-filter");

const sortSelect = document.getElementById("sortSelect");

const clearFiltersBtn = document.getElementById("clearFilters");

const resultCount = document.getElementById("resultCount");

// How many cards show per page, and which page we're currently on
const CARDS_PER_PAGE = 9;
let currentPage = 1;


// Read the checked boxes in a filter group (e.g. all checked levels)
function getCheckedValues(filterGroup) {
  return Array.from(filterGroup) // NodeList -> array so we can use filter/map
    .filter(function (box) {
      return box.checked;
    })
    .map(function (box) {
      return box.value; // just need the values, not the checkbox elements
    });
}

// Apply search + filters + sort, and return the resulting list
function getFilteredCompetitions() {
  let list = competitions.slice(); // copy the array so we don't mutate the original data

  // Search by name or description
  const query = searchInput.value.trim().toLowerCase();
  if (query) {
    list = list.filter(function (item) {
      return (
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
    });
  }

  // Level filter (skip filtering if none checked, or "All" is checked)
  const checkedLevels = getCheckedValues(levelFilters);
  if (checkedLevels.length && !checkedLevels.includes("All")) {
    list = list.filter(function (item) {
      return checkedLevels.includes(item.level);
    });
  }

  // Category filter (same logic as level)
  const checkedCategories = getCheckedValues(categoryFilters);
  if (checkedCategories.length && !checkedCategories.includes("All")) {
    list = list.filter(function (item) {
      return checkedCategories.includes(item.category);
    });
  }

  // Sort — check which option is selected and sort accordingly
  if (sortSelect.value === "Deadline - Earliest") {
    list.sort(function (a, b) { return new Date(a.deadline) - new Date(b.deadline); });
  } else if (sortSelect.value === "Deadline - Latest") {
    list.sort(function (a, b) { return new Date(b.deadline) - new Date(a.deadline); });
  } else if (sortSelect.value === "Name A-Z") {
    list.sort(function (a, b) { return a.name.localeCompare(b.name); });
  } else if (sortSelect.value === "Name Z-A") {
    list.sort(function (a, b) { return b.name.localeCompare(a.name); });
  }

  return list;
}

// Draw the page number buttons under the cards
function renderPagination(totalPages) {
  const container = document.getElementById("paginationControls");
  if (!container) return;

  // No pagination needed if everything fits on one page
  if (totalPages <= 1) {
    container.innerHTML = "";
    return;
  }

  let html = "";

  // prev arrow, disabled when already on page 1
  html += `<button class="page-nav-btn" id="prevPageBtn" ${currentPage === 1 ? "disabled" : ""}>&lsaquo;</button>`;

  // one numbered button per page, highlight the active page
  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="page-btn ${i === currentPage ? "active" : ""}" data-page="${i}">${i}</button>`;
  }

  // next arrow, disabled when already on the last page
  html += `<button class="page-nav-btn" id="nextPageBtn" ${currentPage === totalPages ? "disabled" : ""}>&rsaquo;</button>`;

  container.innerHTML = html;

  // Page number buttons — clicking jumps straight to that page
  document.querySelectorAll(".page-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      currentPage = Number(this.dataset.page);
      renderPage();
    });
  });

  // Prev / Next buttons
  const prevBtn = document.getElementById("prevPageBtn");
  const nextBtn = document.getElementById("nextPageBtn");

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      if (currentPage > 1) {
        currentPage--;
        renderPage();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      if (currentPage < totalPages) {
        currentPage++;
        renderPage();
      }
    });
  }
}

// Filter + sort + slice to the current page, then render cards + pagination
function renderPage() {
  const filtered = getFilteredCompetitions();
  const totalPages = Math.max(1, Math.ceil(filtered.length / CARDS_PER_PAGE));

  // safety check: if filtering shrank the list, don't stay stuck on a page that no longer exists
  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  // slice out just the items for the current page
  const start = (currentPage - 1) * CARDS_PER_PAGE;
  const pageItems = filtered.slice(start, start + CARDS_PER_PAGE);

  renderCompetitions(pageItems, "competitionContainer"); // draw the cards (from competition-card.js)
  renderPagination(totalPages); // draw the page number buttons

  // Update "Showing X of Y results"
  if (resultCount) {
    resultCount.textContent =
      `Showing ${filtered.length} of ${competitions.length} results`;
  }
}

// Any time search, filters, or sort changes, go back to page 1 and re-render
function handleFilterChange() {
  currentPage = 1;
  renderPage();
}

// wire up all the inputs to re-render whenever they change
searchInput.addEventListener("input", handleFilterChange);

levelFilters.forEach(function (box) {
  box.addEventListener("change", handleFilterChange);
});

categoryFilters.forEach(function (box) {
  box.addEventListener("change", handleFilterChange);
});

sortSelect.addEventListener("change", handleFilterChange);

// Clear all filters — resets search, checkboxes, and sort back to default
if (clearFiltersBtn) {
  clearFiltersBtn.addEventListener("click", function () {

    searchInput.value = "";

    levelFilters.forEach(function (box) {
      box.checked = false;
    });

    categoryFilters.forEach(function (box) {
      box.checked = false;
    });

    sortSelect.value = "Deadline - Earliest";

    currentPage = 1;

    renderPage();

  });
}

// Initial render — runs once when the page first loads
renderPage();