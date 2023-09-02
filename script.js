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
  let bookCounterValue = 0;

  event.preventDefault();

  const titleUi = document.getElementById("book_title").value;
  const authorUi = document.getElementById("book_author").value;
  const no_of_pagesUi = document.getElementById("book_pages").value;
  /*const alreadyReadUi = document.getElementById("book_isRead").value;*/
  const aRead = document.querySelector("#book_isRead").checked;

  //instantiating the constructor by creating an instance called newBook
  const newBook = new addNewBook(titleUi, authorUi, no_of_pagesUi, aRead);

  //pushing the new object inside the array
  myLibrary.push(newBook);
  addCard(myLibrary, counter, aRead);
  clearForm(inputValues);
  bookCounter(bookCounterValue);
});

//add card function, this is the main function of the project
addCard = (mL, cV, aR) => {
  /*mapping each field of the object into seperate array like title array,auhtors array,pages array and read status array*/
  let readCount = 0;
  let titles = mL.map((L) => L.title);
  let authors = mL.map((L) => L.author);
  let pages = mL.map((L) => L.pages);
  let readStatus = mL.map((L) => L.alreadyRead);

  /**Creating the book card and setting attributes like class and id , value */
  const bookCard = document.createElement("div");
  bookCard.setAttribute("id", `bc_${cV}`);
  bookCard.setAttribute("value", cV);
  const bookID = bookCard.id;
  const titleDetail = document.createElement("p");
  const authorDetail = document.createElement("p");
  const pageDetail = document.createElement("p");
  const readStatusDetail = document.createElement("button");
  readStatusDetail.id = `rstatus${cV}`;

  const removeButton = document.createElement("button");
  removeButton.setAttribute("id", "remove_button");
  removeButton.setAttribute("value", cV);
  removeButton.id = `b${cV}`;

  if (aR == true) {
    bookCard.classList.add("card-aRead-T");
    readStatusDetail.classList.add("card-aRead-T-button");
    readStatusDetail.textContent = `Read`;
  } else if (aR == false) {
    bookCard.classList.add("card-aRead-F");
    readStatusDetail.classList.add("card-aRead-F-button");
    readStatusDetail.textContent = `Unread`;
  }

  /*assigning values dynamically for all the new elements created */

  titleDetail.textContent = `Title:${titles[cV]}`;
  authorDetail.textContent = `Author:${authors[cV]}`;
  pageDetail.textContent = `Pages:${pages[cV]}`;

  removeButton.textContent = "Remove";

  /*appending the new elements to our card */
  bookCard.appendChild(titleDetail);
  bookCard.appendChild(authorDetail);
  bookCard.appendChild(pageDetail);
  bookCard.appendChild(readStatusDetail);
  bookCard.append(removeButton);

  displayArea.insertAdjacentElement("beforeend", bookCard);

  /*remove button process here */

  const rButton = document.getElementById(`b${cV}`);
  const rsDet = document.getElementById(`rstatus${cV}`);
  const bcId = document.getElementById(`bc_${cV}`);
  rButton.setAttribute("class", "rbutton");
  removeCard(rButton, bookID, bookCounter);
  switchStatus(rsDet, bcId, aR);
};

/*removing button function */

removeCard = (rB, bID, V) => {
  rB.addEventListener("click", () => {
    V = V - 1;
    const tobeRemoved = document.getElementById(bID);

    tobeRemoved.remove();

    bookCounter(V);
  });
};

switchStatus = (rD, bId, aR) => {
  rD.addEventListener("click", () => {
    if (rD.classList.contains("card-aRead-T-button")) {
      rD.classList.toggle("card-aRead-F-button");
      bId.classList.toggle("card-aRead-F");
      rD.textContent = "Unread";
    } else if (rD.classList.contains("card-aRead-F-button")) {
      rD.classList.toggle("card-aRead-T-button");
      bId.classList.toggle("card-aRead-T");
      rD.textContent = "Read";
    }

    /* if (aR == true) {
      console.log(aR);
      rD.classList.toggle("card-aRead-F-button");
      bId.classList.toggle("card-aRead-F");
      rD.textContent - "Unread";
    } else if (aR == false) {
      console.log(aR);
      rD.classList.toggle("card-aRead-T-button");
      bId.classList.toggle("card-aRead-T");
      rD.textContent = "Read";
    }*/
  });
};

/*code for clearing the form on button click */
clearButton.addEventListener("click", (event) => {
  event.preventDefault();
  clearForm(inputValues);
});

clearForm = (ipV) => {
  ipV.forEach((ip) => {
    ip.value = "";
  });
};

bookCounter = (bC) => {
  bC = bC + 1;
  console.log(bC);
  const bookCount = document.getElementById("bookcounter");
  bookCount.textContent = `${bC}`;

  const readBooks = document.getElementById("booksread");
};
