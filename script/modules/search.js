export default function initSearch(){
  const inputSearch = document.querySelector('[data-search="input"]');
  const buttonSearch = document.querySelector('[data-search="button"]');

  
  async function consumirAPI(){
    const resposta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
    const dadosJson = await resposta.json();

    return dadosJson;
  }

  let consumoAPI = consumirAPI();
    console.log(consumoAPI)

}