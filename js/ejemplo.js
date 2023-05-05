// Obtener elementos del DOM
const addTaskForm = document.querySelector(".add-task form");
const pendingTasksList = document.getElementById("pending-tasks");
const inProgressTasksList = document.getElementById("in-progress-tasks");
const completedTasksList = document.getElementById("completed-tasks");

// Escuchar el envío del formulario de agregar
addTaskForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Evitar el envío del formulario

  // Obtener los valores de los campos del formulario
  const taskTitle = document.getElementById("task-title").value;
  const taskDescription = document.getElementById("task-description").value;
  const taskDate = document.getElementById("task-date").value;

  // Crear un nuevo elemento de tarea
  const newTask = document.createElement("li");
  newTask.classList.add("task");
  newTask.draggable = true;
  newTask.innerHTML = `
		<h4>${taskTitle}</h4>
		<p>${taskDescription}</p>
		<span>Fecha de vencimiento: ${taskDate}</span>
		<select>
			<option value="pending">Pendiente</option>
			<option value="in-progress">En progreso</option>
			<option value="completed">Completado</option>
		</select>
	`;

  // Agregar el nuevo elemento de tarea a la lista "Pendiente"
  pendingTasksList.appendChild(newTask);

  // Limpiar los campos del formulario
  addTaskForm.reset();
});

// Escuchar el arrastrar y soltar de las tareas
let task;

function handleDragStart(event) {
  task = event.target;
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/html", task.outerHTML);
  task.classList.add("dragging");
}

function handleDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
  task.classList.add("over");
}

function handleDragLeave(event) {
  task.classList.remove("over");
}

function handleDrop(event) {
  event.preventDefault();
  task.classList.remove("dragging");
  task.classList.remove("over");

  // Obtener el valor del select al que se está moviendo la tarea
  const newTaskListId = event.target.parentElement.id;
  const newTaskList = document.getElementById(newTaskListId);

  // Crear un nuevo elemento de tarea a partir del HTML arrastrado
  const html = event.dataTransfer.getData("text/html");
  const newTask = document.createElement("li");
  newTask.classList.add("task");
  newTask.draggable = true;
  newTask.innerHTML = html;

  // Agregar el nuevo elemento de tarea a la lista correspondiente
  newTaskList.appendChild(newTask);

  // Eliminar la tarea original
  task.remove();
}

// Agregar los escuchadores de eventos para arrastrar y soltar
const tasks = document.querySelectorAll(".task");
tasks.forEach((task) => {
  task.addEventListener("dragstart", handleDragStart);
  task.addEventListener("dragover", handleDragOver);
  task.addEventListener("dragleave", handleDragLeave);
  task.addEventListener("drop", handleDrop);
});
