/** @format */

const myLibrary = [];

function addNewBook(title, author, pages, alreadyRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.alreadyRead = alreadyRead;

  this.showInformation = function () {
    let result = `The book ${title} by ${author} has ${pages} and it is ${alreadyRead} that you already read the book.`; //best pratice to return the function and cosnole log it after calling the function

    return result;
  };
}

const newBook = new addNewBook("Harry Potter", "JK Rowling", "500", "yes");
newBook.showInformation();
console.log(newBook.showInformation());

function addBookToTheLibrary() {}
