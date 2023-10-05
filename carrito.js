// https://api.openweathermap.org/data/2.5/weather?q=&appid={API key}
// 3733052964da3af8d5ff792bdbf05c84
/*
fetch("https://api.openweathermap.org/data/2.5/weather?q=san luis potosí&units=metric&appid=3733052964da3af8d5ff792bdbf05c84")
  .then(response => response.json())
  .then(data => console.log(data));
*/


// Esta función muestra la información del clima basada en la posición del usuario.
function mostrar_position(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let key = "3733052964da3af8d5ff792bdbf05c84";
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=metric&lang=es`)
      .then(response => response.json())
      .then(data => {
          const climaDiv = document.getElementById("clima");
          climaDiv.innerHTML = `<p>Ciudad: ${data.name}</p>
                                <p>Temperatura: ${data.main.temp}°C</p>
                                <p>Clima: ${data.weather[0].description}</p>`;
      });
}
navigator.geolocation.getCurrentPosition(mostrar_position);

// Inicializa un array llamado "carrito" que almacenará los productos seleccionados.
let carrito = [];
window.addEventListener("load", () => {
  const carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
    mostrarCarrito();
  }
});

// Esta función se llama cuando se agrega un producto al carrito.
function agregarCarrito(e) {
  let boton = e.target;
  let card = boton.closest(".card");
  let nombreProducto = card.querySelector(".nombre-refaccion").innerText;
  let precioProducto = card.querySelector(".precio").innerText;
  let imgProducto = card.querySelector(".img").src;
  let productoExistente = carrito.find((producto) => producto.nombre === nombreProducto);
  if (productoExistente) {
    productoExistente.cantidad += 1;
  } else {
    let producto = {
      nombre: nombreProducto,
      precio: precioProducto,
      img: imgProducto,
      cantidad: 1,
    };
    carrito.push(producto);
  }
  Toastify({
    text: "Se agrego al carrito",
    duration: 2000,
    position: "center",
    style: {
      fontSize: "20px",
      fontFamily: "Arial",
      color: "black",
      background: "#FFD600",
      borderRadius: "25px"
    }
  }).showToast();
  mostrarCarrito();
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Esta función muestra los productos en el carrito en la página.
function mostrarCarrito() {
  let tabla = document.getElementById("tbody");
  tabla.innerHTML = "";
  let costoTotal = 0;
  for (let producto of carrito) {
    let fila = document.createElement("tr");
    let precioUnitario = parseFloat(producto.precio);
    let precioTotalProducto = precioUnitario * producto.cantidad;
    costoTotal += precioTotalProducto;
    fila.innerHTML = `
      <td><p>${producto.nombre}</p></td>
      <td>${producto.cantidad} pz </td>
      <td>${producto.precio}</td>
      <td>${precioTotalProducto} MXN </td>
      <td><button class="btnBorrarProducto">Borrar de carrito</button></td>`;
    tabla.append(fila);
  }
  document.getElementById("costo-precio").textContent = costoTotal;
  let btnBorrar = document.querySelectorAll(".btnBorrarProducto");
  for (let btn of btnBorrar) {
    btn.addEventListener("click", borrarProducto);
  }
}

// Esta función se llama cuando se desea borrar un producto del carrito.
function borrarProducto(e) {
  let boton = e.target;
  let fila = boton.closest("tr");
  let nombreProducto = fila.querySelector("p").innerText;
  carrito = carrito.filter((producto) => producto.nombre !== nombreProducto);
  mostrarCarrito();
  Toastify({
    text: "Se borró del carrito",
    duration: 2000,
    position: "center",
    style: {
      fontSize: "20px",
      fontFamily: "Arial",
      color: "black",
      background: "rgb(221, 74, 74)",
      borderRadius: "25px"
    }
  }).showToast();
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Agrega eventos de clic a los botones "Agregar al carrito".
let btnCompra = document.querySelectorAll(".btn");
for (let boton of btnCompra) {
  boton.addEventListener("click", agregarCarrito);
}

document.querySelector(".btn1").addEventListener("click", () => {
  let mensajeCompra = document.createElement("div");
  mensajeCompra.innerHTML = "<h2>PRODUCTOS SELECCIONADOS PARA VENTA:</h2>";
  for (let producto of carrito) {
    let productoInfo = document.createElement("div");
    productoInfo.innerHTML = `
      <p>Nombre: ${producto.nombre}</p>
      <p>Cantidad: ${producto.cantidad}</p>
      <p>Precio unitario: ${producto.precio}</p>
      <p>Precio total del producto: ${parseFloat(producto.precio) * producto.cantidad} MXN</p>
      `;
    mensajeCompra.appendChild(productoInfo);
  }

  Swal.fire({
    title: "COMPRA SATISFACTORIA",
    text: "Gracias por su compra",
    icon: "success",
  });

  let costoTotal = 0;
  for (let producto of carrito) {
    costoTotal += parseFloat(producto.precio) * producto.cantidad;
  }

  let costoTotalInfo = document.createElement("h3");
  costoTotalInfo.textContent = `COSTO TOTAL DE LA VENTA: ${costoTotal} MXN`;
  mensajeCompra.appendChild(costoTotalInfo);

  let agradecimiento = document.createElement("p");
  agradecimiento.textContent = "Gracias por su compra, Vuelva Pronto";
  mensajeCompra.appendChild(agradecimiento);

  let carritoDiv = document.querySelector(".carrito");
  carritoDiv.innerHTML = "";
  carritoDiv.appendChild(mensajeCompra);

  localStorage.removeItem("carrito");

  carrito = [];
});

document.getElementById("reiniciar-btn").addEventListener("click", () => {
    carrito = [];
    localStorage.removeItem("carrito");
    
    window.location.reload();
});

  Toastify({
    text: "Nueva Compra",
    duration: 2000,
    position: "center",
    style: {
      fontSize: "20px",
      fontFamily: "Arial",
      color: "black",
      borderRadius: "25px"
    }
  }).showToast();

/*
  <td><img src="${producto.img}"></td>
*/