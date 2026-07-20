fetch("components/header.html")
  .then(function (response) {
    return response.text();
  })
  .then(function(html) {
    document.getElementById("header").innerHTML = html;
  });