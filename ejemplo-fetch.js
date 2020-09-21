//Document es la API que el navegador me da para jugar con el html de la página
const listaUsuarios = document.getElementById('body-usuarios');
const boton = document.getElementById('boton');
const nombre = document.getElementById('nombre');
const apellido = document.getElementById('apellido');
const pais = document.getElementById('pais');
const indice = document.getElementById('indice');
const limpiar = document.getElementById('limpiar');

let usuarios = [];
let botonesEliminar = null;
let botonesEditar = null;


function render() {

    const usuariosRender = usuarios
        .map((usuario, indice) => `<tr>
        <td>${usuario.nombre ? usuario.nombre : 'vacio'} </td>
        <td>${usuario.apellido ? usuario.apellido : 'vacio'} </td>
        <td>${usuario.pais ? usuario.pais : 'vacio'}</td>
        <td><a class="ver" href="/index2.html?usuario=${indice}">Ver</a></td>
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

function enviarDatos(e) {
    let accion = e.target.innerHTML;
    const datos = {
        nombre: nombre.value,
        apellido: apellido.value,
        pais: pais.value
    };
    let url = null;
    let method = null;
    if (accion === 'Crear') {
        url = 'https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios';
        method = 'POST';
    } else if (accion === 'Editar') {
        if (indice.value) {
            url = `https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios/${indice.value}`;
            method = 'PUT';
        }
    } else {
        return;
    }
    fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
    })
        .then((response) => response.json())
        .then(jsonResponse => {
            console.log('jsonResponse', jsonResponse);
            refrescar();
            clear()
        }).catch(razon => clear());


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
    fetch('https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios')
        .then(response => response.json())
        .then(respuestaUsuarios => {
            console.log('respuestaUsuarios', respuestaUsuarios);
            usuarios = respuestaUsuarios;
            render();
        })
}
//CRUD: Create Read Update Delete

function clear() {
    boton.innerText = 'Crear';
    nombre.value = '';
    apellido.value = '';
    pais.value = '';
}
refrescar();
boton.onclick = enviarDatos;
limpiar.onclick = clear;