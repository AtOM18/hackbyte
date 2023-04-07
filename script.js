//fetching top 100
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c03f2aca38mshf49060e433fd317p11e00ejsn9562b7ddf969',
		'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
	}
};

//fetching top 100 list
fetch('https://imdb-top-100-movies.p.rapidapi.com/', options)
	.then(response => response.json())
	    .then(data => {
            const list = data
            list.map((item) => {
                //getting each individual item
                const name = item.title
                const image = item.image
                const rank = item.rank
                //updating the dom
                const movie = `<li><img src = "${image}"><h2>${rank+":"+name}</h2></li>`
                let movie_div = document.querySelector('.movies').innerHTML += movie
            })
        })
	.catch(err => console.error(err));

