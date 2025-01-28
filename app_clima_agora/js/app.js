//Variáveis e seleção de elementos
let apiChave = "7b5bb35bd5655ed16bb29e0a8ffff471";


let cidadeInput = document.querySelector('#cidade-input');
let pesquisar = document.querySelector('#pesquisar');

let cidadeElemento = document.querySelector('#cidade');
let temperaturaElemento = document.querySelector('#temperatura span');
let descricaoElemento = document.querySelector('#descricao');
let climaIconeElemento = document.querySelector('#clima-icone');
let paisElemento = document.querySelector('#pais');
let umidadeElemento = document.querySelector('#umidade span');
let ventoElemento = document.querySelector('#vento span');

let dadosMeteorologicos = document.querySelector('#dados-meteorologicos');

//Funções
let getDadosMeteorologicos = async(cidade) => {

    let apiWheatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=${apiChave}&lang=pt_br`

    let resposta = await fetch(apiWheatherURL);
    let dado = await resposta.json();

    return dado;
}

let mostrarDadosMeteorologicos = async(cidade) => {
    let dado =  await getDadosMeteorologicos(cidade);

    cidadeElemento.innerText = dado.name;
    temperaturaElemento.innerText = parseInt(dado.main.temp);
    descricaoElemento.innerText = dado.weather[0].description;
    climaIconeElemento.setAttribute("src", `http://openweathermap.org/img/wn/${dado.weather[0].icon}.png`);
    paisElemento.setAttribute("src", `https://flagsapi.com/${dado.sys.country}/flat/32.png/`);
    umidadeElemento.innerText = `${dado.main.humidity}%`;
    ventoElemento.innerText = `${dado.wind.speed}km/h`;

    dadosMeteorologicos.classList.remove('esconder');
    
}

//Eventos
pesquisar.addEventListener("click", (e) => {

    e.preventDefault();

    let cidade = cidadeInput.value;
    
    mostrarDadosMeteorologicos(cidade);


})

cidadeInput.addEventListener("keyup", (e) => {

    if(e.code === "Enter") {

        let cidade = e.target.value;

        mostrarDadosMeteorologicos(cidade);
    }
})