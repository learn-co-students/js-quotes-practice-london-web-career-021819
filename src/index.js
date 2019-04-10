const quotesUrl = "http://localhost:3000/quotes";
const quoteList = document.getElementById("quote-list");
const quoteFormEl = document.querySelector("#new-quote-form");
const authorFormEl = document.querySelector("#author");

//API
function getQuotes() {
  return fetch(quotesUrl).then(resp => resp.json());
}

function createQuote(quote) {
  return fetch(quotesUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(quote)
  }).then(resp => resp.json());
}

function deleteQuote(quote) {
  return fetch(`${quotesUrl}/${quote.id}`, {
    method: "DELETE"
  }).then(resp => resp.json());
}

function patchQuote(quote) {
  return fetch(`${quotesUrl}/${quote.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(quote)
  }).then(resp => resp.json());
}

//DOM -----------------------------------------------------------------------
function renderQuote(quote) {
  const quoteLi = document.createElement("li");
  quoteLi.className = "quote-card";
  quoteLi.innerHTML = `
    <blockquote class="blockquote" id="quote-${quote.id}">
      <p class="mb-0">${quote.quote}</p>
      <footer class="blockquote-footer">${quote.author}</footer>
      <br>
      <button class='btn-success'>Likes: <span>${quote.likes}</span></button>
      <button class='btn-danger'>Delete</button>
    </blockquote>
  `;
  quoteList.appendChild(quoteLi);
  //LIKE BUTTON
  const likeBtn = quoteLi.querySelector(".btn-success");
  likeBtn.addEventListener("click", function(e) {
    let likes = e.target.parentElement.querySelector("span");
    like(quote)
      .then(quote => (likes.innerText = quote.likes));
  });
  //DELETE BUTTON
  const delBtn = quoteLi.querySelector(".btn-danger");
  delBtn.addEventListener("click", function(e) {
    deleteQuote(quote).then(() => quoteLi.remove());
  });
}

function renderQuotes(quotes) {
  quotes.forEach(quote => renderQuote(quote));
}

//FORM SUBMISSION

quoteFormEl.addEventListener("submit", function(e) {
  e.preventDefault();
  createQuote(formQuote(event)).then(renderQuote);
});

function formQuote(event) {
  const quoteBody = event.target.querySelector("#new-quote").value;
  const quoteAuthor = event.target.querySelector("#author").value;
  event.target.reset();
  return { author: quoteAuthor, quote: quoteBody, likes: 0 };
}

function like(quote) {
  quote.likes++;
  return patchQuote(quote);
}

//init
function init() {
  getQuotes().then(renderQuotes);
}

init();
