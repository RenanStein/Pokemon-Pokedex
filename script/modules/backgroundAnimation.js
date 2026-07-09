export default function initBackgroundAnimation(){
    const imgPokebola = document.querySelector('[data-pokebola="pokebola"]');
    const imgUltraBall = document.querySelector('[data-pokebola="ultra-ball"]');
    const backgroundIntroduction = document.querySelector('.background');

    function changeBackground() {
        backgroundIntroduction.style.backgroundImage = "url('../../img/bg-blue.svg')";
    }
    console.log('teste')
}

