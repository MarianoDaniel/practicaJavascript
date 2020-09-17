//Document es la API que el navegador me da para jugar con el html de la página
const listaUsuarios = document.getElementById('body-usuarios');
const boton = document.getElementById('boton');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const pais = document.getElementById('pais');
const indice = document.getElementById('indice');

let usuarios = [];
let botonesEliminar = null;
let botonesEditar = null;


function render() {

    const usuariosRender = usuarios
        .map((usuario, indice) => `<tr>
        <td>${usuario.nombre ? usuario.nombre : 'vacio'} </td>
        <td>${usuario.apellido ? usuario.apellido : 'vacio'} </td>
        <td>${usuario.pais ? usuario.pais : 'vacio'}</td>
        <td><button class="editar" data-indice=${indice}>Editar</button></td>
        <td><button class="eliminar" data-indice=${indice}>Eliminar</button></td>
        </tr>`)
        .join("");
    console.log(usuariosRender);
    listaUsuarios.innerHTML = usuariosRender;
    botonesEliminar = document.getElementsByClassName('eliminar');
    botonesEditar = document.getElementsByClassName('editar');
    Array.from(botonesEditar).forEach(botonEditar => {
        botonEditar.onclick = editarUnUsuario;
    });
    Array.from(botonesEliminar).forEach(botonEliminar => {
        botonEliminar.onclick = eliminarUnUsuario;
    });
}

function enviarDatos() {
    const datos = {
        nombre: nombre.value,
        apellido: apellido.value,
        pais: pais.value
    };
    fetch('https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
    })
        .then((response) => response.json())
        .then(jsonResponse => {
            console.log('jsonResponse', jsonResponse);
            refrescar();
        });


}

function eliminarUnUsuario(e) {
    e.preventDefault();
    console.log('eliminar usuario', e)
    fetch(`https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios/${e.target.dataset.indice}`, {
        method: 'DELETE',
    })
        .then((response) => response.json())
        .then(jsonResponse => {
            console.log('jsonResponse', jsonResponse);
            refrescar();
        });


}

function editarUnUsuario(e) {
    e.preventDefault();
    console.log('editarUnUsuario', e)
    if (e.target.dataset.indice) {
        const usuario = usuarios[e.target.dataset.indice];
        nombre.value = usuario.nombre ? usuario.nombre : '';
        apellido.value = usuario.apellido ? usuario.apellido : '';
        pais.value = usuario.pais ? usuario.pais : '';
        indice.value = e.target.dataset.indice;
        console.log('usuario', usuario);
        boton.innerText = 'Editar';
    } else {
        boton.innerText = 'Crear';
    }
}


function refrescar() {
    fetch('http://bootcamp-dia-3.camilomontoyau.now.sh/usuarios')
        .then(response => response.json())
        .then(respuestaUsuarios => {
            console.log('respuestaUsuarios', respuestaUsuarios);
            usuarios = respuestaUsuarios;
            render();
        })
}
//CRUD: Create Read Update Delete
refrescar();
boton.onclick = enviarDatos;