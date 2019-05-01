// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.
const quotesListPlace = document.querySelector('#quote-list')

//1.GET QUOTES
const getQuotes = () => fetch("http://localhost:3000/quotes")
.then(response => response.json())

//2.DISPLAY QUOTES
const quoteList = quote => {
  const li = document.createElement('li')
  li.innerHTML = `<li class='quote-card'>
  <blockquote class="blockquote">
  <p class="mb-0">${quote.quote}</p>
  <footer class="blockquote-footer">${quote.author}</footer>
  <br>
  <button class='btn-success'>Likes: <span>${quote.likes}</span></button>
  <button class='btn-danger'>Delete</button>
  </blockquote>
  </li>`
  quotesListPlace.append(li)
  likeIncrease(li,quote)
  deleteThings(li, quote)
}


let deleteThings = (li, quote) => {
  const deleteBtn = li.querySelector('.btn-danger')
  deleteBtn.addEventListener('click', () => {
    fetch(`http://localhost:3000/quotes/${quote.id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json"}
      })
    .then(li.remove())
  }
)}

let likeIncrease = (li, quote) => {
  let likeBtn = li.querySelector('.btn-success')
  let span = likeBtn.querySelector('span')
  let num = parseInt(`${quote.likes}`)

  likeBtn.addEventListener('click', () =>
    { num ++
      return fetch(`http://localhost:3000/quotes/${quote.id}`,
        {method: "PATCH",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({likes: num})
        }).then(span.innerText = num)}
  )

}

const quotesList = quotes => {
  quotes.forEach(quote => quoteList(quote))
}

//3.SUBMIT NEW QUOTE
const formElm = document.querySelector('#new-quote-form')
let quoteValue;
let authorValue;
formElm.addEventListener("submit", e => {
  e.preventDefault()
  const quote ={
    quote: e.target[0].value,
    author: e.target[1].value,
    likes: 0
  }

    newQuote(quote)
    quoteList(quote)
    formElm.reset()

  })



  const newQuote = (quote) =>
  fetch("http://localhost:3000/quotes",
  {method: 'POST',
  headers: { "Content-Type": "application/json"},
  body: JSON.stringify(quote)})
  .then(res => res.json())

  //RUN THE CODE
  const init = () => {
    getQuotes().then((quotes) => quotesList(quotes))
  }

  init()
