/* console.log('Hola')

function MiObjeto(nombre, apellido) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.getNombreCompleto = function () {
        return `${this.nombre} ${this.apellido}`;
    }
}
MiObjeto.prototype */



const fabricaDePromesas = (indice) => new Promise((resolve, reject) => {
    const tiempoRejected = Math.floor(Math.random() * 10000) + 1000;
    const tiempoResolver = Math.floor(Math.random() * 10000) + 1000;
    console.log('tiempoRejected', tiempoRejected);
    console.log('tiempoResolver', tiempoResolver);

    setTimeout(() => {
        reject(`la promesa con índice ${indice} falló`)
    }, tiempoRejected)

    setTimeout(() => {
        resolve(`promesa con índice ${indice} satisfecha`)
    }, tiempoResolver)
});

let misPromesas = [];
for (let i = 0; i < 10; i++) {
    //spread Operator para agregarle la nueva promesa a las que ya hay
    misPromesas = [...misPromesas, fabricaDePromesas(i)];
}
misPromesas.forEach(promesa =>
    promesa
        .then(respuesta => console.log(respuesta))
        .catch(razon => console.log(razon))
);

/* miPromesa.then(
    respuesta => console.log(respuesta),
    razon => console.log(razon)); */

