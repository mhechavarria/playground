let arrHeroes = [];

function getData() {
  const url = "/marvel.json";
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      arrHeroes = res.data.results;
      console.log(arrHeroes);
      const sortedHeroes = arrHeroes.sort(
        (a, b) => new Date(b.modified) - new Date(a.modified)
      );
      const container = document.getElementById("container");
      renderItems(sortedHeroes, container);
    })
    .catch((err) => console.log(err));
}

function renderItems(arrHeroes) {
  container.innerHTML = "";
  arrHeroes.map((item) => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("heroContainer")
    itemElement.innerHTML = `
        <h2>${item.name}</h2>
        <p class="heroDescription">${item.description? item.description : "No information found"}</p>
        <p>${item.modified}</p>
        <img src=${item.thumbnail.path + ".jpg"} alt="Hero Image not found">
        `;
    container.appendChild(itemElement);
  });
}

getData();
