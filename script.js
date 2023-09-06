/** @format */

const myLibrary = []; //declared an empty array to push the objects
const plusButton = document.getElementById("plus_icon");
const displayArea = document.getElementById("d1");
let inputValues = document.querySelectorAll('input[type="text"]');
let counter = -1;
let booksRead = 0;

const clearButton = document.getElementById("clear_data");
const bookCount = document.getElementById("bookcounter");
const readBooks = document.getElementById("booksread");

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

  const titleUi = document.getElementById("title").value;
  const authorUi = document.getElementById("author").value;
  const no_of_pagesUi = document.getElementById("pages").value;
  const aRead = document.querySelector("#book_isRead").checked;

  if (aRead == true) {
    readBooksCounter();
  }

  //instantiating the constructor by creating an instance called newBook
  const newBook = new addNewBook(titleUi, authorUi, no_of_pagesUi, aRead);

  //pushing the new object inside the array
  myLibrary.push(newBook);
  addCard(myLibrary, counter, aRead);
  clearForm(inputValues);
  bookCounter(counter, aRead);
});

//add card function, this is the main function of the project
addCard = (mL, cV, aR) => {
  /*mapping each field of the object into seperate array like title array,auhtors array,pages array and read status array*/

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
  readStatusDetail.classList.add("card-button");
  const removeButton = document.createElement("button");
  removeButton.setAttribute("value", cV);
  removeButton.id = `b${cV}`;

  if (aR == true) {
    bookCard.classList.add("card-aRead-T");

    readStatusDetail.textContent = `Read`;
  } else if (aR == false) {
    bookCard.classList.add("card-aRead-F");

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
  rButton.setAttribute("class", "card-button");

  removeCard(rButton, bookID, cV);
  switchStatus(rsDet, bcId, bookCard);
};

/*removing button function */

removeCard = (rB, bID, cV) => {
  rB.addEventListener("click", () => {
    const tobeRemoved = document.getElementById(bID);
    tobeRemoved.remove();
    bookCount.innerText = `${cV}`;

    if (bookCount.innerText == 0) {
      resetCounter();
    }
  });
};

switchStatus = (rD, bookC, bcId) => {
  rD.addEventListener("click", () => {
    if (bookC.classList.contains("card-aRead-T")) {
      bcId.classList.replace("card-aRead-T", "card-aRead-F");
      currentBookCount = `${readBooks.textContent}`;
      booksRead.textContent = parseInt(currentBookCount) - 1;
    } else if (bookC.classList.contains("card-aRead-F")) {
      bcId.classList.replace("card-aRead-F", "card-aRead-T");
      console.log(readBooks.textContent);
      currentBookCount = `${readBooks.textContent}`;
      booksRead.textContent = parseInt(currentBookCount) + 1;
    }
    changeTextContent(rD);
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

changeTextContent = (readStatus) => {
  if (readStatus.textContent == "Read") {
    readStatus.textContent = "Unread";
  } else if (readStatus.textContent == "Unread") {
    readStatus.textContent = "Read";
  }
};
bookCounter = (cV, aR) => {
  if (cV == -1) {
    cV = cV + 2;
  } else {
    cV = cV + 1;
  }

  bookCount.innerText = `${cV}`;

  return cV;
};

resetCounter = () => {
  counter = -1;
};

readBooksCounter = () => {
  booksRead = booksRead + 1;
  readBooks.textContent = booksRead;
  return booksRead;
};
