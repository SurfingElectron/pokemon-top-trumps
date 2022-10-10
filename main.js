//DEFINING VARIABLES
let welcomeHeader = document.querySelector('#player-welcome');
let fightButton = document.querySelector("#fight-button");

const nameForm = document.getElementById('name_entry');
const nameFormDiv = document.querySelector('.name_form');

const totalLi = document.querySelector('#games-played');
const winLi = document.querySelector('#wins');
const lossLi = document.querySelector('#losses');
const drawLi = document.querySelector('#draws');

let playerPokemon = "";
let computerPokemon = 0;

const score = {roundCount: 0, winCount: 0, lossCount: 0, drawCount: 0};

//EVENT LISTENERS - 
fightButton.addEventListener('click', pokemonFight);
nameForm.addEventListener('submit', handleSubmit);

//FUNCTIONS
//Form submission handler
function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const playerName = data.get('player_name');
    playerPokemon = data.get('pokemon_name');
    console.log(playerName, playerPokemon);

    if (!isLetter(playerName)) {
        alert("Your name must start with a capital letter, please try again!");
        return null;
    }
      
    welcomeHeader.innerText = `Let's play, ${playerName}!`
    nameFormDiv.style.visibility = 'hidden'; //hides the form after name entry

}
  
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
    let data = await response.json(); 
    console.log(data); //.stats[1].base_stat
    return data.stats[1].base_stat;
    }


//Calculating the battle result
 async function pokemonFight() {
    computerPokemon = getComputerMove();
    console.log('Player Selection:', playerPokemon);
    console.log('Computer selection:', computerPokemon);
    let playerPokemon = await getPokemonData(playerPokemon);
    let computerPokemon = await getPokemonData(computerPokemon);
    console.log('Player Pokemon Strength:', playerPokemon);
    console.log('Computer Pokemon Strength:', computerPokemon);

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
 }

