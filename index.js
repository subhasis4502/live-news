// console.log("My index.js file");
// 0014e91ac6ea4dc2b9a25429ea78b6c5
// https://newsapi.org/v2/top-headlines?country=us&apiKey=0014e91ac6ea4dc2b9a25429ea78b6c5

const countryDropdown = document.getElementById("countryDropdown");
const categoryDropdown = document.getElementById("categoryDropdown");
const sortedDropdown = document.getElementById("sortedDropdown");

const getNews = document.getElementById("getNews");
getNews.addEventListener("click", function() {
  dropdownChange(0);
});
let newsObj = null;
let html = "";

function dropdownChange(page) {
  // console.log("Button clicked");
  // Instantiate an xhr object
  const xhr = new XMLHttpRequest();

  // Open the object
  xhr.open(
    "GET",
    `https://newsapi.org/v2/top-headlines?country=${countryDropdown.value}&category=${categoryDropdown.value}&apiKey=0014e91ac6ea4dc2b9a25429ea78b6c5`,
    true
  );

  // What to do when response is ready
  xhr.onload = function () {
    // Checking status
    if (this.status === 200) {
      newsObj = JSON.parse(this.responseText);
      // console.log(newsObj.articles);
      html = "";
      
      calculatePage(newsObj.articles.length);
      let i = page * 10;
      for (i = page * 10; i < 10 * (page + 1); i++) {
        const element = newsObj.articles[i];
        let date = new Date(element.publishedAt);
        console.log(date);
        html += `
        <div class="card m-1 newsCard">
        <img class="card-img-top newsImg" src="${element.urlToImage}" alt="${element.title}">
        <div class="card-body">
            <h5 class="card-title newsTitle">${element.title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Source: ${element.source.name} (${date})</h6>
            <details>
                <summary class="card-text">${element.description}...</summary>
                <p>${element.content}</p>
            </details>
            <a type="button" class="mt-2 btn btn-primary" href="${element.url}" target="_blank">Read More</a>
        </div>
        </div>
        `;
      }

      let newsList = document.getElementById("newsList");
      newsList.innerHTML = html;
    } else {
      console.log("Some error occured");
    }
  };
  // Send the request
  xhr.send();
  // console.log("We are done");
}

// Search news
document.getElementById("searchBtn").addEventListener("click", function (e) {
  e.preventDefault();
  let inputVal = document.getElementById("searchNews").value;
  // console.log(inputVal);
  // console.log(newsObj.articles);

  if (newsObj && inputVal) {
    html = "";
    newsObj.articles.forEach((element) => {
      if (element.source.name.toLowerCase().includes(inputVal.toLowerCase())) {
        html += `
      <div class="card m-1 newsCard">
          <img class="card-img-top newsImg" src="${element.urlToImage}" alt="${element.title}">
          <div class="card-body">
              <h5 class="card-title">${element.title}</h5>
              <h6 class="card-subtitle mb-2 text-muted">Source: ${element.source.name}</h6>
              <details>
                  <summary class="card-text">${element.description}...</summary>
                  <p>${element.content}</p>
              </details>
              <a type="button" class="mt-2 btn btn-primary" href="${element.url}" target="_blank">Read More</a>
          </div>
      </div>
              `;
      }
    });

    let newsList = document.getElementById("newsList");
    newsList.innerHTML = html;
  }
});

function calculatePage(news) {
  let pgNo = news/10;
  let pg = "";
  pages = document.getElementById('pages');
  for (let i = 0; i < pgNo; i++) {
    pg += `<li class="page-item"><a class="page-link" href="#" onclick="dropdownChange(${i})">${i+1}</a></li>`
  }
  pages.innerHTML = pg;
}

dropdownChange(0);


// Category implement

// Language
// Time duration
// Pagination
// Separate pages for everything and country
// Sorted by, time bound, from-to, language, exclude domain in everythng page
