const quotesURL = "http://localhost:3000/quotes"
const quoteForm = document.getElementById('new-quote-form')


/// FETCH QUOTES
function fetchQuotes(){
  return fetch(quotesURL)
  .then(response => response.json())
}

/// POST QUOTE
function createQuote(quote){
  return fetch(quotesURL, {
    method: 'POST',
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify(quote)
  }).then(response => response.json())
}

/// PATCH LIKES
function editQuote(quote){
  return fetch(`${quotesURL}` + `/${quote.id}`, {
    method: 'PATCH',
    headers: {'Content-Type' : 'application/json'},
    body: JSON.stringify(quote)
  }).then(response => response.json())
}

/// DELETE QUOTES
function deleteQuote(quote){
  return fetch(`${quotesURL}` + `/${quote.id}`, {
    method: 'DELETE',
  }).then(response => response.json())
}

/// CREATE QUOTE LIST
function createQuoteList(quote){
    const ulEl = document.getElementById('quote-list')
    const liEl = document.createElement('li')
    liEl.dataset.id = liEl.id
    liEl.className = 'quote-card'
    liEl.innerHTML = `
                    <blockquote id="${quote.id}" class="blockquote">
                    <p class="mb-0" id="${quote.id}"> ${quote.quote} </p>
                    <footer class="blockquote-footer"> ${quote.author} </footer>
                    <br>
                    <button id="likes" class='btn-success'> Likes: <span> ${quote.likes}</span> </button>
                    <button class='btn-danger'> Delete </button>
                    </blockquote>
                  `
    ulEl.appendChild(liEl)

    const likesBtn = liEl.querySelector(`.btn-success`)
      likesBtn.addEventListener('click', () => {
        quote.likes++
        likesBtn.innerText = `Likes: ${quote.likes}`
        editQuote(quote)
        .then(() => {likesBtn.innerText = `Likes: ${quote.likes}`})})

    const deleteBtn = liEl.querySelector(`.btn-danger`)
      deleteBtn.addEventListener('click', (event) => {
        deleteQuote(quote)
        .then(liEl.remove())})
}

/// SUBMIT NEW QUOTE
function quoteSubmitButtonListener() {
  document.addEventListener('submit', event => {
    event.preventDefault()
        let newQuote = {    id: quoteForm.id.value,
                         quote: quoteForm.quote.value,
                        author: quoteForm.author.value,
                         likes: 0
                       }
        createQuote(newQuote)
        .then(response => renderPage())
        quoteForm.reset()
      })
}

/// RENDER PAGE
function renderPage(){
  document.getElementById('quote-list').innerHTML = ""
  fetchQuotes()
  .then(quotes => quotes.
  forEach(quote => createQuoteList(quote)))
}
/// INITIALIZE
document.addEventListener("DOMContentLoaded", function () {
  renderPage()
  quoteSubmitButtonListener()
});
