const publicKey = "";
const privateKey = "";

const ts = "";
const hash = "";

const heroesUrl = `https://gateway.marvel.com:443/v1/public/characters?apikey=${publicKey}&ts=${ts}&hash=${hash}`;
const comicsUrl = `https://gateway.marvel.com:443/v1/public/comics?apikey=${publicKey}&ts=${ts}&hash=${hash}`;

const getHeroes = async () => {
  try {
    const res = await fetch(heroesUrl);
    const data = await res.json();
    const heroesArr = await data.data.results;
    const sortedHeroes = heroesArr.sort(
      (a, b) => new Date(b.modified) - new Date(a.modified)
    );
    const heroesContainer = document.getElementById("heroesContainer");
    renderHeroes(sortedHeroes, heroesContainer);
  } catch (error) {
    console.log(error);
  }
};
const getComics = async () => {
  try {
    const res = await fetch(comicsUrl);
    const data = await res.json();
    const comicsArr = await data.data.results;
    console.log(comicsArr);
    const sortedComics = comicsArr.sort(
      (a, b) => new Date(b.modified) - new Date(a.modified)
    );
    const comicsContainer = document.getElementById("comicsContainer");
    renderComics(sortedComics, comicsContainer);
  } catch (error) {
    console.log(error);
  }
};

function renderHeroes(heroesArr, heroesContainer) {
  heroesContainer.innerHTML = "";
  heroesArr.map((item) => {
    const date = formatDate(item.modified);
    const itemElement = document.createElement("div");
    itemElement.classList.add("heroCard");
    itemElement.innerHTML = `
        <h2>${item.name}</h2>
        <p>${date}</p>
        <img class="heroesImg" src=${
          item.thumbnail.path + ".jpg"
        } alt="Hero Image not found">
        `;
    heroesContainer.appendChild(itemElement);
  });
}

function renderComics(comicsArr, comicsContainer) {
  comicsContainer.innerHTML = "";
  comicsArr.map((item) => {
    const date = formatDate(item.modified);
    const itemElement = document.createElement("div");
    itemElement.classList.add("comicCard");
    itemElement.innerHTML = `
        <h2 class="cardTitle">${item.title}</h2>
        <p>${date}</p>
        <img class="comicImg" src=${
          item.thumbnail.path + ".jpg"
        } alt="Hero Image not found">
        `;
    comicsContainer.appendChild(itemElement);
  });
}

function formatDate(date) {
  const formatedDate = new Date(date);
  const d = formatedDate.getDate();
  const m = formatedDate.getMonth() + 1;
  const y = formatedDate.getFullYear();
  if (formatedDate != "Invalid Date") {
    return `${d}/${m}/${y}`;
  } else {
    return "Date not found";
  }
}

getHeroes();
getComics();
