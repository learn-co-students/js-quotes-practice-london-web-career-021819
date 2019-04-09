
function getQuotes() {
  return fetch('http://localhost:3000/quotes')
  .then(response => response.json())
}

function createQuote(quote) {
    return fetch('http://localhost:3000/quotes', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
     },
     body: JSON.stringify(quote)
    }).then(response => response.json())
  }

function updateQuote(quote) {
  return fetch('http://localhost:3000/quotes' + `/${quote.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(quote)
  }).then(response => response.json())
}

function deleteQuote(quote) {
  return fetch('http://localhost:3000/quotes' + `/${quote.id}`, {
    method: "DELETE",
  }).then (response => response.json())
}
