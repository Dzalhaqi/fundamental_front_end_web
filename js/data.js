const STORAGE_KEY = 'bookshelf'

let books = []

function refreshDataFromBooks() {

  for (book of books) {
    makeBook(book.title, book.author, book.year, book.isCompleted, book.id)
  }
}

function isStorageExist() {
  if (typeof (Storage) === undefined) {
    alert("Browser kamu tidak mendukung local storage");
    return false
  }
  return true;
}

function saveData() {
  const parsed = JSON.stringify(books);
  localStorage.setItem(STORAGE_KEY, parsed);
  document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY)
  let data = JSON.parse(serializedData)

  if (data != null) {
    books = data
  }

  document.dispatchEvent(new Event('ondataloaded'))
}

function updateDataToStorage() {
  if (isStorageExist())
    saveData();
}

function composeBookObject(title, author, year, isCompleted) {
  return {
    title,
    author,
    year,
    isCompleted,
    id: Date.now().toString(),
  }
}

function findBook(bookId) {
  for (book of books) {
    if (book.id === bookId)
      return book
  }
}

function findBookIndex(bookId) {
  let index = 0
  for (book of books) {
    if (bookId === book.id)
      return index

    index++
  }

  return -1
}

