// Variables globales
var tareas = [];

// Función para agregar una tarea a la lista de tareas
function agregarTarea(event) {
  event.preventDefault();
  var titulo = document.getElementById("titulo").value;
  var descripcion = document.getElementById("descripcion").value;
  var fecha = document.getElementById("fecha").value;
  var tarea = {
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
}

// Función para mostrar la lista de tareas
function mostrarTareas() {
  document.getElementById("pendientes").innerHTML = "";
  document.getElementById("enproceso").innerHTML = "";
  document.getElementById("hechas").innerHTML = "";
  for (var i = 0; i < tareas.length; i++) {
    var tarea = tareas[i];
    var divTarea = document.createElement("div");
    divTarea.id = tarea.id;
    divTarea.className = "tarea";
    divTarea.draggable = true;
    divTarea.ondragstart = function (event) {
      event.dataTransfer.setData("id", event.target.id);
    };
    var h3 = document.createElement("h3");
    h3.innerHTML = tarea.titulo;
    divTarea.appendChild(h3);
    var p = document.createElement("p");
    p.innerHTML = tarea.descripcion;
    divTarea.appendChild(p);
    var span = document.createElement("span");
    span.innerHTML = tarea.fecha;
    divTarea.appendChild(span);
    var divBotones = document.createElement("div");
    divBotones.className = "botones";
    var buttonEditar = document.createElement("button");
    buttonEditar.innerHTML = "Editar";
    buttonEditar.onclick = function () {
      editarTarea(this.parentNode.parentNode.id);
    };
    divBotones.appendChild(buttonEditar);
    var buttonEliminar = document.createElement("button");
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
  }
}

// Función para eliminar una tarea de la lista de tareas
function eliminarTarea(id) {
  for (var i = 0; i < tareas.length; i++) {
    if (tareas[i].id == id) {
      tareas.splice(i, 1);
      break;
    }
  }
  mostrarTareas();
}

// Función para editar una tarea de la lista de tareas
// Función para editar una tarea de la lista de tareas
function editarTarea(id) {
  for (var i = 0; i < tareas.length; i++) {
    if (tareas[i].id == id) {
      var titulo = prompt("Introduce el nuevo título:", tareas[i].titulo);
      if (titulo != null) {
        var descripcion = prompt(
          "Introduce la nueva descripción:",
          tareas[i].descripcion
        );
        if (descripcion != null) {
          var fecha = prompt(
            "Introduce la nueva fecha límite:",
            tareas[i].fecha
          );
          if (fecha != null) {
            tareas[i].titulo = titulo;
            tareas[i].descripcion = descripcion;
            tareas[i].fecha = fecha;
            mostrarTareas();
            break;
          }
        }
      }
    }
  }
}
