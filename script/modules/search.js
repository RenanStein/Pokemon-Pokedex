export default function initSearch(){
  const inputSearch = document.querySelector('[data-search="input"]');
  const buttonSearch = document.querySelector('[data-search="button"]');

  
  async function pesquisar(){
    const resposta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
    const dadosJson = await resposta.json();

    console.log(dadosJson)
  }

}