// load the shared header HTML file
fetch("components/header.html")
  .then(function (response) {
    return response.text(); // get the raw HTML as a string
  })
  .then(function (html) {
    document.getElementById("header").innerHTML = html; // inject it into the page's header container

    // get the current page's filename, e.g. "competition.html"
    const currentPage = window.location.pathname.split("/").pop();

    // mark the nav link matching the current page as active
    document.querySelectorAll(".nav-link").forEach(function (link) {
      if (link.getAttribute("data-page") === currentPage) {
        link.classList.add("active");
      }
    });
  });