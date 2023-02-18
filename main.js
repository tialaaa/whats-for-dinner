// var buttonShowAllRecipes = document.querySelector('.all-recipes');
// var buttonLetsCook = document.querySelector('#lets-cook');
var homeNoRecipe = document.querySelector('#right-no-selection');
var homeShowRecipe = document.querySelector('#right-with-selection');
var form = document.querySelector('#recipeTypeForm');
var buttonClear = document.querySelector('#clear');

// buttonShowAllRecipes.addEventListener('click', showAllRecipes);
// buttonLetsCook.addEventListener('click', displayRecipe);

form.addEventListener('submit', function(event) {
    event.preventDefault();
    var selectedType = document.querySelector('input[name="dinner-type"]:checked').value;
    randomizeRecipe(selectedType);
    displayRecipe();
});
// should I separate these functions ^^? do I need buttonLetsCook?

buttonClear.addEventListener('click', function() {
    // TODO: figure out why this preventDefault is needed
    event.preventDefault();
    alert(`message for alert`);
})

// buttonShowAllRecipes.addEventListener('click', console.log(`somethin else`));

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

// function changeView(viewToUpdate) {
//     if (viewToUpdate.classList.contains('hidden') === true) {
//         viewToUpdate.classList.remove('hidden');
//     } else {
//         viewToUpdate.classList.add('hidden');
//     };
// };

function getRandomIndex(array) {
    var arrayIndex = Math.floor(Math.random() * array.length);
    return array[arrayIndex];
};

function randomizeRecipe(typeToMatch) {
    var matchedMealsArray = meals[`${typeToMatch}`];

    recipe = getRandomIndex(matchedMealsArray);
};

function displayRecipe() {
    // changeView(homeNoRecipe);
    // changeView(homeShowRecipe);
    homeNoRecipe.classList.add('hidden');
    homeShowRecipe.classList.remove('hidden');

    homeShowRecipe.innerHTML = `
        <div id="recipe-output">
          <h4>You should make:</h4>
          <h1 class="largest" id="selection-output">${recipe}!</h1>
        </div>
        <button id="clear">Clear</button>
    `
    console.log(`is it this?`)
};

function displayHomepage() {
    console.log(`displayHomepage function was called`)
    // console.log(homeNoRecipe)
    // changeView(homeNoRecipe);

    // console.log(homeShowRecipe)
    // changeView(homeShowRecipe);
};




function displayAllRecipes() {
    // show class all-recipes
    // hide homeNoRecipe + homeShowRecipe
}

// VIEW NOTES FOR HIDE/SHOW CHECKS:
// view:        Start -> All recipes-> Back home -> Show Recipe -> Clear
// homeNoRecipe: true ->   false ->    true    ->  false          -> true
// homeShowRecipe: false -> false ->   false   ->   true          -> false
// allRecipes:   false  ->  true  ->   false   ->  false          -> false

// function displayHomepage = back home & clear & load
// function displayRecipe  = show recipe
// function showAllRecipes = show all
