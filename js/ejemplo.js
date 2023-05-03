
const formulario = document.querySelector("#formulario-tarea");
const inputTitle = document.querySelector("#titulo");
const inputDescripcion = document.querySelector("#descripcion");
const fecha = document.querySelector("#fecha");
const listPendiente = document.querySelector("#lista-pendientes");
const enProgreso = document.querySelector("#lista-en-progreso");
const completado = document.querySelector("#lista-completadas");
console.log(formulario);
console.log(inputTitle);
console.log(inputDescripcion);
console.log(fecha);
console.log(listPendiente);
console.log(enProgreso);
// Obtener las tareas almacenadas en localStorage
let notas = JSON.parse(localStorage.getItem("notas")) || {
  pending: [],
  inProgress: [],
  completed: [],
};
// Función para renderizar las tareas en el DOM
function renderTareas() {
  listPendiente.innerHTML = "";
  enProgreso.innerHTML = "";
  completado.innerHTML = "";
  // creando local
  notas.pending.forEach((tarea) => {
    const tareaElement = createTaskElement(tarea);
    listPendiente.appendChild(tareaElement);
    pendingTasks;
  });
  // creando local
  notas.inProgress.forEach((tarea) => {
    const tareaElement = createTaskElement(tarea);
    enProgreso.appendChild(tareaElement);
  });
  //creado local
  notas.completed.forEach((tarea) => {
    const tareaElement = createTaskElement(tarea);
    completado.appendChild(tareaElement);
  });
}

// console.log(renderTareas());

// Función para crear un elemento de tarea

function createTarea(task) {
  const tareaElement = document.createElement("li");
  tareaElement.classList.add("task");
  tareaElement.innerHTML = `
     <h3>${task.title}</h3>
     <p>${task.description}</p>
    <p>${task.dueDate}</p>
    <button class="delete-button">Eliminar</button>
  `;
  console.log(tareaElement);

  // Agregar evento de clic al botón de eliminar
  const deleteButton = taskElement.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => {
    deleteTask(task);
  });
  // Agregar evento de arrastrar y soltar para mover la tarea
  tareaElement.addEventListener("dragstart", () => {
    tareaElement.classList.add("dragging");
  });

  tareaElement.addEventListener("dragend", () => {
    tareaElement.classList.remove("dragging");
    moveTask(task, tareaElement.parentNode.id);
  });
  return tareaElement;
}
// Función para agregar una nueva tarea addtask
function addTareas(title, description, dueDate) {
  const tarea = { title, description, dueDate };
  notas.pending.push(tarea);
  localStorage.setItem("notas", JSON.stringify(notas));
  renderTareas();
}

// Función para eliminar una tarea
function deleteTask(tarea) {
  const taskList = getTaskList(tarea);
  const index = taskList.findIndex((t) => t === tarea);
  taskList.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notas));
  createTarea();
  // aqui habia  renderTasks();
}

// Función para mover una tarea a otra lista
function moveTask(tarea, list) {
  const taskList = getTaskList(tarea);
  const index = taskList.findIndex((t) => t === tarea);
  taskList.splice(index, 1);
  notas[list].push(task);
  localStorage.setItem("notas", JSON.stringify(notas));
  createTarea();
}

// Función para obtener la lista de tareas de una tarea dada
function getTaskList(tarea) {
  if (tarea.pending.includes(tarea)) {
    return tarea.pending;
  } else if (tarea.inProgress.includes(tarea)) {
    return tarea.inProgress;
  } else if (tarea.completed.includes(tarea)) {
    return tarea.completed;
  }
}
formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = taskTitle.value.trim();
  const description = tareaDescription.value.trim();
  const dueDate = taskDueDate.value.trim();

  if (title && description && dueDate) {
    addTask(title, description, dueDate);
    taskTitle.value = "";
    taskDescription.value = "";
    taskDueDate.value = "";
  } else {
    alert("Por favor complete todos los campos.");
  }
});