function Book(name, author, pages, read, cover){
    this.id = crypto.randomUUID();
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.cover = cover;
}

Book.prototype.readStatus = function() {
    this.read = !this.read;
}

const myLibrary = [];

document.getElementById('new-book-btn').addEventListener('click', () => {
  document.getElementById('book-dialog').showModal();
});

document.getElementById('cancel-btn').addEventListener('click', () => {
  document.getElementById('book-dialog').close()
});



function addBook(){
  const form = document.querySelector("#book-form");
  form.addEventListener("submit", function(e){
    e.preventDefault();

    const title = form.querySelector("#title").value.trim();
    const author = form.querySelector("#author").value.trim();
    const pages = parseInt(form.querySelector("#pages").value);
    const cover = form.querySelector("#cover").value.trim();
    const read = form.querySelector("#read").checked;

    const newBook = new Book(title, author, pages, read, cover);
    myLibrary.push(newBook);
    document.getElementById("book-dialog").close();
    form.reset();
    displayBooks();
  })
}



function displayBooks(){
  const container = document.querySelector("#books-container");
  container.innerHTML = "";

  myLibrary.forEach((b) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.id = b.id;
    card.style.backgroundImage = `url(${b.cover})`;

    const title = document.createElement("h3");
    const titleLabel = document.createElement("span");
    titleLabel.textContent = "Title: ";
    titleLabel.style.fontWeight = "bold";

    const titleText = document.createElement("span");
    titleText.textContent = b.name;

    title.append(titleLabel, titleText);

    const author = document.createElement("h3");
    author.textContent = "Author: " + b.author;
    
    const pages = document.createElement("p");
    pages.textContent = "Pages: " + b.pages

    const read = document.createElement("p");
    read.textContent = b.read ? "Finished" : "Pending"
    
    const readButton = document.createElement("button");

    const deleteButton = document.createElement("button");

    readButton.textContent = "Toggle status"
    readButton.addEventListener("click", () => {
      b.readStatus();
      displayBooks();
    })

    deleteButton.textContent = "Delete book"
    deleteButton.addEventListener("click", () => {
      const index = myLibrary.findIndex(book => b.id == book.id);

      if(index !== -1){
        myLibrary.splice(index, 1);
        displayBooks();
        }
      }
    )

    const buttonWrapper = document.createElement("div");
    buttonWrapper.classList.add("action-buttons");
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    buttonWrapper.append(readButton, deleteButton);
    overlay.append(title, author, pages, read, buttonWrapper);
    card.appendChild(overlay);
    container.appendChild(card);
  })
}

function addSample(){
  const sampleBook = new Book("Blood Meridian", "Cormac Mccarthy", 337, true, "https://m.media-amazon.com/images/I/61n+2pky0rL.jpg");
  myLibrary.push(sampleBook);
  displayBooks();
}

addSample();
addBook();


