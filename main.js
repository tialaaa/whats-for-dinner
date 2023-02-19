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

var listItemSide = document.createElement('li');
var listItemMain = document.createElement('li');
var listItemDessert = document.createElement('li');

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

// MODALS FOR ADD/EDIT/DELETE //
var buttonShowAdd = document.querySelector('#add');
var buttonShowEdit = document.querySelector('#edit');
var buttonDelete = document.querySelector('#delete');
var buttonClose = document.querySelector('.close');

var modalForAdd = document.querySelector('#modalAdd');
var submitAdd = document.querySelector('#submit-add');
var inputType = document.querySelector('#add-to-type');
var inputName = document.querySelector('#new-meal');

// var modalForEdit -> to finish
// var submitEdit -> to finish

buttonClose.addEventListener('click', closeModal);

buttonShowAdd.addEventListener('click', function(event) {
    event.preventDefault();
    console.log(`add was pressed`)
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

buttonDelete.addEventListener('click', function(event) {
    event.preventDefault();
    deleteMeal()
});

function showAddModal() {
    modalForAdd.classList.remove('hidden');
    // add CSS for overlay to blur background, remove classList hidden & disable bkdg buttons
};

function addMeal() {
    var newMealType = inputType.value;
    var newMealName = inputName.value;
    var matchedTypeArray = meals[`${newMealType}`];

    for (var i = 0; i < matchedTypeArray.length; i++) {
        if (matchedTypeArray[i] === newMealName) {
            modalForAdd.classList.add('hidden');
            return;
        };
    };

    meals[`${newMealType}`].push(newMealName);
    modalForAdd.classList.add('hidden');
    listSides.innerText = "";
    listMains.innerText = "";
    listDesserts.innerText = "";
    flagNav = "homepage";
    checkFlag(flagNav);
    inputName.value = "";
    inputType.value = "side";
}

function closeModal() {
    modalForAdd.classList.add('hidden');
    // overlay.classList.add("hidden");
};

function showEditModal() {
};

function deleteMeal() {

    var stored = chosenMeal.parentElement.id
    console.log(stored)

    // for (var i = 0; i < meals.length; i++) {
    //     if (Object.values(meals[i]).includes(chosenMeal.innerText)) {
    //         console.log(chosenMeal.innerText)
    //     } else {
    //         console.log(`not in ${meals[i]}`)
    //     }
    // }
    // using chosenMeal, identify it's key
    // match to the correct array within meals object
    // and splice it from that array
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
