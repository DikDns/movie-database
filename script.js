//! ERROR HANDLING
/*
    Promise:
        .then() .catch()

    Async Await:
        try{}  catch(){}

    
*/ 


//! SearchBtn Event
const searchBtn = document.querySelector('.search-button');
searchBtn.addEventListener('click', async function(){
    try {
        // Movies Storage Variable
        const inputKeyword = document.querySelector('.input-keyword');
        // Asynchronous with await Keyword
        const movies = await getMovies(inputKeyword.value);
        // Put the cards inside the movie-container
        updateUI(movies);
    } 
    catch (error) {
        document.querySelector('.movie-container').innerHTML = showError(error);
    }
});

//! Event Binding
document.addEventListener('click', async function(e){
    // If the user click the modal-detail-button
    if(e.target.classList.contains('modal-detail-button')){
        try {
            const imdbID = e.target.dataset.imdbid;
            const movieDetails = await getMovieDetails(imdbID);
            updateUIDetails(movieDetails);
        } 
        catch(error) {
            document.querySelector('.modal-body').innerHTML = showError(error);
        }
    }
});



//! Functions List
function getMovies(search){
    // Show Loading in the search button
    searchBtn.innerHTML = showLoading();
    // Return Fetch with searching the value from parameter
    return fetch('http://www.omdbapi.com/?apikey=2459718a&s=' + search)
        // .catch(error => console.log(error))         
        .finally(() => searchBtn.innerHTML = 'Search')          
        .then(response => {
            if(!response.ok){
                throw new Error(response.statusText);
            } else {
                return response.json();
            }
        })          
        .then(response => {
            if( response.Response === "False" ) {
                throw new Error(response.Error);
            } else {
                return response.Search;
            }
        });
}

function updateUI(movies) {
    let cards = '';
    movies.forEach(x => cards += showCards(x));
    document.querySelector('.movie-container').innerHTML = cards;
}

function getMovieDetails(imdbID){
    document.querySelector('.modal-body').innerHTML = showLoading();
    return fetch('http://www.omdbapi.com/?apikey=2459718a&i=' + imdbID)
    .then(response => {
        if(!response.ok){
            throw new Error(response.statusText);
        } else {
            return response.json();
        }
    })
    .then(movie => {
        if( movie.Response === "False" ) {
            throw new Error(movie.Error);
        } else {
            return movie;
        }
    });
}

function updateUIDetails(movie){
    const movieDetails = showMovieDetail(movie);
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = movieDetails;
}

function showError(error) {
    return `<div class="alert alert-danger" role="alert">
        ${error}
  </div`;
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