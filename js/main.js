// Variables globales
let pendientes = document.getElementById("pendientes");
let enProceso = document.getElementById("enproceso");
let hechas = document.getElementById("hechas");
let tareas = [];
console.log(pendientes);

// Verificar si hay datos en localStorage
if (localStorage.getItem("tareas")) {
  tareas = JSON.parse(localStorage.getItem("tareas"));

  mostrarTareas();
}
tareas = JSON.parse(localStorage.getItem("tareas")) || {
  pendiente: [],
  progreso: [],
  completas: [],
};

// Función para agregar una tarea a la lista de tareas
function agregarTarea(event) {
  event.preventDefault();
  let titulo = document.getElementById("titulo").value;
  let descripcion = document.getElementById("descripcion").value;
  let fecha = document.getElementById("fecha").value;
  let tarea = {
    id: Date.now(),
    titulo: titulo,
    descripcion: descripcion,
    fecha: fecha,
    estado: "pendiente",
  };
  tareas.push(tarea);
  mostrarTareas();
  document.getElementById("titulo").value = "";
  document.getElementById("descripcion").value = "";
  document.getElementById("fecha").value = "";
  // Guardar datos en localStorage
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

// Función para mostrar la lista de tareas
function mostrarTareas() {
  pendientes.innerHTML = "";
  enProceso.innerHTML = "";
  hechas.innerHTML = "";
  for (let i = 0; i < tareas.length; i++) {
    let tarea = tareas[i];
    let divTarea = document.createElement("div");

    divTarea.id = tarea.id;
    divTarea.className = "tarea";
    divTarea.draggable = true;
    divTarea.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("id", e.target.id);
      e.currentTarget.classList.add("dragging");
    });
    divTarea.addEventListener("dragend", (e) => {
      e.currentTarget.classList.remove("dragging");
    });

    let h3 = document.createElement("h3");
    h3.classList = "color";
    h3.innerHTML = tarea.titulo;
    divTarea.appendChild(h3);
    let p = document.createElement("p");
   
    p.innerHTML = tarea.descripcion;
    divTarea.appendChild(p);
    let span = document.createElement("span");
    span.innerHTML = tarea.fecha;
    divTarea.appendChild(span);
    let divBotones = document.createElement("div");
    divBotones.className = "botones";
    let buttonEditar = document.createElement("button");
    buttonEditar.innerHTML = "Editar";
    buttonEditar.onclick = function () {
      editarTarea(this.parentNode.parentNode.id);
    };
    divBotones.appendChild(buttonEditar);
    let buttonEliminar = document.createElement("button");
    buttonEliminar.innerHTML = "Eliminar";
    buttonEliminar.onclick = function () {
      eliminarTarea(this.parentNode.parentNode.id);
    };
    divBotones.appendChild(buttonEliminar);
    divTarea.appendChild(divBotones);
    if (tarea.estado == "pendiente") {
      document.getElementById("pendientes").appendChild(divTarea);
    } else if (tarea.estado == "enproceso") {
      document.getElementById("enproceso").appendChild(divTarea);
    } else if (tarea.estado == "hecha") {
      document.getElementById("hechas").appendChild(divTarea);
    }

    divTarea.addEventListener("dragend", (e) => {
      e.currentTarget.classList.remove("dragging");
      const tareaId = e.currentTarget.id;
      let tarea;
      for (let i = 0; i < tareas.length; i++) {
        if (tareas[i].id == tareaId) {
          tarea = tareas[i];
          break;
        }
      }
      if (e.currentTarget.parentNode == pendientes) {
        tarea.estado = "pendiente";
      } else if (e.currentTarget.parentNode == enProceso) {
        tarea.estado = "enproceso";
      } else if (e.currentTarget.parentNode == hechas) {
        tarea.estado = "hecha";
      }
      localStorage.setItem("tareas", JSON.stringify(tareas));
    });
  }
}

// Función para eliminar una tarea de la lista de tareas
function eliminarTarea(id) {
  for (let i = 0; i < tareas.length; i++) {
    if (tareas[i].id == id) {
      tareas.splice(i, 1);
      break;
    }
  }
  localStorage.setItem("tareas", JSON.stringify(tareas));
  mostrarTareas();
}
// Función para editar una tarea de la lista de tareas
function editarTarea(id) {
  for (let i = 0; i < tareas.length; i++) {
    if (tareas[i].id == id) {
      let titulo = prompt("Introduce el nuevo título:", tareas[i].titulo);
      if (titulo != null) {
        let descripcion = prompt(
          "Introduce la nueva descripción:",
          tareas[i].descripcion
        );
        if (descripcion != null) {
          let fecha = prompt(
            "Introduce la nueva fecha límite:",
            tareas[i].fecha
          );
          if (fecha != null) {
            tareas[i].titulo = titulo;
            tareas[i].descripcion = descripcion;
            tareas[i].fecha = fecha;
            localStorage.setItem("tareas", JSON.stringify(tareas));
            mostrarTareas();
            break;
          }
        }
      }
    }
  }
}

pendientes.addEventListener("dragover", (e) => {
  e.preventDefault();
  const tarea = document.querySelector(".dragging");
  pendientes.appendChild(tarea);
});
enProceso.addEventListener("dragover", (e) => {
  e.preventDefault();
  const tarea = document.querySelector(".dragging");
  enProceso.appendChild(tarea);
});
hechas.addEventListener("dragover", (e) => {
  e.preventDefault();
  const tarea = document.querySelector(".dragging");
  hechas.appendChild(tarea);
});
