const noteContainer = document.getElementById("lista-pendientes");
const form = document.querySelector("form");
const titleInput = document.getElementById("title");
const bodyInput = document.getElementById("body");
const listaPendientes = document.querySelector("#lista-pendientes");
const listaEnProgreso = document.querySelector("#lista-en-progreso");
const listaCompletadas = document.querySelector("#lista-completadas");

// const FECHA = new Date();
// fecha.innerHTML = FECHA.toLocaleDateString("es", {
//   weekday: "long",
//   month: "short",
//   day: "numeric",
// });

let tareas = [];
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
// Obtener las notas del localStorage
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Función para mostrar las notas en la página
function showNotes() {
  // Vaciar el contenedor de notas

  noteContainer.innerHTML = "";

  // Crear una tarjeta para cada nota
  notes.forEach((note, index) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const title = document.createElement("h3");

    title.textContent = note.title;

    const body = document.createElement("p");
    body.textContent = note.body;

    // Botón para eliminar la nota
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();
      notes.splice(index, 1);
      localStorage.setItem("notes", JSON.stringify(notes));
      showNotes();
    });

    // Botón para editar la nota
    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.addEventListener("click", (e) => {
      e.preventDefault();
      titleInput.value = note.title;
      bodyInput.value = note.body;
      deleteButton.disabled = true;
      editButton.disabled = true;
      //   form.removeEventListener("submit", addNote);
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        note.title = titleInput.value;
        note.body = bodyInput.value;
        localStorage.setItem("notes", JSON.stringify(notes));
        titleInput.value = "";
        bodyInput.value = "";
        showNotes();
        deleteButton.disabled = false;
        editButton.disabled = false;
        form.removeEventListener("submit", editNote);
        form.addEventListener("submit", addNote);
      });
    });

    // Agregar los elementos a la tarjeta y la tarjeta al contenedor
    card.appendChild(title);
    card.appendChild(body);
    card.appendChild(deleteButton);
    card.appendChild(editButton);
    noteContainer.appendChild(card);
    card.draggable = true;
    // console.log(itemTarea.draggable);
    card.addEventListener("dragstart", (e) => {
      console.log(noteContainer);
      e.dataTransfer.setData("text/plain", tarea.id);
      e.currentTarget.classList.add("dragging");
    });
    card.addEventListener("dragend", (e) => {
      e.currentTarget.classList.remove("dragging");
    });
    switch (card.lista) {
      case "pendientes":
        listaPendientes.appendChild(noteContainer);
        break;
      case "progreso":
        listaEnProgreso.appendChild(noteContainer);
        break;
      case "completadas":
        listaCompletadas.appendChild(noteContainer);
        break;
    }
  });
}

// Función para agregar una nota
function addNote() {
  const title = titleInput.value;
  const body = bodyInput.value;

  if (title && body) {
    const note = { title, body };
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));
    titleInput.value = "";
    bodyInput.value = "";
    showNotes();
  }
}

// Función para editar una nota
function editNote(event) {
  event.preventDefault();
  // Por ahora no hay nada aquí
}

// Mostrar las notas en la página cuando se carga
showNotes();

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
  moverTarea(tarea.dataset.id, "progreso");
});
listaCompletadas.addEventListener("dragover", (e) => {
  e.preventDefault();
  const tarea = document.querySelector(".dragging");
  listaCompletadas.appendChild(tarea);
  moverTarea(tarea.dataset.id, "completadas");
});

// Escuchar el envío del formulario de agregar nota
form.addEventListener("submit", addNote);
