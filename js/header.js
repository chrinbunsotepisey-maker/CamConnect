fetch("components/header.html")
  .then(function (response) {
    return response.text();
  })
  .then(function (html) {
    document.getElementById("header").innerHTML = html;

    const currentPage = window.location.pathname.split("/").pop();

    document.querySelectorAll(".nav-link").forEach(function (link) {
      if (link.getAttribute("data-page") === currentPage) {
        link.classList.add("active");
      }
    });
  });