/** @format */

const myLibrary = []; //declared an empty array to push the objects
const plusButton = document.getElementById("plus_icon");
const displayArea = document.getElementById("d1");
let inputValues = document.querySelectorAll('input[type="text"]');
let counter = -1;
let bookCounterValue = 0;
let removedCount = 0;
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
  bookCounter(counter);
  readCounter(aRead);
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
  removeCard(rButton, bookID, cV);
  switchStatus(rsDet, bcId);
};

/*removing button function */

removeCard = (rB, bID, cV) => {
  rB.addEventListener("click", () => {
    const tobeRemoved = document.getElementById(bID);
    tobeRemoved.remove();
    bookCount.innerText = `${cV}`;

    if (bookCount.innerText == 0) {
      console.log("its 0 now");
      resetCounter();
    }
  });
};

switchStatus = (rD, bId) => {
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

bookCounter = (cV) => {
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

readCounter = (aR) => {
  let readBookCount = 0;

  if (aR == true) {
    readBookCount = readBookCount + 1;
  }

  readBooks.innerText = `${readBookCount}`;
};
