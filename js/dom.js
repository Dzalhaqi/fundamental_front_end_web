const UNCOMPLETED_LIST_BOOK_ID = 'book-items-uncompleted'
const COMPLETED_LIST_BOOK_ID = 'book-items-completed'

function clearForm() {
  const formData = ['title', 'author', 'year']
  for (data of formData) {
    document.querySelector(`.${data}`).value = ''
  }
  document.querySelector('.checkbox').checked = false
}

function deleteItem(bookElement) {
  const bookPosition = findBookIndex(bookElement.id)
  const titleBook = bookElement.querySelector('.data-container p.title').innerText
  const isDelete = confirm(`Delete ${titleBook} Book?`)
  if (isDelete) {
    books.splice(bookPosition, 1)
    bookElement.remove()
    updateDataToStorage()
  }
}

function makeBook(title, author, year, isCompleted, id) {
  if (isCompleted) {
    const bookItems = document.querySelector('.book-items-completed')
    const item = document.createElement('div')
    item.classList.add('completed-item')
    item.setAttribute('id', id)

    item.innerHTML = `
      <div class="data-container">
        <p class="title">${title}</p>
        <p class="author">${author}</p>
        <p class="year">${year}</p>
      </div>
      <div class="buttonAction-container">
        <button class="delete" id="deleteButton" onclick="deleteItem(this.parentElement.parentElement)"><span class="text span-delete">Delete</span></button>
        <button class="complete" id="completeButton" onclick="undoBookFromComplete(this.parentElement.parentElement)"><span class="text">Uncomplete</span></button>
      </div>
    `

    bookItems.append(item)
    return bookItems

  } else {
    const bookItems = document.querySelector('.book-items-uncompleted')
    const item = document.createElement('div')
    item.classList.add('uncompleted-item')
    item.setAttribute('id', id)

    item.innerHTML = `
      <div class="data-container">
        <p class="title">${title}</p>
        <p class="author">${author}</p>
        <p class="year">${year}</p>
      </div>
      <div class="buttonAction-container">
        <button class="delete" id="deleteButton" onclick="deleteItem(this.parentElement.parentElement)"><span class="text span-delete">Delete</span></button>
        <button class="incomplete" id="incompleteButton" onclick="addBookToComplete(this.parentElement.parentElement)"><span class="text">Complete</span></button>
      </div>
    `
    bookItems.append(item)
    return bookItems
  }
}

function addBook() {
  const title = document.querySelector('.title').value
  const author = document.querySelector('.author').value
  const year = parseInt(document.querySelector('.year').value)
  const isCompleted = document.querySelector('.checkbox').checked

  if (title === '' | author === '' | year === '') {
    return alert('Please fill all the data input')
  }

  const bookObject = composeBookObject(title, author, year, isCompleted)
  const book = makeBook(title, author, year, isCompleted, bookObject.id)

  books.push(bookObject)
  updateDataToStorage()
}

function undoBookFromComplete(bookElement) {
  let title = bookElement.querySelector('.data-container p.title').innerText
  let author = bookElement.querySelector('.data-container p.author').innerText
  let year = bookElement.querySelector('.data-container p.year').innerText
  let bookId = bookElement.id

  const newBook = makeBook(title, author, year, false, bookId)
  let book = findBook(bookId)
  book['isCompleted'] = false

  bookElement.remove()
  updateDataToStorage()
}

function addBookToComplete(bookElement) {
  let title = bookElement.querySelector('.data-container p.title').innerText
  let author = bookElement.querySelector('.data-container p.author').innerText
  let year = bookElement.querySelector('.data-container p.year').innerText
  let bookId = bookElement.id

  const newBook = makeBook(title, author, year, true, bookId)
  let book = findBook(bookId)
  book['isCompleted'] = true

  bookElement.remove()
  updateDataToStorage()
}

function searchBook(keyword) {
  const filter = keyword.toLowerCase()
  const titles = document.querySelectorAll("p.title")

  for (let i = 0; i < titles.length; i++) {
    const titlesText = titles[i].innerText

    if (!titlesText.toLocaleLowerCase().includes(filter)) {
      titles[i].parentElement.parentElement.style.display = 'none'
    } else {
      titles[i].parentElement.parentElement.style.display = ''
    }
  }
}

function countBookItem() {
  const total = document.querySelectorAll('.completed-item')
  return total
}