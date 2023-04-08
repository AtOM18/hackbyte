let currentPage = 1
let imagesPerPage = 10
let totalImages = 100

function goToPrevPage() {
  if (currentPage > 1) {
    currentPage--;
    render_images();
  }
}

function goToNextPage() {
  if (currentPage < Math.ceil(totalImages / imagesPerPage)) {
    currentPage++;
    render_images();
  }
}
//fetching top 100 list
function render_images(){
  let startIndex = (currentPage - 1) * imagesPerPage;
  let endIndex = startIndex + imagesPerPage;
    //fetching top 100
  const options = {
	  method: 'GET',
	  headers: {
		  'X-RapidAPI-Key': 'c03f2aca38mshf49060e433fd317p11e00ejsn9562b7ddf969',
		  'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
	}
  }
  fetch('https://imdb-top-100-movies.p.rapidapi.com/', options)
	.then(response => response.json())
	    .then(data => {
            const list = data
            for(let i = startIndex; i < endIndex && i < totalImages; i++){
              let item = list[i]
              console.log("test")
                //getting each individual item
                const name = item.title
                const image = item.image
                const rank = item.rank
                const rating = item.rating
                //updating the dom
                const movie = `<div class="imdbcont">
                                  <div class="imdbcontimg"></div>
                                    <img src="${image}" alt="${name}" >
                                    <div class="grp">
                                      <div class="imdbconttitle">
                                        <p>${name}</p>
                                      </div>
                                      <div class="imdbcontrating">
                                        <p>Rating: ${rating}</p>
                                      </div>
                                    </div>
                                </div>`
                document.querySelector('.imdbcontainer').innerHTML += movie
            }
            
        })
	.catch(err => console.error(err))
}

render_images()

//Search function
function search_movies(){
    const input = document.getElementById("search") //enter input tag id here
    //fetching data
    console.log(input.value)
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'c03f2aca38mshf49060e433fd317p11e00ejsn9562b7ddf969',
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
    };
    //generating the link
    const link = `https://streaming-availability.p.rapidapi.com/v2/search/title?title=${input.value}&country=us&show_type=movie&output_language=en`
    fetch(link, options)
        .then(response => response.json())
        .then((response) =>{
          let list = response.result
          //info
          for(let i = 0; i <8 ; i++){
            let title = list[i].title 
            let image = "https://image.tmdb.org/t/p/w92/"+list[i].posterPath
            let rating = list[i].imdbRating
            let year = list[i].year
            console.log(title)
            //style="background: url(${image});
            let html = `<div class="resultcontainer">
                        <!-- these are the containers which will contain the image , name and the release date of the movie -->
                        <div class="resultcontainerimage">
                            <img src="${image}" alt="${title}">
                            <!-- this contains the image of the container -->
                        </div>
                        <div class="containergroup">
                        <div class="resultcontainertitle">
                            <p>${title}</p>
                            <!-- this contains the title of the movie -->
                        </div>
                        <div class="resultcontainerimdb">
                            <p>rating:${rating}</p>
                            <!-- this will  contain the imdb rating  -->
                        </div>
                        <div class="resultcontaineryear" id="rcontyear1">
                            <p>year:${year}</p>
                        </div>
                    </div>
                    </div>`
            document.querySelector('.searchresults').innerHTML += html
          }
        })
        .catch(err => console.error(err));
}