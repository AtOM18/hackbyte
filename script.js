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
    //change the options when max requests runs out for imdbtop100
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'dc554bc96cmsh9dd5109d05819c3p1c3336jsnc17cb0c3d106',
        'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
      }
    };
    
  
  fetch('https://imdb-top-100-movies.p.rapidapi.com/', options)
	.then(response => response.json())
	    .then(data => {
            const list = data
            window.listitems = list
            document.querySelector('.imdbcontainer').innerHTML = ''
            for(let i = startIndex; i < endIndex && i < totalImages; i++){
              let item = list[i]
              console.log("test")
                //getting each individual item
                const name = item.title
                const image = item.image
                const rank = item.rank
                const rating = item.rating
                //updating the dom <button type="button" onclick = "makeid2(this.id)" class="search_button" id= ${i}>
                const movie = `<div class="imdbcont">
                                  <div class="imdbcontimg">
                                  
                                    <img src="${image}" id= ${i} onclick = "makeid2(this.id)" alt="${name}" >
                                  
                                  </div>
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
    //change the options when max requests runs out  for streaming-availability
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'b44df596c7msh2cbe85d73f8c0a7p1a59cejsn12d8c8bda624',
        'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
      }
    };
    
    //generating the link
    const link = `https://streaming-availability.p.rapidapi.com/v2/search/title?title=${input.value}&country=us&show_type=movie&output_language=en`
    fetch(link, options)
        .then(response => response.json())
        .then((response) =>{
          let list = response.result
          window.searchresults = list
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
                       
                            <img src="${image}" id= ${i} onclick = "makeid(this.id)" alt="${title}">
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
//for search function
function makeid(id){
  let list = window.searchresults[id]
  console.log(list.imdbId)
  const newPageUrl = `./movie.html?imdbId=${list.imdbId}`
  window.open(newPageUrl, "_blank")
}
//for top100
function makeid2(id){
  let list = window.listitems[id]
  console.log(list.imdbid)
  const newPageUrl = `./movie.html?imdbId=${list.imdbid}`
  window.open(newPageUrl, "_blank")
}

function opensearch(){
  element = document.querySelector(".searchbox")
  element.style.right = "329px";
}

function closesearch(){
  element = document.querySelector(".searchbox")
  element.style.right = "0px";
}