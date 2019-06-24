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
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);
  //Filter task event
  filter.addEventListener('keyup', filterTasks)

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

// Remove Task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?')){
    e.target.parentElement.parentElement.remove();
    };
  }
}

function clearTasks(e){
  if(e.target.classList.contains('clear-tasks')){
    while(taskList.firstChild){
      taskList.removeChild(taskList.firstChild);
    }
  }
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