//Define UI Vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all events listeners
loadEventListeners();

function loadEventListeners() {
  //Add task event
  form.addEventListener('submit', addTask);

}

function addTask(e) {
  if(taskInput.value === ''){
    aleart('add a task');
  }

  //create li element
  const li = document.createElement('li');
  li.className = 'collection-item';
  //create text node and append
  li.appendChild(document.createTextNode(taskInput.value));
  //create new link element
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  // add icon html
  link.innerHTML= '<i class="fa fa-remove"></i>';
  li.appendChild(link);

  //append li to ul

  taskList.appendChild(li);
  //Clear input
  taskInput.value = '';
  e.preventDefault();
}