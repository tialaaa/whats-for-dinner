var buttonShowAll = document.querySelector('#show-all');
// ^^ change var name to more generic 'nav-button', so it works regardless of which page you're on?
var viewForm = document.querySelector('#left');
var viewNoRecipe = document.querySelector('#right-no-selection');
var viewShowRecipe = document.querySelector('#right-with-selection');
var viewAllRecipes = document.querySelector('#all-recipes');
var form = document.querySelector('#recipeTypeForm');
var recipeOutput = document.querySelector('#recipe-output');
var buttonClear = document.querySelector('#clear');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    var selectedType = document.querySelector('input[name="dinner-type"]:checked').value;
    randomizeRecipe(selectedType);
    displayRandomRecipe();
    // TODO: could optimize by calling randomizeRecipe within displayRandomRecipe
});

buttonClear.addEventListener('click', displayHomepage);
buttonShowAll.addEventListener('click', displayAllRecipes);

var recipe = "";

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
    viewNoRecipe.classList.remove('hidden');
    viewShowRecipe.classList.add('hidden');
    // TODO: Clear radio button selection
};

function displayAllRecipes() {
    viewAllRecipes.classList.remove('hidden');
    viewForm.classList.add('hidden');
    viewNoRecipe.classList.add('hidden');
    viewShowRecipe.classList.add('hidden');
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
