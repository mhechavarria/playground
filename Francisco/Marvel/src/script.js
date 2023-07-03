const apiKey = "9023e5031b526df7ec7abd1984db610e";
const ts = "1";
const hash = "bdaa8452ccbd7a0e73cb8fc0b7dabfb1";
const url = `https://gateway.marvel.com:443/v1/public/characters?apikey=${apiKey}&ts=${ts}&hash=${hash}`;
const nav = document.getElementById("nav");
const buttonOn = document.getElementById("button-on");
const buttonOff = document.getElementById("button-off");

buttonOn.addEventListener("click", () => nav.classList.add("open"));
buttonOff.addEventListener("click", () => nav.classList.remove("open"));

async function fetchData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const results = data.data.results;

    results.sort((a, b) => {
      const dataA = new Date(a.modified);
      const dataB = new Date(b.modified);
      return dataA - dataB;
    });

    results.forEach((character) => {
     
      console.log(character.name, character.modified);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

window.onload = function () {
  const buttonSeeMore = document.getElementById("buttonSeeMore");
  if (buttonSeeMore) {
    buttonSeeMore.addEventListener("click", () => {
      localStorage.setItem("buttonClicked", "true");
      window.location.href = "characters.html";
    });
  } else {
    const buttonClicked = localStorage.getItem("buttonClicked");
    if (buttonClicked) {
      fetchData();
      localStorage.removeItem("buttonClicked");
    }
  }
};
