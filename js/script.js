const tasks = [];

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskName = taskInput.value.trim();

  if (taskName) {
    tasks.push({
      id: Date.now(),
      name: taskName,
      done: false
    });
    taskInput.value = "";
    renderTasks();
  }
}

function renderTasks() {
  const tbody = document.getElementById("taskTable").querySelector("tbody");
  tbody.innerHTML = "";

  tasks.forEach((task, index) => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = task.name;
    nameCell.style.width = "70%";
    nameCell.style.fontWeight = "bold";

    if (task.done) {
      nameCell.style.background = "#50A8F3";
      nameCell.style.textAlign = "left";
    }

    const statusCell = document.createElement("td");
    //statusCell.textContent = task.done ? "Done" : "Pending";

    const toggleCell = document.createElement("td");
    const toggleBtn = document.createElement("button");
    //toggleBtn.textContent = "check";
    toggleBtn.textContent = task.done ? "toggle " : "done";
toggleBtn.classList.add("tblebtn")

    toggleBtn.onclick = () => toggleTask(index);
    toggleCell.appendChild(toggleBtn);

    const deleteCell = document.createElement("td");
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => deleteTask(index);
    deleteCell.appendChild(deleteBtn);
    deleteBtn.classList.add("tblebtn")

    row.appendChild(nameCell);
    row.appendChild(statusCell);
    row.appendChild(toggleCell);
    row.appendChild(deleteCell);

    tbody.appendChild(row);
  });
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

setInterval(() => {
  const allDone = tasks.length > 0 && tasks.every(task => task.done);
  if (allDone) {
    console.log("All tasks done!");
  }
}, 10000);