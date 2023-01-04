//DEFINING DOM SELECTORS
let welcomeHeader = document.querySelector('#player-welcome');
let fightButton = document.querySelector('#fight-button');

//Form selectors
const nameFormDiv = document.getElementById('name-form');
const nameForm = document.getElementById('name-entry');
const pokeFormDiv = document.getElementById('pokemon-form');
const pokeForm = document.getElementById('pokemon-entry');
const pokeInput = document.getElementById('pokemon-name');

//Pokemon card selectors
const playerCardName = document.getElementById('player-card-name');
const playerType = document.getElementById('player-type');
const playerHp = document.getElementById('player-hp');
const playerAttack = document.getElementById('player-attack');
const playerDefence = document.getElementById('player-defence');
const playerSpeed = document.getElementById('player-speed');
const playerWeight = document.getElementById('player-weight');
const playerSprite = document.getElementById('player-sprite');

const compCardName = document.getElementById('comp-card-name');
const compType = document.getElementById('comp-type');
const compHp = document.getElementById('comp-hp');
const compAttack = document.getElementById('comp-attack');
const compDefence = document.getElementById('comp-defence');
const compSpeed = document.getElementById('comp-speed');
const compWeight = document.getElementById('comp-weight');
const compSprite = document.getElementById('comp-sprite');

//Results selectors
const totalLi = document.querySelector('#games-played');
const winLi = document.querySelector('#wins');
const lossLi = document.querySelector('#losses');
const drawLi = document.querySelector('#draws');


//INITIALISING VARIABLES
let playerPokemon = '';
let playerStats = {};
let computerPokemon = 0;
let battleStat = 'hp';

const score = {roundCount: 0, winCount: 0, lossCount: 0, drawCount: 0};


//EVENT LISTENERS 
nameForm.addEventListener('submit', handlePlayerNameSubmit);
pokeForm.addEventListener('submit', handlePokeSubmit);
fightButton.addEventListener('click', pokemonFight);


//FUNCTIONS
//Calculating the battle result
async function pokemonFight() {
    let compPokemon = getComputerMove();
    let compStats = await getPokemonData(compPokemon);
    displayCompPokemon(compStats);

    //Update the total number of rounds
    score.roundCount++;
    totalLi.innerText = `Games played: ${score.roundCount}`;

   //Calcuate who won, and update win/loss/draw 
    
    if (+playerStats.hp < +compStats.hp) {
        score.lossCount++;
        lossLi.innerText = `Losses: ${score.lossCount}`;
        console.log('Player loses');
    } else if (+playerStats.hp > +compStats.hp) {
        score.winCount++
        winLi.innerText = `Wins: ${score.winCount}`;
        console.log('Player wins');
    } else {
        score.drawCount++
        drawLi.innerText = `Draws: ${score.drawCount}`;
        console.log('draw');
    }

 }


//Form submission handlers
function handlePlayerNameSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const playerName = data.get('player-name');

    if (!isLetter(playerName)) {
        alert('Your name must start with a capital letter, please try again!');
        return null;
    }
      
    welcomeHeader.innerText = `Let's play, ${playerName}!`
    welcomeHeader.style.visibility = 'visible';
    nameFormDiv.style.visibility = 'hidden'; //hides the form after name entry
    pokeFormDiv.style.visibility = 'visible'; //shows the pokemon form once we have a name
}

async function handlePokeSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    playerPokemon = data.get('pokemon-name').toLowerCase(); //API stores all pokemon names as lower case
    battleStat = data.get('battle-stat');

    playerStats = await getPokemonData(playerPokemon);
    displayPlayerPokemon(playerStats);
}

//Helper functions
//Checks if the first character of a string is a letter AND capital
function isLetter(letterCheck) {
    return letterCheck !== letterCheck.toLowerCase();
}

function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

//Computer's choice of pokemon, picked by random number 1-898
function getComputerMove() {
    let randomIndex = Math.floor(Math.random() * 898);
    return randomIndex;
};

//API fetch, takes in a reference value to create appropriate URL, constructs an object with the stats
async function getPokemonData(pokeRef) {
    let pokeURL = 'https://pokeapi.co/api/v2/pokemon/' + pokeRef;
    const response = await fetch(pokeURL);

    if  (response.status !== 200) {
        alert('Not a valid pokemon, please try again!');
        pokeInput.value = ''; //clear the text box
        return null;
    } else {
        let data = await response.json(); 
        let statObject = {
            name: data.name,
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defence: data.stats[2].base_stat,
            speed: data.stats[5].base_stat, 
            type: data.types[0].type.name, 
            weight: data.weight, 
            sprite: data.sprites.front_shiny,
        }

        fightButton.style.visibility = 'visible'; //show the fight button only after we have a valid response
        return statObject;
    }
 };
 
 //Displays the pokemon data on a card
 function displayPlayerPokemon(statObject) {
    playerCardName.innerText = capitaliseFirstLetter(statObject.name);
    playerType.innerText = capitaliseFirstLetter(statObject.type);
    playerHp.innerText = `HP: ${statObject.hp}`;
    playerAttack.innerText = `Attack: ${statObject.attack}`;
    playerDefence.innerText = `Defence: ${statObject.defence}`;
    playerSpeed.innerText = `Speed: ${statObject.speed}`;
    playerWeight.innerText = `Weight: ${statObject.weight}`;
    playerSprite.src = `${statObject.sprite}`;
 };

 function displayCompPokemon(statObject) {
    compCardName.innerText = capitaliseFirstLetter(statObject.name);
    compType.innerText = capitaliseFirstLetter(statObject.type);
    compHp.innerText = `HP: ${statObject.hp}`;
    compAttack.innerText = `Attack: ${statObject.attack}`;
    compDefence.innerText = `Defence: ${statObject.defence}`;
    compSpeed.innerText = `Speed: ${statObject.speed}`;
    compWeight.innerText = `Weight: ${statObject.weight}`;
    compSprite.src = `${statObject.sprite}`;
 };

