export default function initBackgroundAnimation(){
    const imgPokebola = document.querySelector('[data-pokebola="pokebola"]');
    const imgUltraBall = document.querySelector('[data-pokebola="ultra-ball"]');
    const background = document.querySelector('.background');
    const introductionSpan = document.querySelector('.introduction-text-span ');
    const bg1 = document.querySelector(".bg1");
    const bg2 = document.querySelector(".bg2");
    const images = [
        "../.././img/bg-red.svg",
        "../.././img/bg-blue.svg"
    ];

    const span = [
        "#d60000",
        "#2b53a5"
    ];
    
    let indice = 0;
    let color = 0;

    setInterval(()=> {
        indice++;
        color++

        if(indice >= images.length){
            indice = 0;
        }
        
        if(color >= span.length){
            color = 0;
        }

        setTimeout(() => {
        imgUltraBall.classList.toggle('poke-ativo');
        imgPokebola.classList.toggle('poke-ativo');
        background.style.backgroundImage = `url("${images[indice]}")`;
        introductionSpan.style.color = span[color];

    }, 100); // mesmo tempo da transição
        animar()
    }, 10000)

    function animar() {
    void background.offsetWidth;
    background.classList.add("fade");
}
}

