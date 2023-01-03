//DEFINING DOM SELECTORS
let welcomeHeader = document.querySelector('#player_welcome');
let fightButton = document.querySelector('#fight-button');

const nameFormDiv = document.getElementById('name_form');
const nameForm = document.getElementById('name_entry');
const pokeFormDiv = document.getElementById('pokemon_form');
const pokeForm = document.getElementById('pokemon_entry');
const pokeInput = document.getElementById('pokemon_name');

const totalLi = document.querySelector('#games-played');
const winLi = document.querySelector('#wins');
const lossLi = document.querySelector('#losses');
const drawLi = document.querySelector('#draws');

//INITIALISING VARIABLES
let playerPokemon = '';
let computerPokemon = 0;
let battleStat = 'hp';

const score = {roundCount: 0, winCount: 0, lossCount: 0, drawCount: 0};

//EVENT LISTENERS 
nameForm.addEventListener('submit', handleNameSubmit);
pokeForm.addEventListener('submit', handlePokeSubmit);
fightButton.addEventListener('click', pokemonFight);

//FUNCTIONS
function pokemonFight() {
    computerPokemon = getComputerMove();
    let compBattleValue = getPokemonData(computerPokemon);//Get the computer's pokemon from the API
    //Compare the two battle values
    //Output the winner
}


//Form submission handlers
function handleNameSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const playerName = data.get('player_name');

    if (!isLetter(playerName)) {
        alert('Your name must start with a capital letter, please try again!');
        return null;
    }
      
    welcomeHeader.innerText = `Let's play, ${playerName}!`
    welcomeHeader.style.visibility = 'visible';
    nameFormDiv.style.visibility = 'hidden'; //hides the form after name entry
    pokeFormDiv.style.visibility = 'visible'; //shows the pokemon form once we have a name
}

function handlePokeSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    playerPokemon = data.get('pokemon_name').toLowerCase(); //API stores all pokemon names as lower case
    battleStat = data.get('battle_stat');

    let playerBattleValue = getPokemonData(playerPokemon);
    console.log(playerBattleValue);
    
}

//Helper functions
//Checks if the first character of a string is a letter AND capital
function isLetter(letterCheck) {
    return letterCheck !== letterCheck.toLowerCase();
}

//Computer's choice of pokemon, picked by random number 1-898
function getComputerMove() {
    let randomIndex = Math.floor(Math.random() * 898);
    console.log(randomIndex);
    return randomIndex;
}

//API fetch, takes in a reference value to create appropriate URL
async function getPokemonData(pokeRef) {
    let pokeURL = 'https://pokeapi.co/api/v2/pokemon/' + pokeRef;
    const response = await fetch(pokeURL);

    if  (response.status !== 200) {
        alert('Not a valid pokemon, please try again!');
        pokeInput.value = ''; //clear the text box
        return null;
    } else {
        let data = await response.json(); 
        //console.log(data); //HP: 0, Attack: 1, Defence: 2, Speed: 5
        fightButton.style.visibility = 'visible'; //show the fight button only after we have a valid response
        return data.stats[1].base_stat;
    }
 }

//Error handling 
function handleError(err) {
    console.log('It done broke, Jim!');
    console.log(err);
}

//Calculating the battle result
 async function pokemonFight() {
    let computerPokemon = getComputerMove();
    console.log('Player Selection:', playerPokemon);
    console.log('Computer selection:', computerPokemon);

    let playerPokeData = await getPokemonData(playerPokemon);
    let computerPokeData = await getPokemonData(computerPokemon);
    console.log('Player Pokemon Strength:', playerPokeData);
    console.log('Computer Pokemon Strength:', computerPokeData);

    /*
    score.roundCount++;
    totalLi.innerText = `Games played: ${score.roundCount}`;
    if (playerPokemon < computerPokemon) {
        score.lossCount++;
        lossLi.innerText = `Losses: ${score.lossCount}`;
        console.log('Player loses');
    } else if (playerPokemon > computerPokemon) {
        score.winCount++
        winLi.innerText = `Wins: ${score.winCount}`;
        console.log('Player wins');
    } else {
        score.drawCount++
        drawLi.innerText = `Draws: ${score.drawCount}`;
        console.log('draw');
    }
    */
 }

