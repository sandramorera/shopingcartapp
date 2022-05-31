//CREAR VARIABLES

// creamos una variable accediendo al id CARRITO que es el Div que contiene todo
const carrito = document.querySelector('#carrito');

/*Acedemos al id de la Table lista-carrito la que mostrara arriba derecha la lista de productos comprados
. Cada uno de estos cursos comprados se mostrara  y agregara en el area del cuerpo (Tbody)  
de la tabla por lo que accedemos a ese area interna con lista-carrito tbody  */
const contenedorCarrito = document.querySelector('#lista-carrito tbody');

//creamos una variable para el botón vaciar carrito que borrara todo lo ingresado en el
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 

// creamos una variable para el LISTADO DE CURSOS COMPRADOS accediendo por su id
const listaCursos = document.querySelector('#lista-cursos');

/*Creo una variable para AGREGAR AL CARRITO que almacenara los articulos en el carrito 
(va a iniciar como un array vacio) 
Se va a ir llenando a medida que se haga click en  los productos comprados*/
let articulosCarrito = [];


// GENERAMOS LISTA DE EVENTOS CON FUNCIONES
// Se ejecuta primero la funcion con la carga de eventos
cargarEventListeners();

function cargarEventListeners() {

    /* Funcion para click en el botón agregar curso (le paso a listaCursos un evento click y un parámetro de
         una subfuncion que ejecutara cuando se haga click en agregar al carrito el curso seleccionado*/
         listaCursos.addEventListener('click', agregarCurso);

          // Cuando se elimina un curso del carrito
          carrito.addEventListener('click', eliminarCurso);

          // Al Vaciar el carrito
          vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}


// FUNCIONES DE EVENTOS
// Función que añade el curso al carrito

// Tenemos que evitar el derrame entonces pasamos el evento y las clases para ver que se esta ejecutando*/
function agregarCurso(e) {
     // por ahora ponemos prevent default porque los enlaces estan vacío y no queremos que la pantalla se vaya arriba
     e.preventDefault();

 /* Delegation para agregar-carrito.
  Decimos que si el evento, tipo y clase contiene agregar-carrito. Accedemos así al botón agregar al carrito*/
 if(e.target.classList.contains('agregar-carrito')) {
/*creo una variable que muestro evento y tipo y recorro hacia arriba los elementos (info curso y card ) 
    por lo que coloco 2 parent Element. En realidad va a almacenar los datos individuales de esa card donde se hizo clik*/
     const curso = e.target.parentElement.parentElement;
     // Enviamos el curso seleccionado para tomar sus datos
     leerDatosCurso(curso);
}
}

 

  // FUNCIÓN LEER / CAPTURAR LOS DATOS DEL CURSO ELEGIDO
 /* Creamos una funcion para acceder a leer los datos con los detalles del curso que compro que se encuentran 
arriba y que contienen el bóton agregar al carrito haciendo un traversing*/
    
//Le pasamos info de la card que se clicko

function leerDatosCurso(curso) {
      /*creo una variable infoCurso que tomará la información del curso para lo cual creo un objeto donde guardo cada una de las 
    propiedades asignandoles un nombre y accediendo a la variable curso que contiene toda la info de la card 
    y extrayendo de allí las etiquetas y datos que me interesan de esta*/
     const infoCurso = { 
           //extraigo la imagen del src
          imagen: curso.querySelector('img').src,

          //extraigo el texto del h4 (titulo del curso)
          titulo: curso.querySelector('h4').textContent,

          //Extraigo el texto de la clase .preciospan donde esta el precio con descuento
          precio: curso.querySelector('.precio span').textContent,

          //accedo a cada id de cada curso, luego al enlace y al atributo data-id donde esta el id 
          id: curso.querySelector('a').getAttribute('data-id'), 
           //creo variable cantidad y la inicio en 1
          cantidad: 1
     }  

          /*Revisamos con some (verifica si existe) si el articulo ya existe en el carrito 
    Si hay dos productos en el carrito articulosCarrito va a iterar y vamos a acceder a cada Id de los cursos
    que ya están en el carrito y si alguno es igual a la id del que estamos tratando de agregar , eso significa que hay
    uno igual a ese en el carrito , entonces allí podriamos actualizar la cantidad sin necesidad de agregarlo al carrito*/

     if( articulosCarrito.some( curso => curso.id === infoCurso.id ) ) { 
          const cursos = articulosCarrito.map( curso => {
               if( curso.id === infoCurso.id ) {
                    curso.cantidad++;
                     return curso;
                } else {
                     return curso;
             }
          })
          articulosCarrito = [...cursos];
     }  else {

          /*Una vez que se leyo el curso en el que se hizo click hay que agregarlo al carrito vacio que está al inicio
Utilizamos Spreed Operator... para ir llenando nuestro arreglo y también habriamos podido usar push
Para eso entre corchete decimos: tome una copia de articulosCarrito asi este vacio y sino agregue a lo que ya tiene y
le pase todos los objetos que guardo en la variable InfoCurso*/
          articulosCarrito = [...articulosCarrito, infoCurso];
          
     }
     carritoHTML();
     }



     /*FUNCION MOSTRAR EL CURSO ELEGIDO EN EL CARRITO
     Muestra el Carrito de Compras generado en articulosCarrito como elementos del 
código Html para que aparezca el listado en la table*/

     function carritoHTML() {

    /* limpiamos el html para que no se vayan acumulando las selecciones 
    anteriores y muestre duplicados los productos comprados*/     
          vaciarCarrito();
     
       // iteramos articulosCarrito para que se agreguen los productos    
          articulosCarrito.forEach(curso => {

               /* cada elemento que se inserte en el carrito tiene que ir agregandose a la table en un nuevo renglon
     y creamos un nuevo elemento con la etiqueta para crear una nueva fila en la tabla e ir mostrando ahi los productos*/
               const row = document.createElement('tr');

                  /* con InnerHtml reemplazamos el elemento anterior del html con el nuevo y agregamos un template string . 
     Con td definimos nuevas celdas en la  tabla que agregaran las imagenes precio y boton elmiminar producto
     Para que pueda eliminar uno agregamos un td con un enlace vacío con una clase definida en el css borrar curso*/
               row.innerHTML = `
                    <td>  
                         <img src="${curso.imagen}" width=100>
                    </td>
                    <td>${curso.titulo}</td>
                    <td>${curso.precio}</td>
                    <td>${curso.cantidad} </td>
                    <td>
                         <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
                    </td>
               `;
                // Agrega el Html del carrito en el tbody, agrega cada renglon con el producto comprado a la tabla
               contenedorCarrito.appendChild(row);
          });
     
     }


  // FUNCION ELIMINAR LOS ELEMENTOS DEL CARRITO EN EL DOM
