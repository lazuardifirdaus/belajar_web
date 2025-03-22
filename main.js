function addTask() {
  let input = document.getElementById("taskInput");
  let taskText = input.value.trim();

  if (!taskText) {
    alert("Please enter a task.");
    return;
  }

  let li = document.createElement("li");
  li.innerHTML = `<span onclick="toggleComplete(this)">${taskText}</span><button onclick="removeTask(this)">X</button>`;
  document.getElementById("taskList").appendChild(li);
  //   console.log(" input >> ", taskText);

  input.value = "";
}

function removeTask(button) {
  button.parentElement.remove();
}

function toggleComplete(task) {
  console.log("Task class: ", task.classList);
  task.classList.toggle("completed");
}
