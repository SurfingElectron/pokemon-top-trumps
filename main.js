//DEFINING VARIABLES
let playerNameInput = document.querySelector("#player-name");
let welcomeHeader = document.querySelector(`#player-welcome`);
let fightButton = document.querySelector("#fight-button");
let pokemonNameInput = document.querySelector("#pokemon-name");
let playerPokemon ;
let computerPokemon ;

const score = {roundCount: 0, winCount: 0, lossCount: 0, drawCount: 0};

const totalLi = document.querySelector('#games-played');
const winLi = document.querySelector('#wins');
const lossLi = document.querySelector('#losses');
const drawLi = document.querySelector('#draws');

//EVENT LISTENERS - 
playerNameInput.addEventListener(`keydown`, enterName);
pokemonNameInput.addEventListener(`keydown`, handlePlayerPokemon);
fightButton.addEventListener(`click`, pokemonFight);

//FUNCTIONS
//Player name, posts to webpage
function enterName(e){ 
    if (e.key == `Enter`){
    welcomeHeader.innerText = `Welcome  ${playerNameInput.value}, are you ready to fight? `;
    }
}

//Player's choice of pokemon, assigns to playerPokemon variable
function handlePlayerPokemon(e){ 
    if (e.key == `Enter`){
    playerPokemon = pokemonNameInput.value;
    }   
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

