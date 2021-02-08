function searchWithName(data) {
    document.getElementById('alert').style.display = 'none';
    if (data.meals != null) {
        clicks = 'home';
        clearAll();
        for (let i = 0; i < data.meals.length; i++) {
            (function () {
                const parentDiv = document.getElementById('meal-card');
                const childDiv = document.createElement('div');

                childDiv.id = count++;
                mealId.push(data.meals[i].idMeal);
                childDiv.setAttribute("onclick", "searchedItemClick(this.id)");

                childDiv.classList.add('custom-card', 'card');
                const childElements = `
                    <img src="${data.meals[i].strMealThumb}" class="card-img-top custom-img" alt="image">
                    <div class="card-body">
                        <p class="card-text text-center fs-5 fw-bold">${data.meals[i].strMeal}</p>
                    </div>
                `;
                childDiv.innerHTML = childElements;
                parentDiv.appendChild(childDiv);
            })();
        }
    }
    else {
        document.getElementById('modalButton').click();
    }
}

function searchWithFirstLetter(data) {
    document.getElementById('alert').style.display = 'none';
    if (data.meals != null) {
        clicks = 'home';
        clearAll();
        for (let i = 0; i < data.meals.length; i++) {
            (function () {
                const parentDiv = document.getElementById('meal-card');
                const childDiv = document.createElement('div');

                childDiv.id = count++;
                mealId.push(data.meals[i].idMeal);
                childDiv.setAttribute("onclick", "searchedItemClick(this.id)");

                childDiv.classList.add('custom-card', 'card', 'meal-items');
                const childElements = `
                    <img src="${data.meals[i].strMealThumb}" class="card-img-top custom-img" alt="image">
                    <div class="card-body">
                        <p class="card-text text-center fs-5 fw-bold">${data.meals[i].strMeal}</p>
                    </div>
                `;
                childDiv.innerHTML = childElements;
                parentDiv.appendChild(childDiv);
            })();
        }
    }
    else {
        document.getElementById('modalButton').click();
    }
}

function clearAll() {
    count = 0;
    itemDescription = [];
    document.getElementById('meal-card').innerHTML = "";
    document.getElementById('initial-message').style.display = 'none';
}

function loadMealDetails(mealId) {
    const url = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + mealId;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        document.getElementById('alert').style.display = 'none';
        clearPreviousCardData();
        const strMealThumb = data.meals[0].strMealThumb;
        const strMeal = data.meals[0].strMeal;
        const strArea = data.meals[0].strArea;
        const strCategory = data.meals[0].strCategory;
        const strIngredient = organizeIngredientData(data);
        document.getElementById('meal-details').style.display = 'block';
        document.getElementById('strMealThumb').src = strMealThumb;
        document.getElementById('strMeal').innerText = strMeal;
        //Create Badge
        const parent = document.getElementById('naming-details');
        const child = document.createElement('p');
        child.className = 'badge-custom';
        child.innerText = strArea+" "+strCategory;
        parent.appendChild(child);
        setIngredients(strIngredient);
    })
}

function clearPreviousCardData() {
    document.getElementById('strMealThumb').src = "";
    document.getElementById('strMeal').innerText = "";
    document.getElementById('naming-details').innerHTML = "";
    document.getElementById('strIngredient').innerHTML = "";
}

function organizeIngredientData(data) {
    const strIngredients = [
        data.meals[0].strIngredient1,
        data.meals[0].strIngredient2,
        data.meals[0].strIngredient3,
        data.meals[0].strIngredient4,
        data.meals[0].strIngredient5,
        data.meals[0].strIngredient6,
        data.meals[0].strIngredient7,
        data.meals[0].strIngredient8,
        data.meals[0].strIngredient9,
        data.meals[0].strIngredient10,
        data.meals[0].strIngredient11,
        data.meals[0].strIngredient12,
        data.meals[0].strIngredient13,
        data.meals[0].strIngredient14,
        data.meals[0].strIngredient15,
        data.meals[0].strIngredient16,
        data.meals[0].strIngredient17,
        data.meals[0].strIngredient18,
        data.meals[0].strIngredient19,
        data.meals[0].strIngredient20,
    ];
    const array = [];
    strIngredients.forEach(element => {
        if (element === "" || element === null) {
            
        }
        else {
            array.push(element);
        } 
    });
    return array;
}

function setIngredients(ingredients) {
    for (let i = 0; i < ingredients.length; i++) {
        const list = document.createElement('li');
        list.innerText = ingredients[i];
        const ul = document.getElementById('strIngredient');
        ul.appendChild(list);
    }
}