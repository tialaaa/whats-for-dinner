// ~~* HOME PAGE *~~ //

var buttonNav = document.querySelector('.nav-button');
var viewForm = document.querySelector('#left');
var viewNoRecipe = document.querySelector('#right-no-selection');
var viewShowRecipe = document.querySelector('#right-with-selection');
var viewAllRecipes = document.querySelector('#all-recipes');
var form = document.querySelector('#recipeTypeForm');
var recipeOutput = document.querySelector('#recipe-output');
var buttonClear = document.querySelector('#clear');

var listSides = document.querySelector('#side');
var listMains = document.querySelector('#main');
var listDesserts = document.querySelector('#dessert');

var listItemSide = document.createElement('li');
var listItemMain = document.createElement('li');
var listItemDessert = document.createElement('li');

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

buttonClear.addEventListener('click', displayHomepage);
buttonNav.addEventListener('click', function() {
    checkFlag(flagNav);
});

form.addEventListener('submit', function(event) {
    event.preventDefault();
    var selectedType = document.querySelector('input[name="dinner-type"]:checked').value;
    randomizeRecipe(selectedType);
    displayRandomRecipe();
});

listSides.addEventListener('click', function(event) {
    targetMeal();
    toggleButtons();
});

listMains.addEventListener('click', function(event) {
    targetMeal();
    toggleButtons();
});

listDesserts.addEventListener('click', function(event) {
    targetMeal();
    toggleButtons();
});

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

    listSides.innerText = "";
    listMains.innerText = "";
    listDesserts.innerText = "";
};

function checkFlag(flagNav) {
    if (flagNav === "homepage") {
        displayAllRecipes();
        buttonNav.innerText = "Back To Home";
    } else if (flagNav === "allRecipes") {
        displayHomepage();
        buttonNav.innerText = "View All Recipes";
    };
};

function displayAllRecipes() {
    flagNav = "allRecipes";
    listSides.innerText = "";
    listMains.innerText = "";
    listDesserts.innerText = "";

    viewAllRecipes.classList.remove('hidden');
    viewForm.classList.add('hidden');
    viewNoRecipe.classList.add('hidden');
    viewShowRecipe.classList.add('hidden');

    makeLists(meals);
    chosenMeal = null;
    toggleButtons();
};

function makeLists(meals) {

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

// ~~* ALL RECIPES - ADD/EDIT/DELETE *~~ //

var buttonShowAdd = document.querySelector('#add');
var buttonShowEdit = document.querySelector('#edit');
var buttonDelete = document.querySelector('#delete');
var overlay = document.querySelector('.overlay');

var modalForAdd = document.querySelector('#modalAdd');
var submitAdd = document.querySelector('#submit-add');
var inputType = document.querySelector('#add-to-type');
var inputName = document.querySelector('#new-meal');
var buttonCloseAdd = document.querySelector('#close-add');

var modalForEdit = document.querySelector('#modalEdit');
var submitEdit = document.querySelector('#submit-edit');
var changeName = document.querySelector('#change-meal');
var buttonCloseEdit = document.querySelector('#close-edit');

buttonCloseAdd.addEventListener('click', resetModals);
buttonCloseEdit.addEventListener('click', resetModals);
inputName.addEventListener('keyup', checkChange);
changeName.addEventListener('keyup', checkChange);

buttonShowAdd.addEventListener('click', function(event) {
    event.preventDefault();
    showAddModal();
});

submitAdd.addEventListener('click', function(event) {
    event.preventDefault();
    addMeal();
});

buttonShowEdit.addEventListener('click', function(event) {
    event.preventDefault();
    showEditModal()
});

submitEdit.addEventListener('click', function(event) {
    event.preventDefault();
    editMeal();
});

buttonDelete.addEventListener('click', function(event) {
    event.preventDefault();
    deleteMeal()
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

function toggleButtons() {
    if (chosenMeal !== null) {
        buttonShowEdit.disabled = false;
        buttonDelete.disabled = false;
    } else {
        buttonShowEdit.disabled = true;
        buttonDelete.disabled = true;
    }
};

function resetModals() {
    modalForAdd.classList.add('hidden');
    inputName.value = "";
    inputType.value = "side";
    modalForEdit.classList.add('hidden');
    changeName.value = "";
    overlay.classList.add("hidden");
};

function showAddModal() {
    modalForAdd.classList.remove('hidden');
    overlay.classList.remove("hidden");
    submitAdd.disabled = true;
};

function addMeal() {
    var newMealType = inputType.value;
    var newMealName = inputName.value;
    var mealsArrayToAddTo = meals[`${newMealType}`];

    for (var i = 0; i < mealsArrayToAddTo.length; i++) {
        if (mealsArrayToAddTo[i] === newMealName) {
            resetModals();
            return;
        };
    };

    meals[`${newMealType}`].push(newMealName);

    displayAllRecipes();
    resetModals();
};

function showEditModal() {
    modalForEdit.classList.remove('hidden');
    submitEdit.disabled = true;
    changeName.value = chosenMeal.innerText;
    overlay.classList.remove("hidden");
};

function checkChange() {
    if (inputName.value !== "") {
        submitAdd.disabled = false;
    } else {
        submitAdd.disabled = true;
    };

    if (chosenMeal === null) {
        return;
    } else if (changeName.value !== chosenMeal.innerText && chosenMeal.innerText !== null) {
        submitEdit.disabled = false;
    } else {
        submitEdit.disabled = true;
    };
};

function editMeal() {
    var matchedTypeForEdit = chosenMeal.parentElement.id;
    var mealsArrayToAddTo = meals[`${matchedTypeForEdit}`];
    var updatedMealName = changeName.value;

    for (var i = 0; i < mealsArrayToAddTo.length; i++) {
        if (mealsArrayToAddTo[i] === chosenMeal.innerText) {
            if (mealsArrayToAddTo[i] === updatedMealName) {
                resetModals();
            } else {
                mealsArrayToAddTo.splice([i], 1, updatedMealName);
                displayAllRecipes();
                resetModals();
            };
            
            return;
        };
    };
};

function deleteMeal() {
    var matchedTypeForDelete = chosenMeal.parentElement.id;
    var mealsArrayToDeleteFrom = meals[`${matchedTypeForDelete}`];

    for (var i = 0; i < mealsArrayToDeleteFrom.length; i++) {
        if (mealsArrayToDeleteFrom[i] == chosenMeal.innerText) {
            mealsArrayToDeleteFrom.splice([i], 1);;

            displayAllRecipes();
            return;
        };
    };
};
