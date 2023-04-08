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
                                    <img src="${image}" alt="${name}">
                                    <div class="grp">
                                      <div class="imdbconttitle">
                                        <p>${name}</p>
                                      </div>
                                      <div class="imdbcontrating">
                                        <p>Rating: ${rating}</p>
                                      </div>
                                    </div>
                                </div>`
                let movie_div = document.querySelector('.imdbcontainer').innerHTML += movie
            }
            
        })
	.catch(err => console.error(err))
}

render_images()

//Search function
// function search_movies(){
//     const input = document.getElementById("") //enter input tag id here
//     //fetching data
//     const options = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Key': 'c03f2aca38mshf49060e433fd317p11e00ejsn9562b7ddf969',
//             'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
//         }
//     };
//     //generating the link
//     const link = `https://streaming-availability.p.rapidapi.com/v2/search/title?title=${input}&country=us&show_type=movie&output_language=en`
//     fetch(link, options)
//         .then(response => response.json())
//         .then(response => console.log(response))
//         .catch(err => console.error(err));
// }