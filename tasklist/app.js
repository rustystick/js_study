//Define UI Vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all events listeners
loadEventListeners();

function loadEventListeners() {
  //DOM load event
  document.addEventListener('DOMContentLoaded', getTasksFromStorage);
  //Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);
  //Filter task event
  filter.addEventListener('keyup', filterTasks)
  
}

function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  return tasks
}

function getTasksFromStorage(){
  tasks = getTasks();
  tasks.forEach((task)=>{
    const li = document.createElement('li');
    li.className = 'collection-item';
    //create text node and append
    li.appendChild(document.createTextNode(task));
    //create new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML= '<i class="fa fa-remove"></i>';
    li.appendChild(link);
  
    //append li to ul
  
    taskList.appendChild(li);
  })
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
  storeTaskInLocalStorage(taskInput.value);
  //Clear input
  taskInput.value = '';
  e.preventDefault();
}

function storeTaskInLocalStorage(task){
  tasks = getTasks();
  tasks.push(task);
  localStorage.setItem('tasks',JSON.stringify(tasks));
}



// Remove Task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?')){
    e.target.parentElement.parentElement.remove();
    //remove from LS
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    };
  }
}

function removeTaskFromLocalStorage(task){
  tasks = getTasks();
  tasks.splice(tasks.indexOf(task.textContent),1);
  localStorage.setItem('tasks',JSON.stringify(tasks));
}


function clearTasks(e){
  if(e.target.classList.contains('clear-tasks')){
    document.querySelectorAll('.collection-item').forEach((task)=>{
      task.remove();
    });
  }
  clearLocalStorage();
}

function clearLocalStorage(){
  localStorage.clear();
}

function filterTasks(e){
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach((task)=>{
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    }
    else{
      task.style.display = 'none';
    }
  })
}