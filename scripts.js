const table = document.querySelector('.table-contents');
let book1 = new Book('You Don\'t Know JS: Scope & Closures', 'Kyle Simpson', '98', 'Read');
let book2 = new Book('You Don\'t Know JS: this & Object Prototypes', 'Kyle Simpson', '176', 'Read');
let book3 = new Book('You Don\'t Know JS: Async & Performance', 'Kyle Simpson', '298', 'Not Read');
let myLibrary = [book1, book2, book3];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
    const nbTitle = document.querySelector('#nb-title').value;
    const nbAuthor = document.querySelector('#nb-author').value;
    const nbPages = document.querySelector('#nb-pages').value;
    const readOpt = document.getElementsByName('nb-read');
    readOpt.forEach(function(opt) {
        if (opt.checked) {
            nbRead = opt.value;
        }
    });

    const newBook = new Book(nbTitle, nbAuthor, nbPages, nbRead);
    myLibrary.push(newBook);
    document.querySelector('.nb-form').reset();
    clearTable();
    render(myLibrary);
}

function appendToTable(tag, value, valueId) {
    const element = document.createElement(tag);
    const t = document.createTextNode(value);
    element.id = valueId;
    if (tag === 'button') {
        element.classList.add('remove-btn');
    }
    element.appendChild(t);
    table.appendChild(element);
}

function render(books) {
    books.forEach(function(Book) {
        //append book's # into table
        const bookId = books.indexOf(Book) + 1;
        const nbNumber = bookId;
        appendToTable('span', nbNumber, bookId);
        
        //append book's Title, Author, Pages, and Read (status) into table
        for(let value in Book) {
            appendToTable('span', Book[value], bookId);
        }

        //append book's "Remove" button into table
        appendToTable('button', '×', bookId);
    });
}

function clearTable() {
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
}

const addBookBtn = document.querySelector('#add-book');
addBookBtn.addEventListener('click', addBookToLibrary);

//"Remove" button script
document.addEventListener('click', function(e) {
    if (e.target.className === 'remove-btn') {
        const bIndex = parseInt(e.target.id) - 1;
        myLibrary.splice(bIndex, 1);
        clearTable();
        render(myLibrary);
    }
});

document.onload = render(myLibrary);

//form show/hide script
const formBtn = document.querySelector('.form-btn');
formBtn.addEventListener('click', function() {
    this.classList.toggle('active');
    const formContainer = document.querySelector('.form-container');
    if (formContainer.style.maxHeight) {
        formContainer.style.maxHeight = null;
    } else {
        formContainer.style.maxHeight = formContainer.scrollHeight + 'px';
    }
});