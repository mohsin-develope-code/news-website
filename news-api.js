const API_KEY = "c6be891ba50045f980c93859351041b0";
const URL = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));

function reload() {
   window.location.reload();
}

async function fetchNews(query) {
   const res = await fetch(`${URL}${query}&apiKey=${API_KEY}`);
   const data = await res.json();
   bindData(data.articles);

}

 function bindData(articles) {
    const cardsConatiner = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-news-card');

    cardsConatiner.innerHTML = '';
    

   articles.forEach(article => {
      if(!article.urlToImage) return;

      const cardClone = newsCardTemplate.content.cloneNode(true);
      fillDataInCard(cardClone, article);
      cardsConatiner.appendChild(cardClone);
      
   });
}


function fillDataInCard(cardClone, article){
   const newsImg = cardClone.querySelector("#news-img");
   const newsTitle = cardClone.querySelector("#news-title");
   const newsSource = cardClone.querySelector("#news-source");
   const newsDesc = cardClone.querySelector("#news-desc");

   newsImg.src = article.urlToImage;
   newsTitle.innerHTML = article.title;
   newsDesc.innerHTML = article.description;

   const date = new Date(article.publishedAt).toLocaleString("en-US", {
      timeZone: "Asia/Jakarta"
   });

   newsSource.innerHTML = `${article.source.name} . ${date}` ;

   cardClone.firstElementChild.addEventListener('click', ()=> {
      window.open(article.url, "_blank");
   });

}

let curselectednav = null;
function onNavItemClick(id){
   fetchNews(id);
   const navItem =document.getElementById(id);
   curselectednav?.classList.remove('active');
   curselectednav = navItem;
   curselectednav.classList.add('active');
}


const searchbutton = document.getElementById('search-button');
const searchText = document.getElementById('news-input');

searchbutton.addEventListener('click', () =>{
   const query = searchText.value ;
   if(!query) return;

   fetchNews(query);

   curselectednav?.classList.remove("active");
   curselectednav = null;
})




