class Producto {
  constructor(id, nombre, descripcion, precio, img) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.img = img;
    this.cantidad = 1;
  }
}

const anillo1 = new Producto(
  1,
  "Anillo",
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit, saepe.",
  700,
  "./img/anillo1.jpg"
);
const anillo2 = new Producto(
  2,
  "Anillo firu",
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit, saepe.",
  800,
  "./img/anillo2.jpg"
);
const anillo3 = new Producto(
  3,
  "Anillo coke",
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit, saepe.",
  850,
  "./img/anillo3.jpg"
);
const pulsera1 = new Producto(
  4,
  "Pulsera",
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit, saepe.",
  1500,
  "./img/pulsera1.jpeg"
);
const pulsera2 = new Producto(
  5,
  "Pulsera firu",
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit, saepe.",
  1800,
  "./img/pulsera2.jpeg"
);
const pulsera3 = new Producto(
  6,
  "Pulsera coke",
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit, saepe.",
  2000,
  "./img/pulsera3.jpeg"
);
const collar1 = new Producto(
  7,
  "Collar",
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit, saepe.",
  2500,
  "./img/collar1.jpeg"
);
const collar2 = new Producto(
  8,
  "Collar firu",
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit, saepe.",
  1800,
  "./img/collar2.jpeg"
);
const collar3 = new Producto(
  9,
  "Collar coque",
  "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit, saepe.",
  4000,
  "./img/collar3.jpeg"
);

const productos = [
  anillo1,
  anillo2,
  anillo3,
  pulsera1,
  pulsera2,
  pulsera3,
  collar1,
  collar2,
  collar3,
];

let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  mostrarCompra();
});

const contenedorProductos = document.getElementById("contenedor");

const mostrarProductos = () => {
  productos.forEach((producto) => {
    const card = document.createElement("div");
    card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
    card.innerHTML = `
            <div class="card" style="width: 18rem;">
            <img src="${producto.img}" class="card-img-top mt-2 " alt="${producto.nombre}">
            <div class="card-body">
              <h2 class="card-title">${producto.nombre}</h2>
              <p class="card-text">${producto.descripcion}</p>
              <p class="card-text">$${producto.precio}</p>
              <button id="boton${producto.id}" class="btn btn-primary bg-dark bg-gradient">Agregar al carrito</button>
            </div>
            </div>  
            `;
    contenedorProductos.appendChild(card);

    const boton = document.getElementById(`boton${producto.id}`);
    boton.addEventListener("click", () => {
      agregarProducto(producto.id);
    })
  }); 
};

mostrarProductos();

const agregarProducto = (id) =>{
  const prodExiste = carrito.find(producto => producto.id === id);
  if (prodExiste) {
    prodExiste.cantidad++;
  } else {
    const producto = productos.find(producto => producto.id === id);
    carrito.push(producto);
  }

  Toastify({
    text: "Poducto agregado",
    duration: 2000,
    gravity: "top",
    position: "right",
    style: {
      background: "linear-gradient( to right, #127369, #8AA6A3)",
    },
  }).showToast();

  mostrarCompra();
  saveStorage();
}


const verCarrito = document.getElementById("verCarrito");
const carritoContenedor = document.getElementById("carritoContenedor");

const mostrarCompra = () => {
  verCarrito.innerHTML = "";
  carrito.forEach((producto) => {
    const carrito = document.createElement("div");
    carrito.innerHTML = `
                <div class="modal-contenedor">
                <div>
                <img class="img-fluid img-carrito" src="${producto.img}"/>
                </div>
                <div>
                <p>Producto: ${producto.nombre}</p>
                <p>Precio: $${producto.precio}</p>
                <div class="modal-body">
                <p>Cantidad: ${producto.cantidad}</p>
                <div class="btn-group-sm">
                <button type="button" class="btn btn-secondary restar">-</button><button type="button" class="btn btn-primary sumar">+</button>
                </div>
                </div>
                

                <button id="eliminarProducto${producto.id}" class="btn btn-danger">Eliminar Producto</button>
                <hr>

                </div>
                </div>
            `;
    verCarrito.appendChild(carrito);

    const boton = document.getElementById(`eliminarProducto${producto.id}`);
    boton.addEventListener("click", () =>{
      eliminarProducto(producto.id);
    })
    
    let restar = carrito.querySelector(".restar");
    restar.addEventListener("click", () => {
        producto.cantidad--;
        Toastify({
          text: "Poducto eliminado",
          duration: 500,
          gravity: "bottom",
          position: "right",
          style: {
            background: "linear-gradient( to right, #50403B, #BFBFBF)",
          }
      }).showToast();
        if(producto.cantidad === 0){
            eliminarProducto(producto.id);
        }
        
        mostrarCompra();
        saveStorage();
    });
    let sumar = carrito.querySelector(".sumar");
    sumar.addEventListener("click", () =>{
        producto.cantidad++;
        Toastify({
            text: "Poducto agregado",
            duration: 500,
            gravity: "top",
            position: "right",
            style: {
              background: "linear-gradient( to right, #807369, #9BB6A3)",
            },
          }).showToast();
        mostrarCompra();
        saveStorage();
    })

  });

  carrito.length === 0 && (verCarrito.innerHTML = `<p class ="text-center text-primary"> El carrito de compra está vacío</p>`);

  carritoContenedor.textContent = carrito.length;
  saveStorage();
  calcularTotal();
};

const eliminarProducto = (id) => {
  const producto = carrito.find(producto => producto.id === id);
  const indice = carrito.indexOf(producto);
  carrito.splice(indice, 1);

  Toastify({
    text: "Poducto eliminado",
    duration: 2000,
    gravity: "bottom",
    position: "right",
    style: {
      background: "linear-gradient( to right, #10403B, #BFBFBF)",
    },
  }).showToast();
  mostrarCompra();
  saveStorage();
}
  

const totalCompra = document.getElementById("totalCompra");
const calcularTotal = () => {
  let acumulador = 0;
  carrito.forEach((producto) => {
    acumulador += producto.cantidad * producto.precio;
  });
  totalCompra.innerHTML = ` $${acumulador}`;
};



function saveStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

const vaciarCarrito = document.getElementById("vaciarCarrito");
vaciarCarrito.addEventListener("click", () => {
  if (carrito.length === 0) {
    Swal.fire({
      title: "Carrito Vacio",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  } else {
    Swal.fire({
      title: "¿Estas seguro que quieres vaciar el carrito?",
      icon: "warning",
      confirmButtonText: "Aceptar",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        carrito.length = [];
        mostrarCompra();
        Swal.fire({
          title: "Carrito Vacio",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      }
    });
  }

  localStorage.clear();
});

const continuarCompra = document.getElementById("continuarCompra");
continuarCompra.addEventListener("click", () => {
  if (carrito.length === 0) {
    Swal.fire({
      title: "Tu carrito está vacío!!",
      text: "Agrega un producto para finalizar tu compra",
      icon: "warning",
      confirmButtonText: "Aceptar",
      backdrop: "#050505bd",
    });
  } else {
    window.location.href = "compra.html";
  }
});