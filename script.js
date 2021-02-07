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
    console.log('Entered Load Data');
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
function setSearchedMeal(data) {
    if (data.meals != null) {
        document.querySelector('#category-card').style.display = 'none';
        (function () {
            const parentDiv = document.getElementById('searched-card');
            const childDiv = document.createElement('div');
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
function searchedItemClick() {
    alert('Clicked');
    document.getElementById('')
}

