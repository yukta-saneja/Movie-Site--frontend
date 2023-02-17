const APILINK = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=cd0daaee3ecb43dd5e465d2e938d5e43&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=cd0daaee3ecb43dd5e465d2e938d5e43&query=";

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");


returnMovies(APILINK)

//whenever a search triggers this api to produce results
//called it once above for default page of latest movies
function returnMovies(url) {
  fetch(url).then(res => res.json())
    .then(function(data) {
      console.log(data.results);
      //for each result, a new html card is created using js
      data.results.forEach(element => {
        const div_card = document.createElement('div');
        div_card.setAttribute('class', 'card');
        //attributes set because we need to denote elements using css
        const div_row = document.createElement('div');
        div_row.setAttribute('class', 'row');

        const div_column = document.createElement('div');
        div_column.setAttribute('class', 'column');

        const image = document.createElement('img');
        image.setAttribute('class', 'thumbnail');
        image.setAttribute('id', 'image');

        const title = document.createElement('h3');
        title.setAttribute('id', 'title');

        const center = document.createElement('center');

        //entering query parameters along with movie.html to allow message passing between index.html to movie.html
        title.innerHTML = `${element.title}<br><a href="movie.html?id=${element.id}&title=${element.title}">reviews</a>`;
        //so this link leads to movie.html page
        //when we click this link, observe url like this
        //https://movie-site.sanejayukta.repl.co/movie.html?id=315162&title=Puss%20in%20Boots:%20The%20Last%20Wish#
        //u get movie.html?id=, title, %20 is to represent space in url
        
        image.src = IMG_PATH + element.poster_path;

        //heirarchy as in html would have
        center.appendChild(image);
        div_card.appendChild(center);
        div_card.appendChild(title);
        div_column.appendChild(div_card);
        div_row.appendChild(div_column);
        main.appendChild(div_row);
      });
    });
}


form.addEventListener("submit", (e) => {
  e.preventDefault();
  //for new search result, old are removed from section
  main.innerHTML = '';
  const searchItem = search.value;
  if (searchItem) {
    returnMovies(SEARCHAPI + searchItem);
    //search bar emptied after results fetched
    search.value = "";
  }
})
