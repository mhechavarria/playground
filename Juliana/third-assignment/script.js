const nav = document.querySelector("#nav");
const open = document.querySelector("#open");
const close = document.querySelector("#close");
const loadHeroesBtn = document.querySelector('#loadHeroes');
const loadSortedHeroesBtn = document.querySelector('#loadSortedHeroes');
const heroesContainer = document.getElementById('heroes-list');
const sortedHeroesContainer = document.getElementById('sorted-heroes-list');
const comicsContainer = document.getElementById('comics-list');
let arrHeroes = [];
let arrComics = [];

document.addEventListener('DOMContentLoaded', obtainData);
open.addEventListener("click", () => nav.classList.add("visible"));
close.addEventListener("click", () => nav.classList.remove("visible"));

loadHeroesBtn.addEventListener('click', () => {
    replaceContainer(sortedHeroesContainer, heroesContainer);
    document.querySelector('#loadHeroes').style.display = 'none';
    document.querySelector('#loadSortedHeroes').style.display = 'flex';    
});
loadSortedHeroesBtn.addEventListener('click', () => {
    replaceContainer(heroesContainer, sortedHeroesContainer);
    sortHeroes();
    showHeroes(arrSortedHeroes, sortedHeroesContainer);
    document.querySelector('#loadHeroes').style.display = 'flex';
    document.querySelector('#loadSortedHeroes').style.display = 'none';
});

function showData(){
    const url = '../../mock/marvel.json';
    fetch(url)
        .then(res => res.json())    
        .then((info) => { 
            arrHeroes = info.data.results;
            showHeroes(arrHeroes, heroesContainer);       
        })
    .catch((error) => console.log(error));
};

function showHeroes(arr, container){
    let html = '';
    arr.map((item)=>{
        const dateStr = new Date(item.modified);
        const date = `${dateStr.getMonth()}-${dateStr.getDay()}-${dateStr.getFullYear()}`;

        html += `
            <div>
                <h2>${item.name}</h2>
                <p>Release: ${date}</p>
                <a href="${item.urls[0].url}" target="_blank">Read more</a>
            </div>
        `;
    });
    container.innerHTML = html;
};

function sortHeroes(){
    const sortHeroes = (x,y) => {
        const dateX = new Date(x.modified);
        const dateY = new Date(y.modified);
        return dateX.getTime() - dateY.getTime();
    }
    arrSortedHeroes = arrHeroes.sort(sortHeroes);
    return arrSortedHeroes;
}

function replaceContainer(initialContainer, newContainer){
    initialContainer.replaceWith(newContainer);
}

function obtainData(){
    const url = '';
    fetch(url)
        .then(res => res.json())    
        .then((info) => { 
            arrComics = info.data.results;
            showComics(arrComics, comicsContainer);     
    })
    .catch((error) => console.log(error));
}

function showComics(arr, container){
    let html = '';
    arr.map((item)=>{
        html += `
            <div>
                <div class="image-container">
                    <img src="${item.thumbnail["path"] + "." + item.thumbnail["extension"]}" alt="${item.title} image"></img>
                </div>
                <div class="title-container">
                    <h2>${item.title}</h2>
                </div>
            </div>           
        `;
    });
    container.innerHTML = html;
};

showData();