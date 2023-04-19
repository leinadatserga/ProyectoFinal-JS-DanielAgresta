let cargo;
let horasTotales=parseInt (0);
let mensualidad=parseFloat (0);
let sueldoCargo=parseFloat (0);
let resultado;
let empId;
const arrayImpo = JSON.parse(localStorage.getItem("LSempleados"));
if (arrayImpo===null){
    window.location.href = "../index.html"
}
const validaClave = arrayImpo.length;
function ingClv(){
const formulario = document.getElementById("form1");
    formulario.addEventListener("submit", (e)=>{
        e.preventDefault();
        const cl = document.getElementById("clave").value;
        if (cl<=validaClave){
            empId = cl;
            saludar(empId)}
        else {    Swal.fire('La clave '+cl+', no pertenece a ningún empleado registrado.\nPor favor, intenta nuevamente con una clave válida ');
        formulario.reset();

    };
    });
    borraSaludar();
}
function saludar(){
    buscaEmpleado();
    borraForm();
    let parrafo = document.getElementById("saludo");
    parrafo.innerHTML = "Hola "+empEncN+" "+empEncA+", es un gusto tenerte por aquí!"+"<br>"+"<br>";
    parrafo.innerHTML += "Para saber a cuanto asciende lo generado en el mes, deberás ingresar tu PIN:"+"<br>"+"<br>";
    setTimeout(validarPIN, 6000)

}
function borraSaludar(){
    let parrafo = document.getElementById("saludo");
    parrafo.innerHTML = "";
}
function insertaForm(){
    let clv = document.querySelector('#entrada');
    clv.innerHTML = `<form id="form1">
                        <label for="clave">Clave de acceso personal:</label>
                        <input type="number" name="clave" id="clave" required min="1" max="50">
                    </form>`;
    ingClv(validaClave);
}
function borraForm(){
    let clv = document.querySelector('#entrada');
    clv.innerHTML = `<br>
                    <br>
                    <br>`
}

function buscaEmpleado(){
      const claveU = empId;
      let empleadoEncontrado = arrayImpo.find (usuario => usuario.clave == claveU);
      if (empleadoEncontrado) {
        empEncN=empleadoEncontrado.nombre;
        empEncA=empleadoEncontrado.apellido;
        cargo = empleadoEncontrado.cargo;
      }
      switch(cargo){
        case 1:
            cargo="Instalador";
            sueldoCargo=40;
            break;
        case 2:
            cargo="Oficial";
            sueldoCargo=32;
            break;
        case 3:
            cargo="Medio oficial";
            sueldoCargo=27;
            break;
        case 4:
            cargo="Peón";
            sueldoCargo=15;
            break;
        default:
            break;
    }
}
async function validarPIN(){
    const { value: password } = await Swal.fire({
        position: 'bottom',
        title: 'Por favor, ingresa tu PIN',
        input: 'password',
        inputLabel: 'formato: numérico de 4 dígitos',
        inputPlaceholder: 'Ingresa tu PIN',
        inputAttributes: {
          maxlength: 4,
          minlength: 4,
          pattern: '[0-9]{4}',
          autocapitalize: 'off',
          autocorrect: 'on'
        }
      })
      if (password=='1234') {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'PIN correcto!!',
            showConfirmButton: true,
            timer: 4500
          });
          remuneracion();
          insertarFormulario();
      }
      else{
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'PIN incorrecto - ingresa nuevamente',
            showConfirmButton: false,
            timer: 4500
          });
        setTimeout(validarPIN, 4000);
      }
    }
function remuneracion(){
    let parrafo = document.getElementById("saludo");
    parrafo.innerHTML = "SECCION REMUNERACIONES"+"<br>"+"<br>";
    parrafo.innerHTML += "Por favor, completa los datos a continuación: "+"<br>"+"<br>";
}
function calculo(hs, cgo){
    mensualidad=hs*cgo;
}
function obtengoHoras(){
    const formu = document.getElementById("ingresoHoras");
    formu.addEventListener("submit", (e)=>{
        e.preventDefault();
        const priSem = document.getElementById("horas1");
        const segSem = document.getElementById("horas2");
        const terSem = document.getElementById("horas3");
        const cuaSem = document.getElementById("horas4");
        const horasTot = parseFloat(priSem.value)+parseFloat(segSem.value)+parseFloat(terSem.value)+parseFloat(cuaSem.value);
        horasTotales = horasTot;
        formu.reset();
        calculo (horasTotales, sueldoCargo);
        remunera(cargo);
    });
}
function insertarFormulario() {
    let formulario = document.querySelector('#entrada');
    formulario.innerHTML = `<form id="ingresoHoras">
                            <label for="horas1"><b>Horas trabajadas la primera semana: </b></label><br>
                            <input type="number" placeholder="horas semana 1:" id="horas1" required pattern="[0-9]{2}" max="48" autofocus><br><br>
                            <label for="horas2"><b>Horas trabajadas la segunda semana: </b></label><br>
                            <input type="number" placeholder="horas semana 2:" id="horas2" required pattern="[0-9]{2}" max="48" autofocus><br><br>
                            <label for="horas3"><b>Horas trabajadas la tercera semana: </b></label><br>
                            <input type="number" placeholder="horas semana 3:" id="horas3" required pattern="[0-9]{2}" max="48" autofocus><br><br>
                            <label for="horas4"><b>Horas trabajadas la cuarta semana: </b></label><br>
                            <input type="number" placeholder="horas semana 4:" id="horas4" required pattern="[0-9]{2}" max="48" autofocus><br><br>
                            <button id="botonIngresoHoras">INGRESAR</button>
                        </form>`;
    obtengoHoras();
}
function remunera(){
    borraForm();
    borraSaludar();
    let conc = document.querySelector('.inicio');
    conc.innerHTML = `<div id="conc">
                        <h3 class="remu">${empEncN}, este es el resultado de tu consulta:</h3>
                        <p id="resp"></p>
                        <button class="terminar" type="submit"><a href="../index.html">Terminar</a></button>
                    </div>`
                    let parra = document.getElementById("resp");
                    parra.innerHTML = "Tienes un total de "+horasTotales+" horas trabajadas en el mes."+"<br>"+"<br>";
                    parra.innerHTML += "Te desempeñas con un cargo de "+cargo+", por lo tanto recibirás una mensualidad de U$D "+mensualidad+" (dólares americanos)";
                
}
