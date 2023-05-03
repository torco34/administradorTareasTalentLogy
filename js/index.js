const inputTitulo = document.getElementById("titulo");
const textarea = document.getElementById("descripcion");
const inputFecha = document.getElementById("fecha");
const formulario = document.getElementById("formulario-tarea");
const listPendiente = document.getElementById("lista-pendientes");
const listaProceso = document.getElementById("lista-progreso");
const listaCompleta = document.getElementById("lista-completadas");

let notas = JSON.parse(localStorage.getItem("notas")) || {
  pendiente: [],
  progreso: [],
  completas: [],
};
console.log(notas);
function crearlocalStorage() {
  notas.pendiente.forEach((tarea) => {
    const tareaElement = createTaskElement(tarea);
    listPendiente.appendChild(tareaElement);
  });
  notas.progreso.forEach((tarea) => {
    const tareaElement = createTaskElement(tarea);
    listaProceso.appendChild(tareaElement);
  });
  notas.completas.forEach((tarea) => {
    const tareaElement = createTaskElement(tarea);
    listaCompleta.appendChild(tareaElement);
  });
}

crearlocalStorage();
// En esta función se crea la card

function crearLista() {
  const titulo = inputTitulo.value;
  const texto = textarea.value;
  const fecha = inputFecha.value;
  const card = `
<div class="card">
 <div class="card-body">
   <h5 class="card-title">${titulo}</h5>
    <p class="card-text">${texto}</p>
    <div class="card-footer text-body-secondary">
    ${fecha}
    <button class="btn btn-dark">Eliminar</button>
  </div>
 </div>
</div>`;
  listPendiente.innerHTML += card;
}

// función crear el evento
formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  crearLista();
});
