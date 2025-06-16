

const API_URL = 'https://pokeapi.co/api/v2/pokemon/';


const pokemonInput = document.getElementById('pokemonInput');
const searchBtn = document.getElementById('searchBtn');
const pokemonCard = document.getElementById('pokemonCard');
const loading = document.getElementById('loading');
const error = document.getElementById('error');


const pokemonName = document.getElementById('pokemonName');
const pokemonNumber = document.getElementById('pokemonNumber');
const pokemonSprite = document.getElementById('pokemonSprite');
const pokemonHeight = document.getElementById('pokemonHeight');
const pokemonWeight = document.getElementById('pokemonWeight');
const pokemonTypes = document.getElementById('pokemonTypes');


async function fetchPokemon(pokemon) {
    try {
        
        showLoading();
        
        
        const response = await fetch(`${API_URL}${pokemon.toLowerCase()}`);
        
        
        if (!response.ok) {
            throw new Error('Pokémon não esta na base de dados');
        }
        
        
        const data = await response.json();
        
        
        displayPokemon(data);
        
    } catch (err) {
        
        showError();
    }
}


function displayPokemon(data) {

    pokemonName.textContent = data.name;
    pokemonNumber.textContent = `#${data.id.toString().padStart(3, '0')}`;
    pokemonSprite.src = data.sprites.front_default;
    pokemonSprite.alt = `Sprite de ${data.name}`;
    pokemonHeight.textContent = `${data.height / 10} m`;
    pokemonWeight.textContent = `${data.weight / 10} kg`;
    

    const types = data.types.map(type => type.type.name).join(', ');
    pokemonTypes.textContent = types;
    

    hideLoading();
    hideError();
    pokemonCard.classList.remove('hidden');
}

function showLoading() {
    loading.classList.remove('hidden');
    pokemonCard.classList.add('hidden');
    error.classList.add('hidden');
}

function hideLoading() {
    loading.classList.add('hidden');
}

function showError() {
    hideLoading();
    pokemonCard.classList.add('hidden');
    error.classList.remove('hidden');
}

function hideError() {
    error.classList.add('hidden');
}

searchBtn.addEventListener('click', () => {
    const pokemon = pokemonInput.value.trim();
    if (pokemon) {
        fetchPokemon(pokemon);
    }
});

pokemonInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const pokemon = pokemonInput.value.trim();
        if (pokemon) {
            fetchPokemon(pokemon);
        }
    }
});


fetchPokemon('charizard');