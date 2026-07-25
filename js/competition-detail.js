// ============================================
// Competition Detail Page Script
// Reads ?id=... from the URL, finds that
// competition inside the "competitions" array
// (competitions-data.js) and fills in the page.
// ============================================

// 1. Get the competition id from the URL, e.g. competition-detail.html?id=1
const params = new URLSearchParams(window.location.search);
const competitionId = Number(params.get("id")); // convert string param to a number for comparison

// 2. Find the matching competition (fall back to the first one if none found)
const currentCompetition = competitions.find(function (item) {
  return item.id === competitionId;
}) || competitions[0]; // safety fallback so the page isn't blank if id is missing/invalid

// 3. Small helper to format "2026-08-15" -> "Aug 15, 2026"
function formatDate(dateString) {
  // append T00:00:00 so the date parses in local time, not UTC (avoids off-by-one-day bugs)
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
  today.setHours(0, 0, 0, 0); // zero out time so we compare whole days only

  const deadline = new Date(dateString + "T00:00:00");
  const msPerDay = 1000 * 60 * 60 * 24; // milliseconds in one day, used to convert the time difference into days
  const diff = Math.ceil((deadline - today) / msPerDay); // whole days remaining until deadline

  if (diff > 0) {
    // still open: show days remaining, handle singular/plural "day"/"days"
    return "Closes in " + diff + " day" + (diff === 1 ? "" : "s") + " left, don't wait too long.";
  } else if (diff === 0) {
    // deadline is today
    return "Closes today.";
  } else {
    // deadline has already passed
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
  const price = competition.price || "To be announced";
  const about = competition.about || competition.description; // use "about" if provided, else fall back to short description

  // set the browser tab title
  document.title = "CamConnect - " + competition.name;

  // breadcrumb showing the competition name at the top of the page
  document.getElementById("breadcrumbName").textContent = competition.name;

  // hero image + alt text
  document.getElementById("competitionImage").src = competition.image;
  document.getElementById("competitionImage").alt = competition.name;

  // status badge (open/closed), styled based on the status text
  const statusBadge = document.getElementById("competitionStatusBadge");
  statusBadge.textContent = competition.status;
  statusBadge.classList.add(competition.status === "Open" ? "status-open" : "status-closed");

  // category/level tags and main title info
  document.getElementById("competitionCategory").textContent = competition.category;
  document.getElementById("competitionLevel").textContent = competition.level;
  document.getElementById("competitionName").textContent = competition.name;
  document.getElementById("competitionOrganizer").textContent = organizer;
  document.getElementById("competitionAbout").textContent = about;

  // deadline shown in both the sidebar CTA and the main content area
  const deadlineFormatted = formatDate(competition.deadline);
  document.getElementById("competitionDeadline").textContent = deadlineFormatted;
  document.getElementById("competitionDaysLeft").textContent = daysLeftText(competition.deadline);

  // register button links out to the external registration form/page
  const registerBtn = document.getElementById("competitionRegisterBtn");
  registerBtn.href = competition.registerLink || "#";

  // details list on the sidebar (deadline, organizer, location, team size, level, price)
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
      return item.id !== competition.id; // exclude the competition currently being viewed
    })
    .slice(0, 3); // only show up to 3 suggestions

  renderCompetitions(others, "otherCompetitions"); // reuse the card renderer from competition-card.js
}

// 7. Run it
if (currentCompetition) {
  renderCompetitionDetail(currentCompetition);
  renderOtherCompetitions(currentCompetition);
}