// var buttonShowAllRecipes = document.querySelector('.all-recipes');
// var buttonLetsCook = document.querySelector('#lets-cook');
var homeNoRecipe = document.querySelector('#right-no-selection');
var homeShowRecipe = document.querySelector('#right-with-selection');
var form = document.querySelector('#recipeTypeForm')

// buttonShowAllRecipes.addEventListener('click', showAllRecipes);
// buttonLetsCook.addEventListener('click', displayRecipe);

form.addEventListener('submit', function(event) {
    event.preventDefault();
    var selectedType = document.querySelector('input[name="dinner-type"]:checked').value;
    randomizeRecipe(selectedType);
    displayRecipe();
});
// should I separate these functions ^^? do I need buttonLetsCook?

var recipe = ""

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

    recipe = getRandomIndex(matchedMealsArray)
};

function displayRecipe() {
    console.log(`random recipe: ${recipe}`)
    homeNoRecipe.classList.add('hidden');
    homeShowRecipe.classList.remove('hidden');
    homeShowRecipe.innerHTML = `
        <h4>You should make:</h4>
        <h1 id="selection-output">${recipe}</h1>
        <button id="clear">Clear</button>
    `
};

