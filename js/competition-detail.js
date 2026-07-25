// ============================================
// Competition Detail Page Script
// Reads ?id=... from the URL, finds that
// competition inside the "competitions" array
// (competitions-data.js) and fills in the page.
// ============================================

// 1. Get the competition id from the URL, e.g. competition-detail.html?id=1
const params = new URLSearchParams(window.location.search);
const competitionId = Number(params.get("id"));

// 2. Find the matching competition (fall back to the first one if none found)
const currentCompetition = competitions.find(function (item) {
  return item.id === competitionId;
}) || competitions[0];

// 3. Small helper to format "2026-08-15" -> "Aug 15, 2026"
function formatDate(dateString) {
  const date = new Date(dateString + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

// 4. Small helper to work out how many days are left until the deadline
function daysLeftText(dateString) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const deadline = new Date(dateString + "T00:00:00");
  const msPerDay = 1000 * 60 * 60 * 24;
  const diff = Math.ceil((deadline - today) / msPerDay);

  if (diff > 0) {
    return "Closes in " + diff + " day" + (diff === 1 ? "" : "s") + " left, don't wait too long.";
  } else if (diff === 0) {
    return "Closes today.";
  } else {
    return "Registration has closed.";
  }
}

// 5. Fill in the page with this competition's info
function renderCompetitionDetail(competition) {

  // NOTE: "organizer", "location", "teamSize" and "price" are optional
  // extra fields. If they don't exist yet in competitions-data.js, a
  // placeholder is shown instead.
  const organizer = competition.organizer || "Organizer not listed";
  const location = competition.location || "To be announced";
  const teamSize = competition.teamSize || "Not specified";
  const price = competition.price || "Free";
  const about = competition.about || competition.description;

  document.title = "CamConnect - " + competition.name;

  document.getElementById("breadcrumbName").textContent = competition.name;

  document.getElementById("competitionImage").src = competition.image;
  document.getElementById("competitionImage").alt = competition.name;

  const statusBadge = document.getElementById("competitionStatusBadge");
  statusBadge.textContent = competition.status;
  statusBadge.classList.add(competition.status === "Open" ? "status-open" : "status-closed");

  document.getElementById("competitionCategory").textContent = competition.category;
  document.getElementById("competitionLevel").textContent = competition.level;
  document.getElementById("competitionName").textContent = competition.name;
  document.getElementById("competitionOrganizer").textContent = organizer;
  document.getElementById("competitionAbout").textContent = about;

  const deadlineFormatted = formatDate(competition.deadline);
  document.getElementById("competitionDeadline").textContent = deadlineFormatted;
  document.getElementById("competitionDaysLeft").textContent = daysLeftText(competition.deadline);

  const registerBtn = document.getElementById("competitionRegisterBtn");
  registerBtn.href = competition.registerLink || "#";

  document.getElementById("detailDeadline").textContent = deadlineFormatted;
  document.getElementById("detailOrganizer").textContent = organizer;
  document.getElementById("detailLocation").textContent = location;
  document.getElementById("detailTeamSize").textContent = teamSize;
  document.getElementById("detailLevel").textContent = competition.level;
  document.getElementById("detailPrice").textContent = price;
}

// 6. Render up to 3 "Other Events" cards (any competition that isn't this one)
function renderOtherCompetitions(competition) {
  const others = competitions
    .filter(function (item) {
      return item.id !== competition.id;
    })
    .slice(0, 3);

  renderCompetitions(others, "otherCompetitions");
}

// 7. Run it
if (currentCompetition) {
  renderCompetitionDetail(currentCompetition);
  renderOtherCompetitions(currentCompetition);
}
