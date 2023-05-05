// Obtener elementos del DOM
const newTaskForm = document.querySelector(".new-task form");
const pendingTasksList = document.getElementById("pending-tasks");
const inProgressTasksList = document.getElementById("in-progress-tasks");
const completedTasksList = document.getElementById("completed-tasks");

// Obtener tareas almacenadas en localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || {
  pending: [],
  inProgress: [],
  completed: [],
};

// Función para actualizar las tareas almacenadas en localStorage
function updateTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Función para agregar una tarea a la lista de tareas pendientes
function addTask(title, description, dueDate) {
  const task = {
    title,
    description,
    dueDate,
    status: "pending",
  };
  tasks.pending.push(task);
  updateTasks();
  renderTasks();
}

// Función para editar una tarea existente
function editTask(id, title, description, dueDate, status) {
  const task = tasks[status].find((task) => task.id === id);
  task.title = title;
  task.description = description;
  task.dueDate = dueDate;
  if (task.status !== status) {
    tasks[task.status] = tasks[task.status].filter((task) => task.id !== id);
    task.status = status;
    tasks[status].push(task);
  }
  updateTasks();
  renderTasks();
}

// Función para eliminar una tarea
function deleteTask(id, status) {
  tasks[status] = tasks[status].filter((task) => task.id !== id);
  updateTasks();
  renderTasks();
}

// Función para renderizar las tareas en las diferentes listas
// Función para renderizar las tareas en las diferentes listas
function renderTasks() {
  pendingTasksList.innerHTML = "";
  inProgressTasksList.innerHTML = "";
  completedTasksList.innerHTML = "";
  tasks.pending.forEach((task) => {
    const li = document.createElement("li");
    li.classList.add("task");
    li.dataset.id = task.id;
    li.dataset.status = "pending";
    li.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <p>Fecha de vencimiento: ${task.dueDate}</p>
      <div class="actions">
        <button class="edit-btn">Editar</button>
        <button class="delete-btn">Eliminar</button>
      </div>
    `;
    pendingTasksList.appendChild(li);
  });
  tasks.inProgress.forEach((task) => {
    const li = document.createElement("li");
    li.classList.add("task", "in-progress");
    li.dataset.id = task.id;
    li.dataset.status = "inProgress";
    li.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <p>Fecha de vencimiento: ${task.dueDate}</p>
      <div class="actions">
        <button class="edit-btn">Editar</button>
        <button class="delete-btn">Eliminar</button>
      </div>
    `;
    inProgressTasksList.appendChild(li);
  });
  tasks.completed.forEach((task) => {
    const li = document.createElement("li");
    li.classList.add("task", "done");
    li.dataset.id = task.id;
    li.dataset.status = "completed";
    li.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <p>Fecha de vencimiento: ${task.dueDate}</p>
      <div class="actions">
        <button class="edit-btn">Editar</button>
        <button class="delete-btn">Eliminar</button>
      </div>
    `;
    completedTasksList.appendChild(li);
  });

  // Agregar eventos para editar y eliminar tareas
  document.querySelectorAll(".task").forEach((task) => {
    task.querySelector(".edit-btn").addEventListener("click", () => {
      const form = document.querySelector(".edit-task form");
      form.querySelector('input[name="title"]').value =
        task.querySelector("h3").textContent;
      form.querySelector('textarea[name="description"]').value =
        task.querySelector("p:nth-of-type(1)").textContent;
      form.querySelector('input[name="due-date"]').value = task
        .querySelector("p:nth-of-type(2)")
        .textContent.replace("Fecha de vencimiento: ", "");
      form.querySelector(
        'input[name="status"][value="' + task.dataset.status + '"]'
      ).checked = true;
      form.dataset.id = task.dataset.id;
      form.dataset.status = task.dataset.status;
      document.querySelector(".edit-task").classList.add("active");
    });

    task.querySelector(".delete-btn").addEventListener("click", () => {
      const id = task.dataset.id;
      const status = task.dataset.status;
      deleteTask(id, status);
    });
  });
}

// Agregar evento para crear una nueva tarea
newTaskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = event.target.querySelector('input[name="title"]');

  console.log(title);
  const description = event.target.querySelector(
    'textarea[name="description"]'
  ).value;
  const dueDate = event.target.querySelector('input[name="due-date"]');
  addTask(title, description, dueDate);
  event.target.reset();
});

//
