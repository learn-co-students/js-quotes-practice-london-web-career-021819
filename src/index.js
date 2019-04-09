const URL = "http://localhost:3000/quotes";
const QUOTE_LIST = document.getElementById("quote-list");
const FORM = document.getElementById("new-quote-form");

// API
const getQuotes = () => {
  return fetch(URL).then(resp => resp.json());
};

function createQuote(quote) {
  return fetch(URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(quote)
  }).then(resp => resp.json());
}

function updateQuote(quote) {
  return fetch(URL + "/" + quote.id, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(quote)
  }).then(resp => resp.json());
}

function deleteQuote(id) {
  return fetch(URL + "/" + id, {
    method: "DELETE"
  });
}

// CLIENT

function showEdit(event) {
  const editBtn = event.target.parentNode.querySelector('.edit');
  editBtn.style.visibility = 'visible';  
}

function displayQuote(quote) {
  const textContainer = document.createElement('div');
  textContainer.contentEditable = 'true'
  textContainer.addEventListener('focus', showEdit)

  const liEl = document.createElement("li");
  liEl.className = "quote-card";

  const blockEl = document.createElement("blockquote");
  blockEl.className = "blockquote";

  const contentEl = document.createElement("p");
  contentEl.className = "mb-0";
  contentEl.textContent = quote.quote;

  const footerEl = document.createElement("footer");
  footerEl.className = "blockquote-footer";
  footerEl.textContent = quote.author;

  const likeBtn = document.createElement("button");
  likeBtn.className = "btn-success";
  likeBtn.innerHTML = `Likes: <span>${quote.likes}</span>`;
  likeBtn.addEventListener("click", () => {
    quote.likes++;
    updateQuote(quote).then(() => {
      likeBtn.innerHTML = `Likes: <span>${quote.likes}</span>`;
    });
  });

  const delBtn = document.createElement("button");
  delBtn.className = "btn-danger";
  delBtn.textContent = "Delete";
  delBtn.addEventListener("click", _ => {
    deleteQuote(quote.id).then(_ => {
      liEl.remove();
    });
  });

  const editBtn = document.createElement('button')
  editBtn.className = 'btn-warning edit'
  editBtn.textContent = 'Save'
  editBtn.style.visibility = 'hidden'
  editBtn.addEventListener('click', e => {
    const updatedQuote = {
      id: quote.id,
      quote: textContainer.querySelector('p').innerText,
      author: textContainer.querySelector('footer').innerText
    }
    updateQuote(updatedQuote).then(_ => editBtn.style.visibility = 'hidden')
  })

  const brEl = document.createElement("br");

  textContainer.appendChild(contentEl);
  textContainer.appendChild(footerEl);

  blockEl.appendChild(textContainer);
  blockEl.appendChild(brEl);
  blockEl.appendChild(likeBtn);
  blockEl.appendChild(delBtn);
  blockEl.appendChild(editBtn)

  liEl.appendChild(blockEl);

  QUOTE_LIST.appendChild(liEl);
}

const displayQuotes = quotes => quotes.forEach(displayQuote);

function init() {
  getQuotes().then(displayQuotes);
  FORM.addEventListener("submit", e => {
    e.preventDefault();
    const submittedQuote = {
      quote: e.target.content.value,
      likes: 0,
      author: e.target.author.value
    };
    createQuote(submittedQuote).then(displayQuote);
    FORM.reset();
  });
}

init();

