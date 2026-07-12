export default function initPokemon(valorAll) {
  const pokemonLista = document.querySelector('[data-pokemon="lista"]');
  const button = document.querySelector('[data-button="more"]');
  const buttonAll = document.querySelector('[data-type="unknown"]');
  const divErr = document.querySelector('.message-err');
  const divButton = document.querySelector('.button-more');
  
  let offset = 0;
  const limit = 9;

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


  let todosPokemons = [];

  async function consumirAPI() {
    try {
    const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);

    if (!resposta.ok) {
      throw new Error(`Erro ${resposta.status}`);
    }
    const dados = await resposta.json();

    const detalhes = await Promise.all(
      dados.results.map(async (pokemon) => {
        const respostaDetalhe = await fetch(pokemon.url);
        if (!respostaDetalhe.ok) {
          throw new Error(`Erro ${respostaDetalhe.status}`);
          }
        const detalhe = await respostaDetalhe.json();

        return {
          number: detalhe.id,
          name: primeiraMaiuscula(detalhe.name),
          img: detalhe.sprites.other["official-artwork"].front_default,
          type: detalhe.types[0].type.name
        };
      })
    );

    return detalhes;
  } catch(err) {
    divErr.style.display = 'grid';
    divButton.style.display = 'none';
    console.log(err);
    return [];
  }
  }

//adicionar um novo pokemon clicando no botão more
  async function adicionarPokemons(retornoPokemonsApi) {
    const pokemons = await consumirAPI();

    pokemons.forEach((pokemon) => {
      pokemonLista.appendChild(
        criarPokemon(
          pokemon.number,
          pokemon.name,
          pokemon.img,
          pokemon.type,
          colorTypes[pokemon.type]
        )
      );
    });

    offset += limit;
  }
  button.addEventListener("click", adicionarPokemons);


    async function resetPoke(retornoPokemonsApi) {
    console.log('reste')

    pokemonLista.innerHTML = "";
    offset = 0;
    
    const pokemons = await consumirAPI();

    pokemons.forEach((pokemon) => {
      pokemonLista.appendChild(
        criarPokemon(
          pokemon.number,
          pokemon.name,
          pokemon.img,
          pokemon.type,
          colorTypes[pokemon.type]
        )
      );
    });

    offset += limit;
  }

  if (valorAll !== undefined) {
  resetPoke();
} else {
  adicionarPokemons();
}

  buttonAll.addEventListener('click', resetPoke);
}