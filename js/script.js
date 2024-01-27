const nav_toggle = $(".toggle_btn");
const rowData = $(".data .row");
const searchContainer = $("#searchContainer");
let submitBtn;

const nav_items = Array.from($("ul li"));

$(document).ready(() => {
  searchContainer.html("");
});

nav_toggle.on("click", function () {
  $(".side_bar").toggleClass("active");
  nav_toggle.toggleClass("fa-bars fa-x");
});

async function getFood(meals = "") {
  try {
    $(".loading").removeClass("d-none");

    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${meals}`
    );
    const data = await response.json();

    showMeals(data);
    $(".loading").addClass("d-none");
  } catch (error) {
    console.log(error);
  }
}

function showMeals(food) {
  let menu = [];

  for (let i = 0; i < food.meals.length; i++) {
    menu += `  <div onclick="getMealDetails('${food.meals[i].idMeal}')" class="col-md-3 d-flex justify-content-center">
          <div class="card meal_card">
            <img src="${food.meals[i].strMealThumb}" />
            <div class="overlay  d-flex align-items-center p-3">
              <h2>${food.meals[i].strMeal} </h2>
            </div>
          </div>
        </div>`;

    rowData.html(menu);
  }
}

async function getCategories() {
  $(".loading").removeClass("d-none");

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/categories.php`
    );
    const data = await response.json();

    showCategories(data);
    $(".loading").addClass("d-none");
  } catch (error) {
    console.log(error);
  }
}
function showCategories(category) {
  searchContainer.html("");

  let categories = [];

  for (let i = 0; i < category.categories.length; i++) {
    categories += `  <div onclick="getMealCategory('${category.categories[i].strCategory}')"  class="col-md-3 d-flex justify-content-center">
          <div class="card category_card">
            <img src="${category.categories[i].strCategoryThumb}" />
            <div class="overlay  d-flex flex-column text-center align-items-center p-3">
              <h2>${category.categories[i].strCategory} </h2>
              <p>${category.categories[i].strCategoryDescription}</p>
            </div>
          </div>
        </div>`;

    rowData.html(categories);
  }
}
async function getAreas() {
  $(".loading").removeClass("d-none");

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    );
    const data = await response.json();

    showAreas(data);
    $(".loading").addClass("d-none");
  } catch (error) {
    console.log(error);
  }
}
function showAreas(area) {
  searchContainer.html("");

  let areas = [];

  for (let i = 0; i < area.meals.length; i++) {
    areas += `  <div onclick="getMealArea('${area.meals[i].strArea}')"  class="col-md-3 d-flex justify-content-center">
            <div
              class="card meal_card d-flex flex-column justify-content-center align-items-center pt-5 pb-5 gap-2"
            >
              <i class="fa-solid fa-house-laptop"></i>
              <h2>${area.meals[i].strArea} </h2>
            </div>
          </div>`;

    rowData.html(areas);
  }
}

async function getIngredients() {
  $(".loading").removeClass("d-none");

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    );
    const data = await response.json();

    showIngredients(data);
    $(".loading").addClass("d-none");
  } catch (error) {
    console.log(error);
  }
}

function showIngredients(ingredient) {
  searchContainer.html("");

  let ingredients = [];

  for (let i = 0; i <= 20; i++) {
    ingredients += `<div class="col-md-3">
            <div onclick="getIngredientsMeals('${ingredient.meals[i].strIngredient}')"
              class="card ingredient-card d-flex flex-column text-center align-items-center p-3 "
            >
              <i class="fa-solid fa-utensils fs-1"></i>
              <h2>${ingredient.meals[i].strIngredient} </h2>
              <p>${ingredient.meals[i].strDescription} </p>
            </div>
          </div>`;

    rowData.html(ingredients);
  }
}

function showSearch() {
  rowData.html("");
  searchContainer.removeClass("d-none");
  let l = ` <div class="col-md-12">
             <div class="search-inputs">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control byName"
                        placeholder="search by name"
                        oninput="searchMealsByName(this.value)"
                      />
                  </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <input
                        type="text"
                        class="form-control byLetter"
                        placeholder="search by first letter"
                        oninput="searchMealsByLetter(this.value)"
                      />
                    </div>
                  </div>
                </div>
              </div>
           </div>`;

  searchContainer.html(l);
}
async function searchMealsByName(mealName) {
  $(".loading").removeClass("d-none");

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
    );
    const data = await response.json();

    data ? showMeals(data) : showMeals([]);

    $(".loading").addClass("d-none");
  } catch (error) {
    console.log(error);
  }
}

