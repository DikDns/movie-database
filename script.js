$('.search-button').on('click', function(){

    $.ajax(
        {
            url:  'http://www.omdbapi.com/?apikey=2459718a&s=' + $('.input-keyword').val(),
            success: results =>{
                const movies = results.Search;
    
                console.log(movies);
    
                let cards = "";
    
                movies.forEach(x => {
                    cards += showCards(x);
                })
    
                $('.movie-container').html(cards);
    
    
    
                // Ketika tombol details di klik
                $('.modal-detail-button').on('click', function(){
                    $.ajax({
                        url:  'http://www.omdbapi.com/?apikey=2459718a&i=' + $(this).data('imdbid'),
                        success: m => {
                            const movieDetail = showMovieDetail(m);
    
                            $('.modal-body').html(movieDetail);
                        },
    
                        error: e => {
                            console.log(e.responseText);
                        }
                    });
                    
                    // console.log($(this).data('imdbid'));
                });
            },
            error: e => {
                console.log(e.responseText);
            }
        }
    )

});

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