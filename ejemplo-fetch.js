//Document es la API que el navegador me da para jugar con el html de la página
const listaUsuarios = document.getElementById('lista-usuarios');
const boton = document.getElementById('boton');
let usuarios = [];

function reqListener() {
    const usuarios = JSON.parse(this.responseText);
    console.log(usuarios)
    const usuariosRender = usuarios.map(usuario => `<li>${usuario.nombre}</li>`).join("");
    console.log(usuariosRender);
    listaUsuarios.innerHTML = usuariosRender;
}

function enviarDatos() {
    const datos = {
        nombre: 'Mariano user'
    }
    fetch('http://bootcamp-dia-3.camilomontoyau.now.sh/usuarios', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(datos),
    })
        .then(response => {
            response.json()
                .then(jsonResponse => {
                    console.log('jsonResponse', jsonResponse)
                    refrescar();
                });
        })

}

function refrescar() {
    fetch('http://bootcamp-dia-3.camilomontoyau.now.sh/usuarios', {
        method: 'GET'
    })
        .then(response => response.json()
            .then(respuestaUsuarios => {
                console.log('respuestaUsuarios',respuestaUsuarios)
                usuarios = respuestaUsuarios
                
            })
        );
}

boton.onclick = enviarDatos;