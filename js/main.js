const formularioTarea = document.querySelector("#formulario-tarea");
const inputTitulo = document.querySelector("#titulo");
const inputDescripcion = document.querySelector("#descripcion");
const inputFecha = document.querySelector("#fecha");
const listaPendientes = document.querySelector("#lista-pendientes");
const listaEnProgreso = document.querySelector("#lista-en-progreso");
const listaCompletadas = document.querySelector("#lista-completadas");
// Crear array vacío para almacenar las tareas
let tareas = [];
localStorage.setItem("notes", JSON.stringify(notes));
// Función para crear una tarea
function crearTarea(titulo, descripcion, fecha) {
  const tarea = {
    id: Date.now(),
    titulo,
    descripcion,
    fecha,
    lista: "pendientes",
  };
  tareas.push(tarea);
  mostrarTareas();
}
// Función para mostrar las tareas en las diferentes listas
function mostrarTareas() {
  listaPendientes.innerHTML = "";
  listaEnProgreso.innerHTML = "";
  listaCompletadas.innerHTML = "";
  tareas.forEach((tarea) => {
    const itemTarea = document.createElement("li");
    console.log(itemTarea);
    itemTarea.innerHTML = `
        <div class=" card-javascript">
        <strong class="">${tarea.titulo}</strong>
        <p>${tarea.descripcion}</p>
        <p>${tarea.fecha}</p></div>
      `;
    console.log(itemTarea.innerHTML);
    itemTarea.draggable = true;
    console.log(itemTarea.draggable);
    itemTarea.addEventListener("dragstart", (e) => {
      console.log(itemTarea);
      e.dataTransfer.setData("text/plain", tarea.id);
      e.currentTarget.classList.add("dragging");
      console.log("hola mundo");
    });
    itemTarea.addEventListener("dragend", (e) => {
      e.currentTarget.classList.remove("dragging");
    });
    switch (tarea.lista) {
      case "pendientes":
        listaPendientes.appendChild(itemTarea);
        break;
      case "en-progreso":
        listaEnProgreso.appendChild(itemTarea);
        break;
      case "completadas":
        listaCompletadas.appendChild(itemTarea);
        break;
    }
  });
}
console.log(mostrarTareas());
function moverTarea(id, lista) {
  const tarea = tareas.find((t) => t.id == id);
  tarea.lista = lista;
  mostrarTareas();
}
// Evento para enviar el formulario y agregar una nueva tarea
formularioTarea.addEventListener("submit", (e) => {
  e.preventDefault();
  crearTarea(inputTitulo.value, inputDescripcion.value, inputFecha.value);
  formularioTarea.reset();
});
listaPendientes.addEventListener("dragover", (e) => {
  e.preventDefault();
  const tarea = document.querySelector(".dragging");
  listaPendientes.appendChild(tarea);
  moverTarea(tarea.dataset.id, "pendientes");
});
listaEnProgreso.addEventListener("dragover", (e) => {
  e.preventDefault();
  const tarea = document.querySelector(".dragging");
  listaEnProgreso.appendChild(tarea);
  moverTarea(tarea.dataset.id, "en-progreso");
});
listaCompletadas.addEventListener("dragover", (e) => {
  e.preventDefault();
  const tarea = document.querySelector(".dragging");
  listaCompletadas.appendChild(tarea);
  moverTarea(tarea.dataset.id, "completadas");
});
function moverAEstadoEnProgreso(tareaId) {
  // Buscar la tarea correspondiente en el array de tareas
  const tarea = tareas.find((t) => t.id === tareaId);

  // Cambiar el estado de la tarea
  tarea.estado = "en-progreso";

  // Actualizar la lista de tareas en la página
  mostrarTareas();
}

// Evento para permitir arrastrar y soltar tareas para moverlas entre diferentes listas
listaEnProgreso.addEventListener("dragover", (e) => {
  e.preventDefault();
  const tarea = document.querySelector(".dragging");
  listaEnProgreso.appendChild(tarea);

  // Mover la tarea a la lista "En Progreso" en el array de tareas
  moverAEstadoEnProgreso(tarea.dataset.id);
});
