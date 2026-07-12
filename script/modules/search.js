export default function initSearch(){
  const inputSearch = document.querySelector('[data-search="input"]');
  const buttonSearch = document.querySelector('[data-search="button"]');
  const pokemonLista = document.querySelector('[data-pokemon="lista"]');
  const divErr = document.querySelector('.message-err');
  const divButton = document.querySelector('.button-more');

   const colorTypes = {
    normal: "#aaa67f93",
    fire: "#f57c3191",
    water: "#6493eb85",
    electric: "#f9cd308f",
    grass: "#74cb488f",
    ice: "#9ad6df86",
    fighting: "#c1223a8a",
    poison: "#a43e9d86",
    ground: "#DEC16B",
    flying: "#a891ec8c",
    psychic: "#fb55848e",
    bug: "#a8b72398",
    rock: "#b69e3191",
    ghost: "#70559b85",
    dragon: "#7037ff94",
    dark: "#75574c8a",
    steel: "#b7b9d093",
    fairy: "#e69eac8a"
  };

   function primeiraMaiuscula(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }

    function criarPokemon(numero, nome, imagem, tipo, cor) {
    const button = document.createElement("button");
    button.classList.add("pokemon");

    button.innerHTML = `
      <div class="pokemon-img" style="background-color:${cor}">
        <img src="${imagem}" alt="${nome}">
      </div>

      <div class="pokemon-info">
        <span>#${String(numero).padStart(3, "0")}</span>
        <p>${nome}</p>
        <img src="img/icons-type/${tipo}.svg" alt="${tipo}">
      </div>
    `;

    return button;
  }

  async function pesquisarPoke(pokemonEscolhido){
  console.log(inputSearch.value)
    try {
    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonEscolhido}/`);
    const detalhes = await resposta.json();
    console.log(resposta)
    
    return {
          number: detalhes.id,
          name: primeiraMaiuscula(detalhes.name),
          img: detalhes.sprites.other["official-artwork"].front_default,
          type: detalhes.types[0].type.name
        };
      } catch(err) {
        divErr.style.display = 'grid';
        divButton.style.display = 'none';
        console.log(err);
      }
  }

   async function adicionarPoke() {
    pokemonLista.innerHTML = "";
    divErr.style.display = 'none';

    const pokemonEscolhidos = inputSearch.value;
    const pokemons = await pesquisarPoke(pokemonEscolhidos);

    console.log(pokemons)
      pokemonLista.appendChild(
        criarPokemon(
          pokemons.number,
          pokemons.name,
          pokemons.img,
          pokemons.type,
          colorTypes[pokemons.type]
        )
      );
  }

  buttonSearch.addEventListener('click', adicionarPoke);
}