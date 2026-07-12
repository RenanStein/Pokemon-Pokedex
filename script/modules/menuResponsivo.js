import initListTypes from "./listTypes.js";
import initPokemon from "./pokemon.js";

export default function menuResponsivo(){
  const buttonMenu = document.querySelector('[data-menu]');
  const listaMenu = document.querySelector('[data-menu="dropdown"]')
  const listMenuItens = document.querySelectorAll('[data-menu="dropdown"] li');


  function ativarMenu(){
    listaMenu.classList.toggle('ativar-menu');
  }

  listMenuItens.forEach(menu => {
  ['touchstart', 'click'].forEach(userEvent => {
    menu.addEventListener(userEvent, handleClick);
  })
})

function handleClick(event){
  event.preventDefault();
  listaMenu.classList.remove('ativar-menu');
  let valorTipo = event.target.innerText.toLowerCase()

  if(valorTipo === 'all'){
    initPokemon(valorTipo)
  } else {
    initListTypes(valorTipo)
  }
}

  buttonMenu.addEventListener('click', ativarMenu);
}