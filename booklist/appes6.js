class Book {
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI{
  addBookToList(book){
    const list = document.getElementById('book-list');
    //create tr element
    const row = document.createElement('tr');
    //insert cols
    row.innerHTML = `<td>${book.title}</td>
                      <td>${book.author}</td>
                      <td>${book.isbn}</td>
                      <td><a href="#" class="delete">X</a></td>`;
    list.appendChild(row);
  }
  showAlert(msg, className){
    //construct the element to show alert
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    // Add Text
    div.appendChild(document.createTextNode(msg));

    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');

    container.insertBefore(div,form);

    setTimeout(function(){
      document.querySelector('.alert').remove();
    },3000);
  }

    deleteBook(target){
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
    }
  }
  
    clearFields(){
      document.getElementById('title').value = '';
      document.getElementById('author').value = '';
      document.getElementById('isbn').value = '';
  }

}


class Store {
  static getBooks(){
    let books;
    if(localStorage.getItem('books') === null){
      books = [];
    } else{
      books = JSON.parse(localStorage.getItem('books'))
    }
    return books;
  }
  static displayBooks(){
    const books = Store.getBooks();
    const ui = new UI();
    books.forEach(function(book){

      ui.addBookToList(book);
    })
  }
  static addBook(book){
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books',JSON.stringify(books));
  }
  static removeBook(target, isbn){
    if(target.className === 'delete'){
      let books = Store.getBooks();
      books.forEach((book,index)=>{
        if(book.isbn === isbn){
          books.splice(index,1);
        }
      })
      localStorage.setItem('books',JSON.stringify(books));
    }
  }

}


document.addEventListener('DOMContentLoaded',Store.displayBooks)

document.querySelector('#book-form').addEventListener('submit', 
function(e){
  //get form values
  const title = document.querySelector('#title').value,
        author = document.querySelector('#author').value,
        isbn = document.querySelector('#isbn').value

  //instantiate book
  const book = new Book(title, author, isbn);
  const ui = new UI();
  //validate
  if(title === '' || author === '' || isbn ===''){
    ui.showAlert('Please fill in all fields', 'error');
  } else{
    ui.addBookToList(book);
    Store.addBook(book);
    ui.clearFields();
    ui.showAlert(`${book.title} has been added`, 'success');
  }
  e.preventDefault();
});

document.querySelector('#book-list').addEventListener('click',(e)=>{
  const ui = new UI();
  ui.deleteBook(e.target);
  Store.removeBook(e.target, e.target.parentElement.previousElementSibling.textContent)
  ui.showAlert('book removed','success');
  e.preventDefault();
})