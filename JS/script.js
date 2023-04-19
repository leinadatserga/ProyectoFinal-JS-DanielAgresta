let url = "../clientes/clientes.json";
  
async function funcionAsincrona(url){
  const response = await fetch(url)
  .then(response => {
        return response.json();
     })
     .then(jsonClientes => {arrayEmps=jsonClientes
    localStorage.setItem("LSempleados", JSON.stringify(arrayEmps))
        });
}
var nuevaClave;
let compClave;
let barra = document.querySelector('.navegador');
barra.innerHTML = `<div class="barra">
                    <a href="../paginas/personal.html">ingreso con clave personal</a>
                    <a href="javascript:insertarFormulario()">registro nuevo operario</a>
                </div>`;
let arrayImpo = JSON.parse(localStorage.getItem("LSempleados"));
if (arrayImpo === null){
    funcionAsincrona(url)
    localStorage.setItem("LSempleados", JSON.stringify(arrayImpo));
}
else{
    arrayEmps=arrayImpo;
}
function insertarFormulario(arrayImpo) {
    let formulario = document.querySelector('.form');
    formulario.innerHTML = `<form id="ingresoEmpNuevo">
                            <label for="nombre"><b>Aquí tu nombre (usa mayúsculas)</b></label><br>
                            <input type="text" placeholder="NOMBRE:" id="nombre" required pattern="^[A-Z]+$"><br><br>
                            <label for="apellido"><b>Aquí tu apellido (usa mayúsculas)</b></label><br>
                            <input type="text" placeholder="APELLIDO:" id="apellido" required pattern="^[A-Z]+$"><br><br>
                            <label for="cargo"><b>Ingresa el cargo asignado: (formato: [n] nro. del 1 al 4)</b></label><br>
                            <input type="number" placeholder="Cargo: ej. 1, 2, 3 o 4." id="cargo" required min="1" max="4"><br><br>
                            <label for="documento"><b>Documento: (formato: [nnnnnnnn] 7 u 8 dígitos numéricos sin espacios, puntos ni guiones)</b></label><br>
                            <input type="number" placeholder="nnnnnnnn" id="documento" required min="1000000" max="99999999"><br><br>
                            <label for="fecha"><b>Fecha de ingreso: (formato: [aaaamm] año y mes sin espacios, puntos ni guiones)</b></label><br>
                            <input type="number" placeholder="aaaamm" id="fecha" required min="195012" max="202301"><br><br>
                            <button id="botonIngreso">INGRESAR</button>
                        </form>`;
                        crearNE(arrayImpo);
}
class nuevoEmpleado{
    constructor (nomb, apell, car, doc, ing, clv){
        this.nombre = nomb;
        this.apellido = apell;
        this.cargo = car;
        this.documento = doc;
        this.ingreso = ing;
        this.clave = clv;
    }
}
function crearNE(){
    nuevaClave = arrayEmps.length +1;
    const formulari = document.getElementById("ingresoEmpNuevo");
    formulari.addEventListener("submit", (e)=>{
        e.preventDefault();
        const inputNombre = document.getElementById("nombre");
        const inputApellido = document.getElementById("apellido");
        const inputCargo = document.getElementById("cargo");
        const inputDocumento = document.getElementById("documento");
        const inputFecha = document.getElementById("fecha");
        const inputCarg = parseInt(inputCargo.value);
        const empIng = new nuevoEmpleado (inputNombre.value,
                                            inputApellido.value,
                                            inputCarg,
                                            inputDocumento.value,
                                            inputFecha.value,
                                            arrayEmps.length +1);
        arrayEmps.push(empIng);
        localStorage.setItem("LSempleados", JSON.stringify(arrayEmps));
        formulari.reset();
        saludoNE();
    });
}
function asignarValores(){
    nuevaClave = arrayImpo.length +1;
}
function saludoNE() {
    const identi = arrayEmps.find (ident=> (ident.clave==nuevaClave));
    let formulario = document.querySelector('.form');
    formulario.innerHTML = `<p class="bienv">Bienvenido ${identi.nombre}, tu clave personal de acceso es ${nuevaClave}</p>`;
    formulario.innerHTML += `<p>Para acceder a la sección consulta de remuneraciones utiliza tu PIN</p>`;
    formulario.innerHTML += `<p>Si aún no lo tienes, obtenlo telefónicamente, o en la oficina de personal.</p>`;
    Swal.fire('Todo en órden '+identi.nombre+' tus datos fueron almacenados satisfactoriamente!\nTu clave única de acceso es '+nuevaClave)
}
