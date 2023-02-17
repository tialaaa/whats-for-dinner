var buttonShowAllRecipes = document.querySelector('.all-recipes');
var formSubmit = document.querySelector('#lets-cook');

// buttonShowAllRecipes.addEventListener('click', showAllRecipes);
// formSubmit.addEventListener('click', displayRecipe);
formSubmit.addEventListener('click', getMealType);

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

// Function getMealType needs to:
// --define var formSelection using query selector based on user's input
// --loop thru formSelection to identify which value was selected
// --redefine formSelection w/ that output
// --return formSelection

// Function randonmizeRecipe based on meal type selection, needs to:
// --using getMealType's return, loop thru the meals object to identify which property to use
// --within that property, randomize a return value & store in var recipe

// Function displayRecipe, needs to:
// --hide cookput img section
// --show answer section
// --inner.HTML to populate the section using randomizeRecipe's return

function getMealType() {
    var formSelection = document.getElementsByName('dinner-type');

    for (var i = 0; i < formSelection.length; i++) {
        if (formSelection[i].checked) {
            formSelection = formSelection[i].value;
            return formSelection;
        };
    };
};


// function randomizeRecipe() {

// }

// function displayRecipe() {

// }