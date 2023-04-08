//fetching top 100
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c03f2aca38mshf49060e433fd317p11e00ejsn9562b7ddf969',
		'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
	}
};

//fetching top 100 list
// fetch('https://imdb-top-100-movies.p.rapidapi.com/', options)
// 	.then(response => response.json())
// 	    .then(data => {
//             const list = data
//             list.map((item) => {
//                 //getting each individual item
//                 const name = item.title
//                 const image = item.image
//                 const rank = item.rank
//                 //updating the dom
//                 const movie = `<li><img src = "${image}"><h2>${rank+":"+name}</h2></li>`
//                 let movie_div = document.querySelector('.movies').innerHTML += movie
//             })
//         })
// 	.catch(err => console.error(err));

fetch('https://imdb-top-100-movies.p.rapidapi.com/', options)
.then(response => response.json())
.then(data => {
  const movieContainer = document.querySelector('.movie-container');
  data.map(movie => {
    const movieItem = document.createElement('div');
    movieItem.classList.add('movie-item');

    const image = document.createElement('img');
    image.src = movie.image
    image.alt = movie.title;

    const title = document.createElement('div');
    title.classList.add('movie-title');
    title.textContent = movie.title;

    movieItem.appendChild(image);
    movieItem.appendChild(title);

    movieContainer.appendChild(movieItem);
  });
})
.catch(error => {
  console.error(error);
});








//Search function
function search_movies(){
    const input = document.getElementById("") //enter input tag id here
    //fetching data
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'c03f2aca38mshf49060e433fd317p11e00ejsn9562b7ddf969',
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
    };
    //generating the link
    const link = `https://streaming-availability.p.rapidapi.com/v2/search/title?title=${input}&country=us&show_type=movie&output_language=en`
    fetch(link, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}