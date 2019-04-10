const QUOTES_URL = "http://localhost:3000/quotes";

// get quotes
function getQuotes() {
  return fetch(QUOTES_URL).then(resp => resp.json());
}

// create quotes
function createQuote(quote) {
  return fetch(QUOTES_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(quote)
  }).then(resp => resp.json());
}

// update quotes / likes
function updateQuote(quote) {
  return fetch(`${QUOTES_URL}/${quote.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(quote)
  }).then(resp => resp.json());
}

// delete quotes
function deleteQuote(quote) {
  return fetch(`${QUOTES_URL}/${quote.id}`, {
    method: "DELETE"
  }).then(resp => resp.json());
}
