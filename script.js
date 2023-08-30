/** @format */

const myLibrary = []; //declared an empty array to push the objects
const plusButton = document.getElementById("plus_icon");
const displayArea = document.getElementById("d1");
let inputValues = document.querySelectorAll('input[type="text"]');

//constructor for adding new book

function addNewBook(title, author, pages, alreadyRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.alreadyRead = alreadyRead;
}

//adding a card on button click and also getting the values from the UI and sending it to the constructor
plusButton.addEventListener("click", (event) => {
  event.preventDefault();

  const titleUi = document.getElementById("book_title").value;
  const authorUi = document.getElementById("book_author").value;
  const no_of_pagesUi = document.getElementById("book_pages").value;
  const alreadyReadUi = document.getElementById("book_read").value;
  addCard();

  //instantiating the constructor by creating an instance called newBook
  const newBook = new addNewBook(
    titleUi,
    authorUi,
    no_of_pagesUi,
    alreadyReadUi
  );

  //pushing the new object inside the array
  myLibrary.push(newBook);
  console.log(myLibrary);
});

addCard = () => {
  const newDiv = document.createElement("div");
  newDiv.classList.add("card");

  displayArea.insertAdjacentElement("beforeend", newDiv);
};

function addBookToTheLibrary() {}
