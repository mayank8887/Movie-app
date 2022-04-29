let container = document.getElementById("container");
let container1 = document.getElementById("container1");
let container2 = document.getElementById("container2");

async function searchMovies() {
  try {
    var movies = document.getElementById("query").value;

    let res = await fetch(
      `https://www.omdbapi.com/?apikey=c6788d27&s=${movies}`
    );

    let data = await res.json();
    console.log(data);

    return data.Search;
  } catch (err) {
    console.log("err:", err);
    error();
  }
}

function error() {
  container2.innerHTML = "";
  let div = document.createElement("div");

  let image = document.createElement("img");
  image.src = "https://www.vascon.com/images/404/hanging_404.gif";

  div.append(image);
  container1.append(div);
}

async function main() {
  let data = await searchMovies();
  if (data === undefined) {
    return false;
  }
  appendData(data);
}

let moviess = document.getElementById("Movies");

function appendData(Movies) {
  container.innerHTML = "";
  moviess.innerHTML = "";
  container1.innerHTML = "";
  container2.innerHTML = "";
  Movies.forEach(function (elem) {
    let p = document.createElement("p");
    p.innerText = elem.Title;
    p.addEventListener("click", check);
    moviess.append(p);

    async function check(event) {
      let res = await fetch(
        `https://www.omdbapi.com/?apikey=c6788d27&t=${p.innerText}`
      );

      let data = await res.json();

      append1(data);
    }

    function append1(data) {
      container.innerHTML = "";
      container1.innerHTML = "";
      container2.innerHTML = "";

      let div = document.createElement("div");

      let img = document.createElement("img");
      img.src = data.Poster;

      let title = document.createElement("p");
      title.innerText = data.Title;

      let releasedate = document.createElement("p");
      releasedate.innerText = data.Released;

      let rating = document.createElement("p");
      rating.innerText = data.imdbRating;

      let recommend = document.createElement("h2");
      if (data.imdbRating > 8.5) {
        recommend.innerText = "recommended";
      }

      div.append(img, title, releasedate, rating, recommend);
      container2.append(div);
    }

    let div = document.createElement("div");

    let img = document.createElement("img");
    img.src = elem.Poster;

    let title = document.createElement("p");
    title.innerText = elem.Title;

    let releasedate = document.createElement("p");
    releasedate.innerText = elem.Year;

    function ratingg(min, max) {
      return Math.random() * (max - min) + min;
    }

    let value = ratingg(4, 10);
    value = value.toFixed(1);

    let rating = document.createElement("p");
    rating.innerText = `IMDb rating - ${value}/10`;

    let recommend = document.createElement("h2");
    if (value > 8.5) {
      recommend.innerText = "recommended";
    }

    div.append(img, title, releasedate, rating, recommend);

    container.append(div);
  });
}
let timerID;

function debounce(func, delay) {
  if (timerID) {
    clearTimeout(timerID);
  }
  timerID = setTimeout(function () {
    func();
  }, delay);
}

let key1 = "1b4bccc5da33629f8c791657ae83bd90";

async function TrendingMovies() {
  try {
    let res = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${key1}`
    );

    let data = await res.json();
    console.log(data.results);

    appnedthisData(data.results);
  } catch (err) {
    console.log("err:", err);
    error();
  }
}

function appnedthisData(data) {
  container.innerHTML = "";
  container1.innerHTML = "";
  container2.innerHTML = "";
  data.forEach(function (elem) {
    let div = document.createElement("div");

    let image = document.createElement("img");
    image.src = `https://image.tmdb.org/t/p/w500/${elem.poster_path}`;

    let name = document.createElement("p");
    name.textContent = elem.original_title;

    let rating = document.createElement("p");
    rating.textContent = elem.vote_average;
    div.append(image, name, rating);
    container.append(div);
  });
}
