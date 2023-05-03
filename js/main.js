// const pendienteList = document.querySelector('#pendiente-list');
// const progresoList = document.querySelector('#progreso-list');
// const completadoList = document.querySelector('#completado-list');

// function agregarTarea() {
//   const titulo = document.querySelector('#titulo').value;
//   const descripcion = document.querySelector('#descripcion').value;
//   const fecha = document.querySelector('#fecha').value;

//   const tarea = crearTarea(titulo, descripcion, fecha);

//   pendienteList.appendChild(tarea);
// }

// function crearTarea(titulo, descripcion, fecha) {
//   const tarea = document.createElement('div');
//   tarea.classList.add('tarea');

//   const tituloElemento = document.createElement('h2');
//   tituloElemento.textContent = titulo;

//   const descripcionElemento = document.createElement('p');
//   descripcionElemento.textContent = descripcion;

//   const fechaElemento = document.createElement('p');
//   fechaElemento.textContent = fecha;

//   tarea.appendChild(tituloElemento);
//   tarea.appendChild(descripcionElemento);
//   tarea.appendChild(fechaElemento);

//   agregarBotonMover(tarea);

//   return tarea;
// }

// function agregarBotonMover(tarea) {
//   const moverBoton = document.createElement('button');
//   moverBoton.textContent = 'Mover';
//   moverBoton.classList.add('mover-boton');

//   moverBoton.addEventListener('click', () => {
//     const listaActual = tarea.parentNode;
//     switch (listaActual) {
//       case pendienteList:
//         progresoList.appendChild(tarea);
//         break;
//       case progresoList:
//         completadoList.appendChild(tarea);
//         break;
//       case completadoList:
//         pendienteList.appendChild(tarea);
//         break;
//     }
//   });

//   tarea.appendChild(moverBoton);
// }

// const agregarBoton = document.querySelector('#agregar-boton');
// agregarBoton.addEventListener('click', agregarTarea);

// const editarBotones = document.querySelectorAll('.editar-boton');
// editarBotones.forEach(boton => {
//   boton.addEventListener('click', () => {
//     const tarea = boton.parentNode;
//     const titulo = tarea.querySelector('h2').textContent;
//     const descripcion = tarea.querySelector('p').textContent;
//     const fecha = tarea.querySelectorAll('p')[1].textContent;

//     // Agregar formulario para editar tarea
//     const formulario = document.createElement('form');

//     const tituloInput = document.createElement('input');
//     tituloInput.setAttribute('type', 'text');
//     tituloInput.setAttribute('placeholder', 'Título');
//     tituloInput.setAttribute('value', titulo);

//     const descripcionInput = document.createElement('textarea');
//     descripcionInput.setAttribute('placeholder', 'Descripción');
//     descripcionInput.textContent = descripcion;

//     const fechaInput = document.createElement('input');
//     fechaInput.setAttribute('type', 'date');
//     fechaInput.setAttribute('value', fecha);

//     const guardarBoton = document.createElement('button');
//     guardarBoton.textContent = 'Guardar';
//     guardarBoton.classList.add('guardar-boton');

//     guardarBoton.addEventListener('click', () => {
//       const nuevoTitulo = tituloInput.value;
//       const nuevaDescripcion = descripcionInput.value;
//       const nuevaFecha = fechaInput.value;

//       tarea.querySelector('h2').textContent = nuevoTitulo;
//       tarea.querySelector('p').textContent = nuevaDescripcion;
//       tarea.querySelectorAll('p')[1].textContent = nuevaFecha;

//       tarea.removeChild(formulario);
//     });

//     const cancelarBoton = document.createElement('button');
//     cancelarBoton.textContent = 'Cancelar';
//     cancelarBoton.classList.add('cancelar-boton');

//     cancelarBoton.addEventListener('click', () => {
//       tarea.removeChild(formulario);
//     });

//     formulario.appendChild(tituloInput);
//     formulario.appendChild(descripcionInput);
//     formulario.appendChild(fechaInput);
//     formulario.appendChild(guardarBoton);
//     formulario.appendChild(cancelarBoton);

//     tarea.appendChild(formulario);
//   });
// });

const formularioTarea = document.querySelector("#formulario-tarea");
const inputTitulo = document.querySelector("#titulo");
const inputDescripcion = document.querySelector("#descripcion");
const inputFecha = document.querySelector("#fecha");
const listaPendientes = document.querySelector("#lista-pendientes");
const listaEnProgreso = document.querySelector("#lista-en-progreso");
const listaCompletadas = document.querySelector("#lista-completadas");
// Crear array vacío para almacenar las tareas
let tareas = [];
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
  console.log(tarea);
}
// crearTarea();
// Función para mostrar las tareas en las diferentes listas
function mostrarTareas() {
  listaPendientes.innerHTML = "";
  listaEnProgreso.innerHTML = "";
  listaCompletadas.innerHTML = "";
  tareas.forEach((tarea) => {
    const itemTarea = document.createElement("li");
    console.log(itemTarea);
    itemTarea.innerHTML = `
        <strong>${tarea.titulo}</strong>
        <p>${tarea.descripcion}</p>
        <p>${tarea.fecha}</p>
      `;
    // console.log(itemTarea.innerHTML);
    itemTarea.draggable = true;
    // console.log(itemTarea.draggable);
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
      case "progreso":
        listaEnProgreso.appendChild(itemTarea);
        break;
      case "completadas":
        listaCompletadas.appendChild(itemTarea);
        break;
    }
  });
}
// console.log(mostrarTareas());

function moverTarea(id, lista) {
  let tarea = tareas.find((t) => t.id === id);

  tarea.lista = lista;
  mostrarTareas();
}
// Evento para enviar el formulario y agregar una nueva tarea
formularioTarea.addEventListener("submit", (e) => {
  e.preventDefault();
  crearTarea(inputTitulo.value, inputDescripcion.value, inputFecha.value);
  // crearTarea(inputTitulo.value, inputDescripcion.value, inputFecha.value);
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
  moverTarea(tarea.dataset.id, "progreso");
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
  tarea.estado = "progreso";

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
