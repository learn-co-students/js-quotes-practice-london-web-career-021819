const quoteList = document.querySelector("#quote-list");
const newQuoteForm = document.querySelector("#new-quote-form");

// render one quote
function renderQuote(quote) {
  const quoteLi = document.createElement("li");
  quoteLi.className = "quote-card";
  quoteLi.id = quote.id;

  quoteLi.innerHTML = `
      <blockquote class="blockquote">
        <p class="mb-0">${quote.quote}</p>
        <footer class="blockquote-footer">${quote.author}</footer>
        <br>
        <button class='btn-success'>Likes: <span>${quote.likes}</span></button>
        <button class='btn-danger'>Delete</button>
        <button class='btn-warning'>Edit</button>
      </blockquote>
    `;

  quoteList.appendChild(quoteLi);
  addQuoteLiListener(quote, quoteLi);
}

// event listener to get info and add a new quote
newQuoteForm.addEventListener("submit", event => {
  event.preventDefault();

  const quote = {
    quote: document.querySelector("#new-quote").value,
    author: document.querySelector("#author").value,
    likes: 0
  };

  createQuote(quote)
    .then(renderQuote)
    .then(resetForm);
});

// reset the form after submission:
function resetForm() {
  newQuoteForm.reset();
}

// event listener to like or delete quote
function addQuoteLiListener(quote, quoteLi) {
  quoteLi.addEventListener("click", event => {
    if (event.target.className == "btn-success") {
      quote.likes++;
      updateQuote(quote).then(() => {
        quoteLi.querySelector("span").innerText = `${quote.likes}`;
      });
    } else if (event.target.className == "btn-danger") {
      deleteQuote(quote).then(() => {
        quoteLi.remove();
      });
    } else if (event.target.className == "btn-warning") {
      alert("Are you sure?");
    }
  });
}

// render all quotes
function renderAllQuotes(quotes) {
  quotes.forEach(renderQuote);
}

function init() {
  getQuotes().then(renderAllQuotes);
}

init();
