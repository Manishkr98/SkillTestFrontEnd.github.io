document.addEventListener('DOMContentLoaded', () => {
    const mealId = new URLSearchParams(window.location.search).get('id');
    const mealDetailContainer = document.getElementById('meal-detail');
    document.body.style.backgroundImage = "none"
    document.body.style.backgroundColor = "gray"

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => {
            const meal = data.meals[0];
            mealDetailContainer.innerHTML = `
            <div class="foodItems foodLearMorePage" >
                <h2>${meal.strMeal}</h2>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="images">
                </div>
                <div class="Instructions">
                <p>${meal.strInstructions}</p>
                </div>
                <div class="moreinfo">
                <h3>Ingredients:</h3>
                <ul>
                    ${Object.keys(meal).filter(key => key.startsWith('strIngredient') && meal[key]).map(key => `<li>${meal[key]}</li>`).join('')}
                </ul>
                </div>
            `;
        });
});

// localStorage
let userData = JSON.parse(localStorage.getItem("Datas")) || [];
// Cart Count Define
const calculate = () => {
    let cart_icon = document.getElementById("cart_Amount");
    let cart_Amount = userData.length;
    cart_icon.innerHTML = cart_Amount;

    if (userData.length == 0) {
        document.getElementById("cart_Amount").style.display = "none";
    }
    else {
        document.getElementById("cart_Amount").style.display = "Block";
    }
}
calculate();
