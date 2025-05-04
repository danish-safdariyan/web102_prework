/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    for (const game of games) {
        // create the card wrapper
        const card = document.createElement("div");
        card.classList.add("game-card");

        // populate it
        card.innerHTML = `
            <img class="game-img" src="${game.img}" alt="${game.name}" />
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p><strong>Pledged:</strong> $${game.pledged.toLocaleString()}</p>
            <p><strong>Goal:</strong> $${game.goal.toLocaleString()}</p>
            <p><strong>Backers:</strong> ${game.backers.toLocaleString()}</p>
        `;

        // append to page
        gamesContainer.appendChild(card);
    }
}

// 🌊 Render all games on initial page load
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");
// total contributions (sum of backers)
const totalContributions = GAMES_JSON.reduce((sum, game) => sum + game.backers, 0);
contributionsCard.innerHTML = totalContributions.toLocaleString();

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
// total dollars raised
const totalRaised = GAMES_JSON.reduce((sum, game) => sum + game.pledged, 0);
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = GAMES_JSON.length;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    const unfunded = GAMES_JSON.filter(game => game.pledged < game.goal);
    addGamesToPage(unfunded);
}

// show only games that have met or exceeded their goal
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    const funded = GAMES_JSON.filter(game => game.pledged >= game.goal);
    addGamesToPage(funded);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn   = document.getElementById("funded-btn");
const allBtn      = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// count unfunded games
const unfundedCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// pluralize appropriately
const gameWord = unfundedCount === 1 ? "game remains unfunded" : "games remain unfunded";

// build summary string
const summaryStr = `A total of <strong>${unfundedCount}</strong> ${gameWord}. Help us reach our goals!`;

// append the summary paragraph
const summaryEl = document.createElement("p");
summaryEl.innerHTML = summaryStr;
descriptionContainer.appendChild(summaryEl);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
*/

// grab the containers for the top games
const firstGameContainer  = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

// sort games by pledged amount, descending
const sortedGames = GAMES_JSON.sort((a, b) => b.pledged - a.pledged);

// use destructuring to grab the top two
const [firstGame, secondGame] = sortedGames;

// create and append elements for the #1 game
const firstEl = document.createElement("p");
firstEl.textContent = firstGame.name;
firstGameContainer.appendChild(firstEl);

// create and append elements for the runner up
const secondEl = document.createElement("p");
secondEl.textContent = secondGame.name;
secondGameContainer.appendChild(secondEl);
