// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.

formEl = document.getElementById('new-quote-form')
listEl = document.getElementById('quote-list')
btn = document.getElementById('submitit')

function addQuoteToPage(quote) {
  let cardEl = document.createElement('li')
  cardEl.className = 'quote-card'
  cardEl.innerHTML = `
           <blockquote class="blockquote">
            <p class="mb-${quote.id}">${quote.quote}</p>
            <footer class="blockquote-footer">${quote.author}</footer>
            <br>
            <button class='btn-success'>Likes: <span>${quote.likes}</span></button>
            <button class="btn-edit">Edit</button>
            <button class='btn-danger'>Delete</button>
          </blockquote>
                    `
  listEl.appendChild(cardEl)

  const likeEl = cardEl.querySelector('.btn-success')
  likeEl.addEventListener('click', (event) => {
    quote.likes++
    likeEl.innerText = `Likes: ${quote.likes}`
    updateQuote(quote)
    .then(() => {likeEl.innerText = `Likes: ${quote.likes}`})
  })

  const deletebtn = cardEl.querySelector('.btn-danger')
  deletebtn.addEventListener('click', () => {
     deleteQuote(quote)
    .then(cardEl.remove())
  })

}

formEl.addEventListener('submit', (event) => {
  event.preventDefault()
  let newQuote = {
    quote: formEl.quote.value,
    author: formEl.author.value,
    likes: 0
  }
  createQuote(newQuote)
  .then(addQuoteToPage(newQuote))
  formEl.reset()
})

function addQuotes(quotes) {
  quotes.forEach(addQuoteToPage)
}

getQuotes()
.then(addQuotes)
