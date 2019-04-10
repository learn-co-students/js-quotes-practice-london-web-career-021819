// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.
document.addEventListener("DOMContentLoaded", function() {
  renderQuotes()
});

const quotes_url = 'http://localhost:3000/quotes'
const quoteListEL = document.getElementById('quote-list')
const formEL = document.querySelector('#new-quote-form')
const subBtn = formEL.querySelector('.btn.btn-primary')

subBtn.addEventListener('click', (event) => {
const quote = {
quote: formEL.quote.value,
author: formEL.author.value,
likes: 0
}
createQuote(quote)
.then(addQuote(quote))
})

function getQuotes() {
  return fetch(quotes_url)
  .then(response => response.json())
}

//add a single quote
function addQuote(quote) {
  const liEL = document.createElement('li')
  liEL.className = 'quote-card'
  liEL.innerHTML =
  `
  <blockquote class="blockquote">
  <p class="mb-${quote.id}">${quote.quote}</p>
  <footer class="blockquote-footer">${quote.author}</footer>
  <br>
  <button class='btn-success'>Likes: <span>${quote.likes}</span></button>
  <button class='btn-danger'>Delete</button>
  </blockquote>
  `
  quoteListEL.append(liEL)

  const likeBtn = liEL.querySelector('.btn-success')
  likeBtn.addEventListener('click', (event) => {
    quote.likes ++
    likeBtn.innerHTML = `
    <button class='btn-success'>Likes: <span>${quote.likes}</span></button>
    `
    updateQuote(quote)
  })

  const delBtn = liEL.querySelector('.btn-danger')
  delBtn.addEventListener('click', (event) => {
    event.target.parentElement.remove()
    deleteQuote(quote)
  })





}

function updateQuote(quote) {
  fetch(`http://localhost:3000/quotes/${quote.id}`,{
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quote)
  })
}

function deleteQuote(quote) {
  return fetch(`http://localhost:3000/quotes/${quote.id}`,{
    method: 'delete'
  }).then(response =>
    response.json().then(json => {
      return json;
    })
  );
}

function createQuote(quote) {
  return fetch(`http://localhost:3000/quotes`,{
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quote)
  }).then(response => response.json())
}





function renderQuotes() {
  getQuotes()
  .then(quotes => quotes.forEach(addQuote))
}
