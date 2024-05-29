
let mainContainer = document.getElementById("main_Container");
let userInputBox = document.getElementById("userInputBox");
let userSearchBox = document.getElementById("userSearchBox");
let ItemaBtn = document.querySelectorAll(".ItemaBtn");

// fetch api
const userAPICall = async (value) => {
    mainContainer.innerHTML = '';
    try {

        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`);
        let data = await response.json();
        console.log(data)

        data.meals.forEach((meal, id) => {
            let items = document.createElement("div");
            items.classList = "foodItems"
            items.innerHTML = `
        <div class="foodItem" id="foodItems${id}">
        <img src='${meal.strMealThumb}' alt="" class="images"/>
        <h5>${meal.strMeal}</h5>
        <div class="foodInfo">
       <button class="Favourite" id="favourite" onclick="AddToCart( '${meal.idMeal}' , '${meal.strMealThumb}', '${meal.strMeal}')">Add to Favourite</button>
       <button onclick="viewMeal(${meal.idMeal})" class="LearnMore">View Details</button>
       <button onclick="openYoutube('${meal.strYoutube}')" class="youtubelogo"><i class="fa-brands fa-youtube"></i></button>
       </div>
        </div>
        `
            mainContainer.appendChild(items);
        })
    } catch (error) {
        alert("Oops! Please Search Valid Items...")
    }
}

function openYoutube(url) {
    console.log(url)
    window.open(url, '_blank');
}

//  viewMeal
function viewMeal(mealId) {
    console.log(mealId)
    window.location.href = `learnMore.html?id=${mealId}`;
}

// Local Storage Define 

let userData = JSON.parse(localStorage.getItem("Datas")) || [];
let strMealThumb = JSON.stringify("${meal.strMealThumb}")
let strMeal = JSON.stringify("meal.strMeal");
let id = JSON.stringify("${meal.idMeal}")

// Add to Cart define
let AddToCart = ("click", (id, strMealThumb, strMeal) => {

    alert("You have added your favorite items to your shopping cart!")
    userData.push({
        id: id,
        strMealThumb: strMealThumb,
        strMeal: strMeal
    })

    localStorage.setItem("Datas", JSON.stringify(userData));
    calculate();



})

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

// userInputBox 

userSearchBox.addEventListener("Input", () => {
    let userInputValue = userInputBox.value.trim();
    if (userInputValue == "") {
        alert("First Serach Items...")
    } else {
        userAPICall(userInputValue);
    }
    userInputBox.value = '';
})

//search results should update
userInputBox.addEventListener('input', () => {
    const query = userInputBox.value;
    console.log(query);
    userAPICall(query);
})


// Optional button call here...
ItemaBtn.forEach(function (data) {
    data.addEventListener("click", function () {
        userAPICall(data.value);
    })
})

