
/* const contenedorProductos = document.getElementById("contenedor");
const productos = "./json/producto.json";

fetch(productos)
  .then(respuesta => respuesta.json())
  .then(datos => {
    datos.forEach(producto => {
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
    })
  })

let carrito = [];

document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  mostrarCompra();
});

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
}); */