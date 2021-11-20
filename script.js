// // Input from User Search
//// const search = document.querySelector('.search-button');

//// search.addEventListener('click', function(){

////     const inputKeyword = document.querySelector('.input-keyword');  // user input value
    
////     showLoading0(true) // fetch clicked
    
////     fetch('http://www.omdbapi.com/?apikey=2459718a&s=' + inputKeyword.value)    //fetch API
////         .catch(error => console.log(error))         // if request rejected
////         .finally(() => showLoading0(false))          // after accepted
////        .then(response => response.json())          // return Promise data type
////         .then(response => {
//             // storage variable
////             const movies = response.Search;
////             let cards = '';

//             // iterate through the movies list
////             movies.forEach(x => cards += showCards(x));

//             // Put all of them in movie-container
////             document.querySelector('.movie-container').innerHTML = cards;

            
//             // When Details Button Clicked
////             const modalBtn = document.querySelectorAll('.modal-detail-button');

//             // Iterate through all of the button
////             modalBtn.forEach(btn => {
////                 btn.addEventListener('click', function(){
//                     // imdb ID data storage
// //                    const imdbID = this.dataset.imdbid;
//                     // Fetch Movie Details API
// //                    showLoading1(true);
////                     fetch('http://www.omdbapi.com/?apikey=2459718a&i=' + imdbID)
////                         .finally(() => showLoading1(false))
////                         .then(response => response.json())
////                         .then(movie => {
//                             // movie detail storage
////                             const detail = showMovieDetail(movie);
//                             // put it in modal body
////                             document.querySelector('.modal-body').innerHTML = detail;
////                         })
////                         .catch(error => console.log(error));    // if request rejected

////                 }); // when button clicked
////             });
////         });
//// });

//! SearchBtn Event
const searchBtn = document.querySelector('.search-button');
searchBtn.addEventListener('click', async function(){
    // Movies Storage Variable
    const inputKeyword = document.querySelector('.input-keyword');
    // Asynchronous with await Keyword
    const movies = await getMovies(inputKeyword.value);
    // Put the cards inside the movie-container
    updateUI(movies);
});

//! Event Binding
document.addEventListener('click', async function(e){
    // If the user click the modal-detail-button
    if(e.target.classList.contains('modal-detail-button')){
        const imdbID = e.target.dataset.imdbid;
        const movieDetails = await getMovieDetails(imdbID);
        updateUIDetails(movieDetails);
    }
});


//! Functions List
function getMovieDetails(imdbID){
    return fetch('http://www.omdbapi.com/?apikey=2459718a&i=' + imdbID)
    .then(response => response.json())
    .then(movie => movie)
    .catch(error => console.log(error));
}

function updateUIDetails(movie){
    const movieDetails = showMovieDetail(movie);
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = movieDetails;
}

function updateUI(movies) {
    let cards = '';
    movies.forEach(x => cards += showCards(x));
    document.querySelector('.movie-container').innerHTML = cards;
}

function getMovies(search){
    // Show Loading in the search button
    searchBtn.innerHTML = showLoading();
    // Return Fetch with searching the value from parameter
    return fetch('http://www.omdbapi.com/?apikey=2459718a&s=' + search)
        .catch(error => console.log(error))         
        .finally(() => searchBtn.innerHTML = 'Search')          
        .then(response => response.json())          
        .then(response => response.Search);
}

function showLoading(){
    return `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    Loading...`;
}

function showCards(x){
    return `<div class="col-md-4 my-5">
    <div class="card">
      <img src="${x.Poster}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${x.Title}</h5>
        <p class="card-text mb-2 text-muted">${x.Year}</p>
        <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${x.imdbID}">Show Details</a>
      </div>
    </div>
  </div>`;
}

function showMovieDetail(m) {
    return `<div class="container-fluid">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${m.Poster}" class="img-fluid">
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                        <li class="list-group-item"><h4>${m.Title}</h4></li>
                        <li class="list-group-item"><strong>Rated : </strong>${m.Rated}</li>
                        <li class="list-group-item"><strong>Released : </strong>${m.Released}</li>
                        <li class="list-group-item"><strong>Genre : </strong>${m.Genre}</li>
                        <li class="list-group-item"><strong>Director : </strong>${m.Director}</li>
                        <li class="list-group-item"><strong>Actors : </strong>${m.Actors}</li>
                        <li class="list-group-item"><strong>Writer : </strong>${m.Writer}</li>
                        <li class="list-group-item"><strong>Rating : </strong>${m.imdbRating}</li>
                        <li class="list-group-item"><strong>Plot : </strong><br> ${m.Plot}</li>
                        </ul>
                    </div>
                </div>
            </div>`;
}