let clicks = 0;
let mealId = [];

//-- Search Meal --//
function searchClick() {
    document.getElementById('alert').style.display = 'block';
    const searchString = document.querySelector('#search-bar').value;
    if (searchString.length == 1) {
        const url = 'https://www.themealdb.com/api/json/v1/1/search.php?f=' + searchString;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                searchWithFirstLetter(data)
            })
    }
    else if (searchString == "") {
        document.getElementById('modalButton').click();
    }
    else {
        console.log("Search with name");
        const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + searchString;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                searchWithName(data)
            })
    }

}

//-- Click on Searched item --//
function searchedItemClick(id) {
    document.getElementById('alert').style.display = 'block';
    document.getElementById('search').style.display = 'none';
    document.getElementById('meal-card').style.display = 'none';
    document.getElementById('search-bar').value = '';
    console.log(mealId[id]);
    clicks = 'meal'
    loadMealDetails(mealId[id]);
}

//-- Back button click --//
function identifyClick() {
    switch(clicks) {
        case 'home': {
            document.getElementById('meal-card').innerHTML = "";
            document.getElementById('initial-message').style.display = 'flex';
            clicks = '';
            break;
        }
        case 'meal': {
            document.getElementById('meal-card').style.display = 'flex';
            document.getElementById('search').style.display = 'block';
            document.getElementById('meal-details').style.display = 'none';
            clicks = 'home'
            break;
        }
    }
}

