const searchInput = document.getElementById("searchInput");

const levelFilters = document.querySelectorAll(".level-filter");

const categoryFilters = document.querySelectorAll(".category-filter");

const sortSelect = document.getElementById("sortSelect");

searchInput.addEventListener("input", function(){

    console.log("Searching:", this.value);

});

levelFilters.forEach(box=>{

    box.addEventListener("change",function(){

        console.log("Level:",this.value);

    });

});

categoryFilters.forEach(box=>{

    box.addEventListener("change",function(){

        console.log("Category:",this.value);

    });

});

sortSelect.addEventListener("change",function(){

    console.log("Sort:",this.value);

});



// Card Data

renderEvents(
    events,
    "competitionContainer"
);