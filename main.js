var buttonNav = document.querySelector('.nav-button');
var viewForm = document.querySelector('#left');
var viewNoRecipe = document.querySelector('#right-no-selection');
var viewShowRecipe = document.querySelector('#right-with-selection');
var viewAllRecipes = document.querySelector('#all-recipes');
var form = document.querySelector('#recipeTypeForm');
var recipeOutput = document.querySelector('#recipe-output');
var buttonClear = document.querySelector('#clear');

var listSides = document.querySelector('#list-sides');
var listMains = document.querySelector('#list-mains');
var listDesserts = document.querySelector('#list-desserts');


form.addEventListener('submit', function(event) {
    event.preventDefault();
    var selectedType = document.querySelector('input[name="dinner-type"]:checked').value;
    randomizeRecipe(selectedType);
    displayRandomRecipe();
    // TODO: could optimize by calling randomizeRecipe within displayRandomRecipe
});

buttonClear.addEventListener('click', displayHomepage);
buttonNav.addEventListener('click', function() {
    checkFlag(flagNav);
});

var flagNav = "homepage";
var recipe = "";
var chosenMeal = null
var meals = {
    side: [
        "Miso Glazed Carrots",
        "Coleslaw",
        "Garden Salad",
        "Crispy Potatoes",
        "Sweet Potato Tots",
        "Coconut Rice",
        "Caeser Salad",
        "Shrimp Summer Rolls",
        "Garlic Butter Mushrooms",
        "Hush Puppies"
    ],
    main: [
        "Spaghetti and Meatballs",
        "Pineapple Chicken",
        "Baked Salmon",
        "Thai Yellow Curry",
        "Bibimbap",
        "Chicken Parmesean",
        "Butternut Squash Soup",
        "BBQ Chicken Burgers",
        "Ramen",
        "Empanadas",
        "Chicken Fried Rice",
        "Sheet Pan Fajitas",
        "Margarita Pizza"
    ],
    dessert: [
        "Apple Pie",
        "Lemon Meringue Pie",
        "Black Forest Cake",
        "Banana Bread",
        "Peach Cobbler",
        "Cheesecake",
        "Funfetti Cake",
        "Baklava",
        "Flan",
        "Macarons",
        "Macaroons",
        "Chocolate Cupcakes",
        "Pavlova",
        "Pumpkin Pie",
        "Key Lime Pie",
        "Tart Tatin",
        "Croissants",
        "Eclairs"
    ]
};

function getRandomIndex(array) {
    var arrayIndex = Math.floor(Math.random() * array.length);
    return array[arrayIndex];
};

function randomizeRecipe(typeToMatch) {
    var matchedMealsArray = meals[`${typeToMatch}`];

    recipe = getRandomIndex(matchedMealsArray);
};

function displayRandomRecipe() {
    viewNoRecipe.classList.add('hidden');
    viewShowRecipe.classList.remove('hidden');

    recipeOutput.innerHTML = `
        <h4>You should make:</h4>
        <h1 class="largest" id="selection-output">${recipe}!</h1>
    `
};

function displayHomepage() {
    flagNav = "homepage";

    viewForm.classList.remove('hidden');
    viewNoRecipe.classList.remove('hidden');
    viewShowRecipe.classList.add('hidden');
    viewAllRecipes.classList.add('hidden');
    // TODO: Clear radio button selection

    listSides.innerText = "";
    listMains.innerText = "";
    listDesserts.innerText = "";
};

function checkFlag(flagNav) {
    if (flagNav === "homepage") {
        displayAllRecipes();
    } else if (flagNav === "allRecipes") {
        displayHomepage();
    };
};

function displayAllRecipes() {
    flagNav = "allRecipes";

    viewAllRecipes.classList.remove('hidden');
    viewForm.classList.add('hidden');
    viewNoRecipe.classList.add('hidden');
    viewShowRecipe.classList.add('hidden');

    makeLists(meals);
};

function makeLists(meals) {
    var listItemSide = document.createElement('li');
    var listItemMain = document.createElement('li');
    var listItemDessert = document.createElement('li');

    for (var i = 0; i < meals.side.length; i++) {
        listItemSide.innerText = meals.side[i];
        listSides.appendChild(listItemSide);
        listItemSide = document.createElement('li');
    };

    for (var i = 0; i < meals.main.length; i++) {
        listItemMain.innerText = meals.main[i];
        listMains.appendChild(listItemMain);
        listItemMain = document.createElement('li');
    };

    for (var i = 0; i < meals.dessert.length; i++) {
        listItemDessert.innerText = meals.dessert[i];
        listDesserts.appendChild(listItemDessert);
        listItemDessert = document.createElement('li');
    };
};

listSides.addEventListener('click', function(event) {
    targetMeal();
    toggleButtons(buttonEdit, buttonDelete, chosenMeal);
});

listMains.addEventListener('click', function(event) {
    targetMeal();
    toggleButtons(buttonEdit, buttonDelete, chosenMeal);
});

listDesserts.addEventListener('click', function(event) {
    targetMeal();
    toggleButtons(buttonEdit, buttonDelete, chosenMeal);
});

function targetMeal() {
    if (chosenMeal === null) {
        chosenMeal = event.target.closest('li');
        chosenMeal.classList.add('selected-meal');
    } else if (chosenMeal === event.target.closest('li')) {
        chosenMeal.classList.remove('selected-meal');
        chosenMeal = null;
    } else {
        chosenMeal.classList.remove('selected-meal');
        chosenMeal = event.target.closest('li');
        chosenMeal.classList.add('selected-meal');
    };
};

function toggleButtons(buttonEdit, buttonDelete, chosenMeal) {
    if (chosenMeal !== null) {
        buttonEdit.disabled = false;
        buttonDelete.disabled = false;
    } else {
        buttonEdit.disabled = true;
        buttonDelete.disabled = true;
    }
};

var buttonAdd = document.querySelector('#add');
var buttonEdit = document.querySelector('#edit');
var buttonDelete = document.querySelector('#delete');
var modalForAdd = document.querySelector('#modalAdd');
var buttonClose = document.querySelector('.close');

buttonAdd.addEventListener('click', function(event) {
    event.preventDefault();
    console.log(`add was pressed`)
    showAddModal();
});

buttonEdit.addEventListener('click', showEditModal());
buttonDelete.addEventListener('click', showDeleteModal());

function showAddModal() {
    modalForAdd.classList.remove('hidden');

};

function showEditModal() {
};

function showDeleteModal() {
};


// VIEW NOTES FOR HIDE/SHOW CHECKS:
// view:        Start -> All recipes-> Back home -> Show Recipe -> Clear
// viewNoRecipe: true ->   false ->    true    ->  false          -> true
// viewShowRecipe: false -> false ->   false   ->   true          -> false
// allRecipes:   false  ->  true  ->   false   ->  false          -> false

// function displayHomepage = back home & clear & load
// function displayRandomRecipe  = show recipe
// function showAllRecipes = show all

// function toggleView(viewToUpdate) {
//     if (viewToUpdate.classList.contains('hidden') === true) {
//         viewToUpdate.classList.remove('hidden');
//     } else {
//         viewToUpdate.classList.add('hidden');
//     };
// };
