// Get the user ID from the query string
const urlParams = new URLSearchParams(window.location.search);
const imdbId = urlParams.get("imdbId");

// Use the user ID in your code
console.log(imdbId);

//change the options when max requests runs out
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'f0a946e90bmsha857731f45b6458p19066ejsnf0f1801fbf22',
		'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
	}
};



fetch(`https://streaming-availability.p.rapidapi.com/v2/get/basic?country=us&imdb_id=${imdbId}`, options)
	.then(response => response.json())
	.then(response => response.result)
    .then(data => {
        console.log(data)
        const title = data.title
        const image = "https://image.tmdb.org/t/p/original/" + data.posterPath
        const year = data.year
        let overview = data.overview
        const trailer = "https://www.youtube.com/embed/"+data.youtubeTrailerVideoId
        const rating = data.imdbRating
        document.getElementById("title").textContent = title
        document.getElementById("rating").textContent = rating
        document.getElementById("description").textContent = overview
        document.getElementById("year").textContent = year
        document.getElementById("youtubelink").setAttribute("src", trailer)
        //document.getElementById("watchlink").setAttribute("src", )//change this
        document.getElementById("image").setAttribute("src", image) 
        
    })
	.catch(err => console.error(err));