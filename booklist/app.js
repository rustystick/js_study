//Book Constructor

function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI Constructor

function UI(){}

UI.prototype.addBookToList = function(book){
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

UI.prototype.showAlert = function(msg, className){
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

UI.prototype.deleteBook = function (target){
  if(target.className === 'delete'){
    target.parentElement.parentElement.remove();
  }
}

UI.prototype.clearFields = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}



//Event Listeners

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
    ui.clearFields();
    ui.showAlert(`${book.title} has been added`, 'success');
  }
  e.preventDefault();
});

document.querySelector('#book-list').addEventListener('click',(e)=>{
  const ui = new UI();
  ui.deleteBook(e.target);
  ui.showAlert('book removed','success');
  e.preventDefault();
})