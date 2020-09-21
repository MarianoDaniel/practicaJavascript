let usuarios = '';
const listarUsuario = document.getElementById('body-usuario');
function tomarDatosUrl() {
    return location.search.replace('?', '').split('=')[1];
}
function obtenerUsuario() {
    fetch(`https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios/${tomarDatosUrl()}`)
        .then(response => response.json())
        .then(respuestaUsuarios => {
            console.log('respuestaUsuarios', respuestaUsuarios);
            usuario = respuestaUsuarios;
            render();
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