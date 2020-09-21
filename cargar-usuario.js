let usuarios = [];
const listarUsuario = document.getElementById('body-usuario');
function tomarDatosUrl() {
    const indiceUsuaio = location.search.replace('?', '').split('=')[1];
    console.log(indiceUsuaio);
}
function obtenerUsuario() {
    fetch(`https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios/${tomarDatosUrl()}`)
        .then(response => response.json())
        .then(respuestaUsuarios => {
            console.log('respuestaUsuarios', respuestaUsuarios);
            usuarios = respuestaUsuarios;
            //render();
        })
}

function render() {
    const usuarioRender = `<tr>       
    <td>${usuario.nombre ? usuario.nombre : 'vacio'} </td>
    <td>${usuario.apellido ? usuario.apellido : 'vacio'} </td>
    <td>${usuario.pais ? usuario.pais : 'vacio'}</td>    
    </tr>`

    console.log(usuarioRender);
    listarUsuario.innerHTML = usuarioRender;
}

obtenerUsuario();