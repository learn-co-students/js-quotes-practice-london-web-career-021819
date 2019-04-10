// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.
const QUOTES_URL = "http://localhost:3000/quotes"
const quoteUlEl = document.querySelector('#quote-list')
const formEl = document.querySelector('#new-quote-form')
const newQuoteEl = formEl.querySelector('#new-quote')
const newAuthorEl = formEl.querySelector('#author')
const allQuotes = []
//********************server*******************
function getQuotes() {
  return fetch(QUOTES_URL)
    .then(response => response.json())
}

function createQuote(quote) {
  return fetch(QUOTES_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(quote)
  }).then(response => response.json())
}

function deleteQuote(quoteId) {
  // debugger
  return fetch(QUOTES_URL + `/${quoteId}`, {
    method: 'DELETE'
  }).then(response => response.json())
}

function updateQuote(quote) {
  // debugger
  return fetch(QUOTES_URL + `/${quote.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(quote)
  }).then(resp => resp.json())
}

//*******************client*********************
function addOneQuote(quote) {
  allQuotes.push(quote)
  const liEl = document.createElement('li')
  liEl.className = `quote-card-${quote.id}`
  liEl.innerHTML = `
    <blockquote class="blockquote">
      <p class="mb-${quote.id}">${quote.quote}</p>
      <footer class="blockquote-footer">${quote.author}</footer>
      <br>
      <button class='btn-success' data-quote-id= ${quote.id}>Likes: <span>${quote.likes}</span></button>
      <button class='btn-danger' data-quote-id= ${quote.id}>Delete</button>
    </blockquote>
  `
  quoteUlEl.appendChild(liEl)
}

function addAllQuotes(quotes) {
  quotes.forEach(quote => addOneQuote(quote))
}

formEl.addEventListener('submit', event => {
  event.preventDefault()
  const quote = {
    quote: newQuoteEl.value,
    likes: 1,
    author: newAuthorEl.value
  }
  createQuote(quote)
    .then(addOneQuote)
})

quoteUlEl.addEventListener('click', event => {
  const id = event.target.dataset.quoteId
  const quoteLi = document.querySelector(`.quote-card-${id}`)
  if (event.target.className == 'btn-danger') {
    deleteQuote(id)
      .then(() => {
        quoteLi.remove()
      })
  } else if (event.target.className == 'btn-success'){
    const likedQuote = allQuotes.find(quote => quote.id == id)
    const likeSpan = quoteLi.querySelector('span')
    likedQuote.likes++
    updateQuote(likedQuote)
      .then(() => {
        likeSpan.innerText = `${likedQuote.likes}`
      })
      .catch(() => {
        likedQuote.likes--
        alert('server down.')
      })
  }
  else return
})

function init() {
  getQuotes()
    .then(addAllQuotes)
}

init()
