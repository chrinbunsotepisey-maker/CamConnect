// load the shared scroll-to-top button HTML file
fetch("components/scroll-top.html")
  .then(function (response) {
    return response.text(); // get the raw HTML as a string
  })
  .then(function (html) {
    document.getElementById("scrollTopSlot").innerHTML = html; // inject the button into its slot on the page
  });


// show/hide the button based on how far the user has scrolled
window.addEventListener("scroll", function () {
  const btn = document.getElementById("scrollTopBtn");
  if (!btn) return; // button may not be injected yet, bail out safely

  if (window.scrollY > 300) {
    btn.classList.add("show"); // scrolled down enough, reveal the button
  } else {
    btn.classList.remove("show"); // near the top, hide the button
  }
});

// listen on the whole document since the button is added dynamically after fetch()
document.addEventListener("click", function (e) {
  if (e.target.closest("#scrollTopBtn")) {
    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll back up smoothly
  }
});