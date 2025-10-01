const nombreAlumno = document.getElementById("nombreAlumno");
const btnAgregar = document.getElementById("btnAgregar");
const lista = document.getElementById("lista");
const promedio = document.getElementById("promedio");

function calcularPromedio() {
    const filas = lista.querySelectorAll("tr");
    let suma = 0;
    let contador = 0;
    for (let fila of filas) {
        const calificacion = parseFloat(fila.querySelector("input").value);
        if (!isNaN(calificacion)) {
            suma += calificacion;
            contador++;
        }
    }
    if (contador > 0) {
        promedio.textContent = "Promedio: " + (suma / contador).toFixed(2);
    } else {
        promedio.textContent = "Promedio: 0";
    }
}

// BOTÓN AGREGAR
btnAgregar.addEventListener("click", function () {
    const nombre = nombreAlumno.value.trim();
    if (nombre === "") return;
    const duplicado = Array.from(lista.querySelectorAll("tr")).some(fila =>
        fila.firstChild.textContent === nombre
    );
    if (duplicado) {
        alert("Ese alumno ya existe");
        return;
    }

    const fila = document.createElement("tr");

    const celdaNombre = document.createElement("td");
    celdaNombre.textContent = nombre;

    // EDITAR NOMBRE
    celdaNombre.addEventListener("dblclick", function () {
        const actual = celdaNombre.textContent;
        const inputEditar = document.createElement("input");
        inputEditar.type = "text";
        inputEditar.value = actual;
        celdaNombre.textContent = "";
        celdaNombre.appendChild(inputEditar);
        inputEditar.focus();


        inputEditar.addEventListener("blur", guardar);
        inputEditar.addEventListener("keydown", function (e) {
            if (e.key === "Enter") guardar();
        });

        function guardar() {
            const nuevo = inputEditar.value.trim();
            if (nuevo === "") {
                celdaNombre.textContent = actual;
                return;
            }

            const existe = Array.from(lista.querySelectorAll("tr")).some(fila =>
                fila.firstChild !== celdaNombre && fila.firstChild.textContent === nuevo
            );
            if (existe) {
                alert("Ese nombre ya existe");
                celdaNombre.textContent = actual;
            } else {
                celdaNombre.textContent = nuevo;
            }
        }
    });

    const celdaCalificacion = document.createElement("td");
    const inputCalificacion = document.createElement("input");
    inputCalificacion.type = "number";
    inputCalificacion.min = 0;
    inputCalificacion.max = 100;

    // ACTUALIZAR ESTATUS APROBADO/REPROBADO
    inputCalificacion.addEventListener("input", function () {
        const valor = parseFloat(inputCalificacion.value);
        if (!isNaN(valor)) {
            celdaEstatus.textContent = valor >= 70 ? "Aprobado" : "Reprobado";
        } else {
            celdaEstatus.textContent = "";
        }
        calcularPromedio();
    });
    celdaCalificacion.appendChild(inputCalificacion);

    const celdaEstatus = document.createElement("td");

    const celdaAcciones = document.createElement("td");

    // BOTÓN ELIMINAR
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.className = "eliminar";
    btnEliminar.addEventListener("click", function () {
        lista.removeChild(fila);
        calcularPromedio();
    });

    celdaAcciones.appendChild(btnEliminar);

    fila.appendChild(celdaNombre);
    fila.appendChild(celdaCalificacion);
    fila.appendChild(celdaEstatus);
    fila.appendChild(celdaAcciones);

    lista.appendChild(fila);
    nombreAlumno.value = "";
    calcularPromedio();
});