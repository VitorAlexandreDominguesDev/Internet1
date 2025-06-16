const pokemonImage = document.querySelector('#pokemon-image');
const guessInput = document.querySelector('#guess-input');
const submitBtn = document.querySelector('#submit-btn');
const nextBtn = document.querySelector('#next-btn');

let pokemonName = '';


async function carregarPokemon() {
  const id = Math.floor(Math.random() * 150) + 1;
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;

  try {
    const resposta = await fetch(apiUrl);
    const dados = await resposta.json();
    pokemonName = dados.name.toLowerCase();

    pokemonImage.src = imageUrl;
    pokemonImage.classList.remove('revealed');

    guessInput.value = '';
    guessInput.disabled = false;
    submitBtn.disabled = false;
    nextBtn.disabled = true;
  } catch (erro) {
    console.error('Erro ao carregar Pokémon:', erro);
  }
}

function verificarResposta() {
  const respostaUsuario = guessInput.value.trim().toLowerCase();

  if (respostaUsuario === pokemonName) {
    pokemonImage.classList.add('revealed');
  }

  guessInput.disabled = true;
  submitBtn.disabled = true;
  nextBtn.disabled = false;
}


submitBtn.addEventListener('click', verificarResposta);


nextBtn.addEventListener('click', carregarPokemon);


window.addEventListener('load', carregarPokemon);
