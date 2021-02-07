//--Class Meal--//
class Meal {
    constructor(strMealThumb, strMeal, strArea, strCategory, strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5) {
        this.strMealThumb = strMealThumb;
        this.strMeal = strMeal;
        this.strArea = strArea;
        this.strCategory = strCategory;
        this.strIngredient1 = strIngredient1;
        this.strIngredient2 = strIngredient2;
        this.strIngredient3 = strIngredient3;
        this.strIngredient4 = strIngredient4;
        this.strIngredient5 = strIngredient5;
    }
}

//--Category card part--//
(function () {
    console.log('Step-1');
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
        .then(console.log("Step-2"))
        .then(res => res.json())
        .then(data => {
            console.log('BeforeLoadData');
            loadData(data)
        })
})();
function loadData(data) {
    const parentDiv = document.getElementById('category-card');
    for (let i = 0; i < data.categories.length; i++) {
        const childDiv = document.createElement('div');
        childDiv.classList.add('custom-card', 'card');
        const childElements = `
            <img src="${data.categories[i].strCategoryThumb}" class="card-img-top custom-img" alt="image">
            <div class="card-body">
                <p class="card-text text-center fs-5 fw-bold">${data.categories[i].strCategory}</p>
            </div>
        `;
        childDiv.innerHTML = childElements;
        parentDiv.appendChild(childDiv);
    }
}

//--Searched Meal finder--//
function searchClick() {
    const searchString = document.querySelector('#search-bar').value;
    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=' + searchString;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            setSearchedMeal(data)
        })
}
let count = 0;
let itemDescription = [];
function setSearchedMeal(data) {
    if (data.meals != null) {
        document.querySelector('#category-card').style.display = 'none';
        (function () {
            const parentDiv = document.getElementById('searched-card');
            const childDiv = document.createElement('div');

            childDiv.id = count++;
            const meal = new Meal(data.meals[0].strMealThumb, data.meals[0].strMeal, data.meals[0].strArea, data.meals[0].strCategory, data.meals[0].strIngredient1, data.meals[0].strIngredient2, data.meals[0].strIngredient3, data.meals[0].strIngredient4, data.meals[0].strIngredient5);
            itemDescription.push(meal);
            childDiv.setAttribute("onclick", "searchedItemClick(this.id)");

            childDiv.classList.add('custom-card', 'card');
            const childElements = `
            <img src="${data.meals[0].strMealThumb}" class="card-img-top custom-img" alt="image">
            <div class="card-body">
                <p class="card-text text-center fs-5 fw-bold">${data.meals[0].strMeal}</p>
            </div>
        `;
            childDiv.innerHTML = childElements;
            parentDiv.appendChild(childDiv);
        })();
    } 
    else {
        document.getElementById('modalButton').click();
    }
}

//--Click on Searched item--//
function searchedItemClick(id) {
    document.querySelector('#category-card').style.display = 'none';
    document.querySelector('#searched-card').style.display = 'none';
    document.querySelector('#search-section').style.display = 'none';
    document.querySelector('#meal-div').style.display = 'block';

    document.getElementById('strMeal').innerText = itemDescription[id].strMeal;
    document.getElementById('strMealThumb').src = itemDescription[id].strMealThumb;
    //document.getElementById('strArea').innerText = itemDescription[id].strArea;
    document.getElementById('strCategory').innerText = itemDescription[id].strCategory;
    document.getElementById('ingredient-1').innerText = itemDescription[id].ingredient-1;
    document.getElementById('ingredient-2').innerText = itemDescription[id].ingredient-2;
    document.getElementById('ingredient-3').innerText = itemDescription[id].ingredient-3;
}

