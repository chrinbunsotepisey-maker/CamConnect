fetch("components/footer.html")
  .then(function (response) {
    return response.text();
  })

  .then(function (html) {
    document.getElementById("footer").innerHTML = html;
  })