function vaciarCarrito() {
     // forma lenta
     // contenedorCarrito.innerHTML = '';


     // forma rapida (recomendada)
     while(contenedorCarrito.firstChild) {
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
      }
}      


         
     

           
         
        
    
   


   


    





     


     


     

     



/*Creamos una nueva función que elimina la repetición del listado de los productos comprados
 cada vez que agrego uno nuevo. Para eso reemplazo el contenido de la tabla del carrito por un string vacío*/
function limpiarHtml() {
     contenedorCarrito.innerHTML = "";
}

//Mejor forma más rapida que limpiar con innerHtml
while(contenedorCarrito.firstChild) {
     contenedorCarrito.removeChild(contenedorCarrito.firstChild);
 }







/* Funciones
// Función que añade el curso al carrito
function agregarCurso(e) {
    e.preventDefault();
    // Delegation para agregar-carrito
    if(e.target.classList.contains('agregar-carrito')) {
         const curso = e.target.parentElement.parentElement;
         // Enviamos el curso seleccionado para tomar sus datos
         leerDatosCurso(curso);
    }
}

// Lee los datos del curso
function leerDatosCurso(curso) {
    const infoCurso = {
         imagen: curso.querySelector('img').src,
         titulo: curso.querySelector('h4').textContent,
         precio: curso.querySelector('.precio span').textContent,
         id: curso.querySelector('a').getAttribute('data-id'), 
         cantidad: 1
    }


    if( articulosCarrito.some( curso => curso.id === infoCurso.id ) ) { 
         const cursos = articulosCarrito.map( curso => {
              if( curso.id === infoCurso.id ) {
                   curso.cantidad++;
                    return curso;
               } else {
                    return curso;
            }
         })
         articulosCarrito = [...cursos];
    }  else {
         articulosCarrito = [...articulosCarrito, infoCurso];
    }

    // console.log(articulosCarrito)

    

    // console.log(articulosCarrito)
    carritoHTML();
}

// Elimina el curso del carrito en el DOM
function eliminarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('borrar-curso') ) {
         // e.target.parentElement.parentElement.remove();
         const cursoId = e.target.getAttribute('data-id')
         
         // Eliminar del arreglo del carrito
         articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

         carritoHTML();
    }
}


// Muestra el curso seleccionado en el Carrito
function carritoHTML() {

    vaciarCarrito();

    articulosCarrito.forEach(curso => {
         const row = document.createElement('tr');
         row.innerHTML = `
              <td>  
                   <img src="${curso.imagen}" width=100>
              </td>
              <td>${curso.titulo}</td>
              <td>${curso.precio}</td>
              <td>${curso.cantidad} </td>
              <td>
                   <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
              </td>
         `;
         contenedorCarrito.appendChild(row);
    });

}

// Elimina los cursos del carrito en el DOM
function vaciarCarrito() {
    // forma lenta
    // contenedorCarrito.innerHTML = '';


    // forma rapida (recomendada)
    while(contenedorCarrito.firstChild) {
         contenedorCarrito.removeChild(contenedorCarrito.firstChild);
     }
}*/
