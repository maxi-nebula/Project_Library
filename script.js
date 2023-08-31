/** @format */

const myLibrary = []; //declared an empty array to push the objects
const plusButton = document.getElementById("plus_icon");
const displayArea = document.getElementById("d1");
let inputValues = document.querySelectorAll('input[type="text"]');
let counter = -1;
const clearButton = document.getElementById("clear_data");

//constructor for adding new book

function addNewBook(title, author, pages, alreadyRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.alreadyRead = alreadyRead;
}

//adding a card on button click and also getting the values from the UI and sending it to the constructor
plusButton.addEventListener("click", (event) => {
  counter = counter + 1;

  event.preventDefault();

  const titleUi = document.getElementById("book_title").value;
  const authorUi = document.getElementById("book_author").value;
  const no_of_pagesUi = document.getElementById("book_pages").value;
  /*const alreadyReadUi = document.getElementById("book_isRead").value;*/
  const aRead = document.querySelector("#book_isRead").checked;
  console.log(aRead);

  //instantiating the constructor by creating an instance called newBook
  const newBook = new addNewBook(titleUi, authorUi, no_of_pagesUi, aRead);

  //pushing the new object inside the array
  myLibrary.push(newBook);
  addCard(myLibrary, counter);
  clearForm(inputValues);
});

addCard = (mL, cV) => {
  //console.log(mL);
  let titles = mL.map((L) => L.title);
  let authors = mL.map((L) => L.author);
  let pages = mL.map((L) => L.pages);
  let readStatus = mL.map((L) => L.alreadyRead);
  console.log(cV);
  const bookCard = document.createElement("div");

  bookCard.classList.add("card");
  bookCard.setAttribute("id", "newDiv");

  const titleDetail = document.createElement("p");
  const authorDetail = document.createElement("p");
  const pageDetail = document.createElement("p");
  const readStatusDetail = document.createElement("p");
  const removeButton = document.createElement("button");

  titleDetail.textContent = `Title:${titles[cV]}`;
  authorDetail.textContent = `Author:${authors[cV]}`;
  pageDetail.textContent = `Pages:${pages[cV]}`;
  readStatusDetail.textContent = `Already read?:${readStatus[cV]}`;
  removeButton.textContent = "Remove";

  bookCard.appendChild(titleDetail);

  bookCard.appendChild(authorDetail);

  bookCard.appendChild(pageDetail);
  bookCard.appendChild(readStatusDetail);
  bookCard.append(removeButton);

  displayArea.insertAdjacentElement("beforeend", bookCard);
};

clearButton.addEventListener("click", (event) => {
  event.preventDefault();
  clearForm(inputValues);
});

clearForm = (ipV) => {
  ipV.forEach((ip) => {
    ip.value = "";
  });
};
