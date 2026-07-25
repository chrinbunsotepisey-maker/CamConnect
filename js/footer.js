// load the shared footer HTML file
fetch("components/footer.html")
  .then(function (response) {
    return response.text(); // get the raw HTML as a string
  })

  .then(function (html) {
    document.getElementById("footer").innerHTML = html; // inject it into the page's footer container
  })