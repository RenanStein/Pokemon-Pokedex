export default function initListTypes(){
  const divErr = document.querySelector('.message-err');
  const divButton = document.querySelector('.button-more');
  const pokemonLista = document.querySelector('[data-pokemon="lista"]');
  const buttonAll = document.querySelector('[data-type="unknown"]');
  const buttonNormal = document.querySelector('[data-type="normal"]');
  const buttonFighting = document.querySelector('[data-type="fighting"]');
  const buttonFlying = document.querySelector('[data-type="flying"]');
  const buttonPoison = document.querySelector('[data-type="poison"]');
  const buttonGround = document.querySelector('[data-type="ground"]');
  const buttonRock = document.querySelector('[data-type="rock"]');
  const buttonBug = document.querySelector('[data-type="bug"]');
  const buttonGhost = document.querySelector('[data-type="ghost"]');
  const buttonSteel = document.querySelector('[data-type="steel"]');
  const buttonFire = document.querySelector('[data-type="fire"]');
  const buttonWater = document.querySelector('[data-type="water"]');
  const buttonGrass = document.querySelector('[data-type="grass"]');
  const buttonElectric = document.querySelector('[data-type="electric"]');
  const buttonPsychic = document.querySelector('[data-type="psychic"]');
  const buttonIce = document.querySelector('[data-type="ice"]');
  const buttonDragon = document.querySelector('[data-type="dragon"]');
  const buttonDark = document.querySelector('[data-type="dark"]');
  const buttonFairy = document.querySelector('[data-type="fairy"]');

   let offset = 0;
  const limit = 9;

    const colorTypes = {
    normal: "#aaa67f93",
    fire: "#f57c3191",
    water: "#6493eb85",
    electric: "#f9cd308f",
    grass: "#74cb488f",
    ice: "#9ad6df86",
    fighting: "#c1223993",
    poison: "#a43e9e8f",
    ground: "#dec16b91",
    flying: "#a891ec91",
    psychic: "#fb558490",
    bug: "#a7b7238f",
    rock: "#b69e318f",
    ghost: "#70559b8f",
    dragon: "#7037ff91",
    dark: "#75574c91",
    steel: "#b7b9d093",
    fairy: "#e69eac91",
  };

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

   function primeiraMaiuscula(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }

 async function requestAPI(type) {
  try {
    const resposta = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
    if (!resposta.ok) {
      throw new Error(`Erro ${resposta.status}`);
    }
    const dados = await resposta.json();

    const dadosCompleto = await Promise.all(
      dados.pokemon.map(async (poke) => {
        const respostaDetalhe = await fetch(poke.pokemon.url);
        if (!respostaDetalhe.ok) {
          throw new Error(`Erro ${respostaDetalhe.status}`);
        }
        const detalhe = await respostaDetalhe.json();

        return {
          number: detalhe.id,
          name: detalhe.name,
          img: detalhe.sprites.other["official-artwork"].front_default,
          type: detalhe.types[0].type.name,
        };
      })
    );

    return dadosCompleto;
  } catch(err) {
    divErr.style.display = 'grid';
    divButton.style.display = 'none';
    console.log(err);
    return [];
  }
  }

  async function filtrarPokemons(event) {
    pokemonLista.innerHTML = "";

    const type = event.currentTarget.dataset.type;

    const pokemons = await requestAPI(type);

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
  }
  buttonAll.addEventListener("click", filtrarPokemons);
  buttonNormal.addEventListener("click", filtrarPokemons);
  buttonFighting.addEventListener("click", filtrarPokemons);
  buttonFlying.addEventListener("click", filtrarPokemons);
  buttonPoison.addEventListener("click", filtrarPokemons);
  buttonGround.addEventListener("click", filtrarPokemons);
  buttonRock.addEventListener("click", filtrarPokemons);
  buttonBug.addEventListener("click", filtrarPokemons);
  buttonGhost.addEventListener("click", filtrarPokemons);
  buttonSteel.addEventListener("click", filtrarPokemons);
  buttonFire.addEventListener("click", filtrarPokemons);
  buttonWater.addEventListener("click", filtrarPokemons);
  buttonGrass.addEventListener("click", filtrarPokemons);
  buttonElectric.addEventListener("click", filtrarPokemons);
  buttonPsychic.addEventListener("click", filtrarPokemons);
  buttonIce.addEventListener("click", filtrarPokemons);
  buttonDragon.addEventListener("click", filtrarPokemons);
  buttonDark.addEventListener("click", filtrarPokemons);
  buttonFairy.addEventListener("click", filtrarPokemons);

}