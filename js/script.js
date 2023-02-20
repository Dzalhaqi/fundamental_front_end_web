
document.addEventListener('DOMContentLoaded', () => {
  const submitForm = document.querySelector('.book-form')
  const searchForm = document.querySelector('.search-box')

  submitForm.addEventListener('submit', (event) => {
    event.preventDefault()
    addBook()
    clearForm()
  })

  searchForm.addEventListener('submit', (event) => {
    const keyword = document.querySelector('input.search-item').value
    event.preventDefault()
    searchBook(keyword)
  })

  if (isStorageExist()) {
    loadDataFromStorage()
  }

})

document.addEventListener("ondatasaved", () => {
  console.log("Data berhasil disimpan.")
})

document.addEventListener("ondataloaded", () => {
  refreshDataFromBooks()
})