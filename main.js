document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
  let input = document.getElementById('taskInput');
  let taskText = input.value.trim();

  if (!taskText) {
    alert('Please enter a task.');
    return;
  }

  let li = document.createElement('li');
  li.innerHTML = `<span onclick="toggleComplete(this)">${taskText}</span><button onclick="removeTask(this, '${taskText}')">X</button>`;
  document.getElementById('taskList').appendChild(li);
  //   console.log(" input >> ", taskText);
  saveTask(taskText);
  input.value = '';
}

function removeTask(button, taskText) {
  let tasks = getTaskFromStorage();
  tasks = tasks.filter((task) => task.text !== taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  button.parentElement.remove();
}

function toggleComplete(task) {
  task.classList.toggle('completed');
  updateTask(task);
}

function saveTask(taskText) {
  let tasks = getTaskFromStorage();
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));
  console.log('Tasks: ', tasks);
  // tasks.push(taskText);
}

function getTaskFromStorage() {
  let tasks = localStorage.getItem('tasks');
  try {
    tasks = JSON.parse(tasks) || [];
  } catch (error) {
    tasks = [];
  }

  return tasks;
}

function loadTasks() {
  let tasks = getTaskFromStorage();
  tasks.forEach((task) => {
    let li = document.createElement('li');
    li.innerHTML = `<span class="${
      task.completed ? 'completed' : ''
    }" onclick="toggleComplete(this)">${
      task.text
    }</span><button onclick="removeTask(this, '${task.text}')">X</button>`;
    document.getElementById('taskList').appendChild(li);
  });
}

function updateTask(taskText) {
  console.log('Updating task: ', taskText.innerHTML);
  let tasks = getTaskFromStorage();
  tasks.forEach((task) => {
    if (task.text === taskText.innerHTML) {
      task.completed = !task.completed;
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
  console.log('Tasks: ', tasks);
}
