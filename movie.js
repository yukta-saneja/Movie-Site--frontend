//we are basically connecting the api that we created reviews-backend in replit to our frontend, refer course video for this file explanation in depth
const url = new URL(location.href); //creating a url object of the url we are at to utilise its parts
const movieId = url.searchParams.get("id") //getting movie id out of the url
const movieTitle = url.searchParams.get("title") //getting movie title out of the url

//is where our api runs
const APILINK = 'https://review-backend.sanejayukta.repl.co/api/v1/reviews/';


const main = document.getElementById("section");
const title = document.getElementById("title"); //is in body, in h3

//to show reviews for: <the actual movie title>, which we fetched from url
title.innerText = movieTitle;

//a permanent tab to post new review
const div_new = document.createElement('div');
//we can either create new html elements as in script.js or as here-> via js
div_new.innerHTML = `
  <div class="row">
    <div class="column">
      <div class="card">
          New Review
          <p><strong>Review: </strong>
            <input type="text" id="new_review" value="">
          </p>
          <p><strong>User: </strong>
            <input type="text" id="new_user" value="">
          </p>
          <p><a href="#" onclick="saveReview('new_review', 'new_user')">💾</a>
          </p>
      </div>
    </div>
  </div>
`
main.appendChild(div_new)

//called for api url
returnReviews(APILINK);

function returnReviews(url) {
  //fetch()  function is used by js to make request, by default GET requests
  fetch(url + "movie/" + movieId).then(res => res.json()) //converting result to json
    .then(function(data) {
      console.log(data);
      data.forEach(review => { //to represent each review fetched for the specific movie as passed in url 
        const div_card = document.createElement('div');
        div_card.innerHTML = `
          <div class="row">
            <div class="column">
              <div class="card" id="${review._id}">
                <p><strong>Review: </strong>${review.review}</p>
                <p><strong>User: </strong>${review.user}</p>
                <p><a href="#"onclick="editReview('${review._id}','${review.review}', '${review.user}')">✏️</a> <a href="#" onclick="deleteReview('${review._id}')">🗑</a></p>
              </div>
            </div>
          </div>
        `

        main.appendChild(div_card);
      });
    });
}

function editReview(id, review, user) {

  const element = document.getElementById(id);
  const reviewInputId = "review" + id
  const userInputId = "user" + id

  element.innerHTML = `
              <p><strong>Review: </strong>
                <input type="text" id="${reviewInputId}" value="${review}">
              </p>
              <p><strong>User: </strong>
                <input type="text" id="${userInputId}" value="${user}">
              </p>
              <p><a href="#" onclick="saveReview('${reviewInputId}', '${userInputId}', '${id}',)">💾</a>
              </p>
  
  `
}

function saveReview(reviewInputId, userInputId, id = "") {
  const review = document.getElementById(reviewInputId).value;
  const user = document.getElementById(userInputId).value;

  if (id) { //if not called by new review posted, then id is passed then PUT request is called, i.e. review is to be updated
    fetch(APILINK + id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "user": user, "review": review })
    }).then(res => res.json())
      .then(res => {
        console.log(res)
        location.reload();
      });
  } else { //else new review to be posted, no id passed, so POST request passed
    fetch(APILINK + "new", {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "user": user, "review": review, "movieId": movieId })
    }).then(res => res.json())
      .then(res => {
        console.log(res)
        location.reload();
      });
  }
}

function deleteReview(id) {
  fetch(APILINK + id, {
    method: 'DELETE'
  }).then(res => res.json())
    .then(res => {
      console.log(res)
      location.reload();
    });
}
