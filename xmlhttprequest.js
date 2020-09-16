//Document es la API que el navegador me da para jugar con el html de la página
const listaUsuarios = document.getElementById('lista-usuarios');
const boton = document.getElementById('boton');

function reqListener() {
  const usuarios = JSON.parse(this.responseText);
  console.log(usuarios)
  const usuariosRender = usuarios.map(usuario => `<li>${usuario.nombre}</li>`);
  console.log(usuariosRender);
  listaUsuarios.innerHTML = usuariosRender.join("");
}

var peticion = new XMLHttpRequest();
peticion.open("GET", "http://bootcamp-dia-3.camilomontoyau.now.sh/usuarios");
peticion.send();
peticion.addEventListener("load", reqListener);

function enviarDatos() {
  peticion.open("POST", "http://bootcamp-dia-3.camilomontoyau.now.sh/usuarios", true);
  peticion.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  peticion.send("nombre=LUNES50");
  setTimeout(refrescar, 3000);
}

function refrescar() {
  peticion.open("GET", "http://bootcamp-dia-3.camilomontoyau.now.sh/usuarios");
  peticion.send();
}

boton.onclick = enviarDatos;