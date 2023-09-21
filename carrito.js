let carrito = [];

  function agregarCarrito(e) {
    let hijo = e.target;
    let padre = hijo.parentNode;
    let abuelo = padre.parentNode;

    let nombreProducto = padre.querySelector(".nombre-refaccion").innerText;
    let precioProducto = padre.querySelector(".precio").innerText;
    let imgProducto = abuelo.querySelector(".img").src;

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

    mostrarCarrito();
  }

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

  function borrarProducto(e) {
    let abuelo = e.target.parentNode.parentNode;
    let productoEliminar = abuelo.querySelector("p").innerText;
    
    carrito = carrito.filter((producto) => producto.nombre !== productoEliminar);
    
    mostrarCarrito();
  }

  // Eventos
  let btnCompra = document.querySelectorAll(".btn");

  for (let boton of btnCompra) {
    boton.addEventListener("click", agregarCarrito);
  }
  document.querySelector(".btn1").addEventListener("click", () => {
  console.log("PRODUCTOS SELECCIONADOS PARA VENTA:");
  for (let producto of carrito) {
    console.log(`Nombre: ${producto.nombre}`);
    console.log(`Cantidad: ${producto.cantidad}`);
    console.log(`Precio unitario: ${producto.precio}`);
    console.log(`Precio total del producto: ${parseFloat(producto.precio) * producto.cantidad} MXN`);
  }
  
  let costoTotal = 0;
  for (let producto of carrito) {
    costoTotal += parseFloat(producto.precio) * producto.cantidad;
  }
  console.log(`COSTO TOTAL DE LA VENTA: ${costoTotal} MXN`);
  console.log("Gracias por su compra, Vuelva Pronto")
    
  carrito = [];
  mostrarCarrito();
});

/*
  <td><img src="${producto.img}"></td>
*/