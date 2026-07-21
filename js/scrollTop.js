fetch("components/scroll-top.html")
  .then(function (response) {
    return response.text();
  })
  .then(function (html) {
    document.getElementById("scrollTopSlot").innerHTML = html;
  });


window.addEventListener("scroll", function () {
  const btn = document.getElementById("scrollTopBtn");
  if (!btn) return;

  if (window.scrollY > 300) {
    btn.classList.add("show");
  } else {
    btn.classList.remove("show");
  }
});

document.addEventListener("click", function (e) {
  if (e.target.closest("#scrollTopBtn")) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});