async function searchMealsByLetter(letter) {
  $(".loading").removeClass("d-none");

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`
    );
    const data = await response.json();

    data ? showMeals(data) : showMeals([]);
    $(".loading").addClass("d-none");
  } catch (error) {
    console.log(error);
  }
}

nav_items.forEach((item, id) => {
  $(item).on("click", () => {
    switch (id) {
      case 0:
        showSearch();
        break;
      case 1:
        getCategories();
        break;
      case 2:
        getAreas();
        break;
      case 3:
        getIngredients();
        break;
      case 4:
        showContacts();
        break;
    }
  });
});

getFood();

async function getMealDetails(mealID = 52923) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
  );
  const data = await response.json();
  console.log(data);

  displayMealDetails(data.meals[0]);
}

function displayMealDetails(meal) {
  searchContainer.html("");

  let ingredients = ``;
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="bg-success-subtle m-1  text-success text-capitalize"
                  >${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li
                >`;
    }
  }

  let tags = meal.strTags?.split(",");
  if (!tags) tags = [];
  let strTags = ``;
  for (let i = 0; i < tags.length; i++) {
    strTags += `<li class="bg-danger-subtle m-1 text-danger text-capitalize"
                  >${tags[i]}</li
                >`;
  }

  let mealDetails = [];

  mealDetails = `  <div class="col-md-4">
            <div class="title">
              <img src="${meal.strMealThumb}" class="rounded-4 w-100" />
              <h2>${meal.strMeal}</h2>
            </div>
          </div>
          <div class="col-md-8">
            <h2>Instructions</h2>
            <p>
              ${meal.strInstructions}
            </p>
            <div class="area">
              <h2>
                <span>Area :</span>
                ${meal.strArea} 

              </h2>
            </div>
            <div class="category">
              <h2>
                <span>category :</span>
                ${meal.strCategory} 
              </h2>
            </div>
            <div class="recipes mb-3">
              <h2>Recipes :</h2>
              <div class="spans">
                ${ingredients} 
              </div>
            </div>
            <div class="tags mb-3">
              <h2>Tags :</h2>
              <div class="spans">
              ${strTags}
              </div>
              </div>
            </div>
          </div>`;

  rowData.html(mealDetails);
}

async function getMealCategory(category) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  const data = await response.json();
  displayMealCategory(data);
}

function displayMealCategory(category) {
  searchContainer.html("");

  let menu = [];

  for (let i = 0; i < category.meals.length; i++) {
    menu += `  <div onclick="getMealDetails('${category.meals[i].idMeal}')" class="col-md-3 d-flex justify-content-center">
          <div class="card meal_card">
            <img src="${category.meals[i].strMealThumb}" />
            <div class="overlay  d-flex align-items-center p-3">
              <h2>${category.meals[i].strMeal} </h2>
            </div>
          </div>
        </div>`;

    rowData.html(menu);
  }
}

async function getMealArea(area) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  const data = await response.json();
  displayMealArea(data);
}

function displayMealArea(area) {
  searchContainer.html("");

  let menu = [];

  for (let i = 0; i < area.meals.length; i++) {
    menu += `  <div onclick="getMealDetails('${area.meals[i].idMeal}')" class="col-md-3 d-flex justify-content-center">
          <div class="card meal_card">
            <img src="${area.meals[i].strMealThumb}" />
            <div class="overlay  d-flex align-items-center p-3">
              <h2>${area.meals[i].strMeal} </h2>
            </div>
          </div>
        </div>`;

    rowData.html(menu);
  }
}

function showContacts() {
  searchContainer.html("");

  rowData.html(`<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="re-passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="re-password">
                <div id="re-passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    passwords doesn't match 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `);

  submitBtn = $("#submitBtn");

  $("#nameInput").on("focus", () => {
    nameInputTouched = true;
  });

  $("#emailInput").on("focus", () => {
    emailInputTouched = true;
  });

  $("#phoneInput").on("focus", () => {
    phoneInputTouched = true;
  });

  $("#ageInput").on("focus", () => {
    ageInputTouched = true;
  });

  $("#passwordInput").on("focus", () => {
    passwordInputTouched = true;
  });

  $("#re-passwordInput").on("focus", () => {
    rePasswordInputTouched = true;
  });
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let rePasswordInputTouched = false;

function inputsValidation() {
  if (nameInputTouched) {
    if (nameValidation()) {
      $("#nameAlert").removeClass("d-block").addClass("d-none");
    } else {
      $("#nameAlert").removeClass("d-none").addClass("d-block");
    }
  }
  if (emailInputTouched) {
    if (emailValidation()) {
      $("#emailAlert").removeClass("d-block").addClass("d-none");
    } else {
      $("#emailAlert").removeClass("d-none").addClass("d-block");
    }
  }

  if (phoneInputTouched) {
    if (phoneValidation()) {
      $("#phoneAlert").removeClass("d-block").addClass("d-none");
    } else {
      $("#phoneAlert").removeClass("d-none").addClass("d-block");
    }
  }

  if (ageInputTouched) {
    if (ageValidation()) {
      $("#ageAlert").removeClass("d-block").addClass("d-none");
    } else {
      $("#ageAlert").removeClass("d-none").addClass("d-block");
    }
  }

  if (passwordInputTouched) {
    if (passwordValidation()) {
      $("#passwordAlert").removeClass("d-block").addClass("d-none");
    } else {
      $("#passwordAlert").removeClass("d-none").addClass("d-block");
    }
  }
  if (rePasswordInputTouched) {
    if (rePasswordValidation()) {
      $("#re-passwordAlert").removeClass("d-block").addClass("d-none");
    } else {
      $("#re-passwordAlert").removeClass("d-none").addClass("d-block");
    }
  }

  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    rePasswordValidation()
  ) {
    submitBtn.removeAttr("disabled");
  } else {
    submitBtn.attr("disabled", true);
  }
}

function nameValidation() {
  return /^[a-zA-Z ]+$/.test($("#nameInput").val());
}

function emailValidation() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    $("#emailInput").val()
  );
}

function phoneValidation() {
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
    $("#phoneInput").val()
  );
}

function ageValidation() {
  return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test($("#ageInput").val());
}

function passwordValidation() {
  return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test($("#passwordInput").val());
}

function rePasswordValidation() {
  return $("#re-passwordInput").val() == $("#passwordInput").val();
}
