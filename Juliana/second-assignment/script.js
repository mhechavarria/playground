const nav = document.querySelector("#nav");
const open = document.querySelector("#open");
const close = document.querySelector("#close");
const loadHeroesBtn = document.querySelector('#loadHeroes');
const loadSortedHeroesBtn = document.querySelector('#loadSortedHeroes');
const heroesContainer = document.getElementById('heroes-list');
const sortedHeroesContainer = document.getElementById('sorted-heroes-list');
let arrHeroes = [];

open.addEventListener("click", () => nav.classList.add("visible"));
close.addEventListener("click", () => nav.classList.remove("visible"));

loadHeroesBtn.addEventListener('click', () => {
    undoReplaceHeroes();
    document.querySelector('#loadHeroes').style.display = 'none';
    document.querySelector('#loadSortedHeroes').style.display = 'flex';    
});

loadSortedHeroesBtn.addEventListener('click', () => {
    replaceHeroes();
    document.querySelector('#loadHeroes').style.display = 'flex';
    document.querySelector('#loadSortedHeroes').style.display = 'none';
});

function showHeroes(){
    arrHeroes.forEach((item)=>{
    let heroesList = document.createElement('div');
    let heroeName = document.createElement('h2');
    let heroeRelease = document.createElement('p');
    let heroeLink = document.createElement('a');

    const dateStr = item.modified,        
    [yyyy,mm,dd] = dateStr.split(/[/:\-T]/)
    const date = `${dd}-${mm}-${yyyy}`;
    
    heroeName.textContent = item.name;
    heroeRelease.textContent = `Release: ${date}`;
    heroeLink.href = item.urls[0].url;
    heroeLink.target = "_blank";
    heroeLink.textContent = "Read more";
     
    heroesList.appendChild(heroeName);
    heroesList.appendChild(heroeRelease);
    heroesList.appendChild(heroeLink);

    heroesContainer.appendChild(heroesList);        
})
}

function showSortedHeroes(){
    arrHeroes.forEach((item)=>{
    let heroesList = document.createElement('div');
    let heroeName = document.createElement('h2');
    let heroeRelease = document.createElement('p');
    let heroeLink = document.createElement('a');

    const dateStr = item.modified,        
    [yyyy,mm,dd] = dateStr.split(/[/:\-T]/)
    const date = `${dd}-${mm}-${yyyy}`;

    heroeName.textContent = item.name;
    heroeRelease.textContent = `Release: ${date}`;
    heroeLink.href = item.urls[0].url;
    heroeLink.target = "_blank";
    heroeLink.textContent = "Read more";

    heroesList.appendChild(heroeName);
    heroesList.appendChild(heroeRelease);
    heroesList.appendChild(heroeLink);

    sortedHeroesContainer.appendChild(heroesList);        
})
}

function replaceHeroes(){
    heroesContainer.replaceWith(sortedHeroesContainer);
    showSortedData();
}

function undoReplaceHeroes(){
    sortedHeroesContainer.replaceWith(heroesContainer);
    showData();
}

function sortHeroes(){
    const sortHeroes = (x,y) => x.modified.localeCompare(y.modified);
    arrHeroes = arrHeroes.sort(sortHeroes);
    return arrHeroes;
}

function showData(){
    fetch('./marvel.json')
    .then(res => res.json())    
    .then((info) => { 
        arrHeroes = info.data.results;
        showHeroes();       
    })
    .catch((error) => console.log(error));
}

function showSortedData(){
    fetch('./marvel.json')
    .then(res => res.json())    
    .then((info) => { 
        arrHeroes = info.data.results;
        sortHeroes()
        showSortedHeroes();       
    })
    .catch((error) => console.log(error));
}

showData();