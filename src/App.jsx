import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [productos, setProductos] = useState([])
  const [carrito, setCarrito] = useState([]) // <--- Nuevo: Memoria del carrito

  useEffect(() => {
    // 👇 TU LINK DE RAILWAY (Verifica que sea el correcto)
    const URL_BACKEND = 'https://backend-dulcemundo-pro-production.up.railway.app/api/productos';

    axios.get(URL_BACKEND)
      .then(response => {
        console.log("Datos recibidos:", response.data);
        setProductos(response.data);
      })
      .catch(error => {
        console.error("Error cargando dulces:", error);
      })
  }, [])

  // --- Función para agregar al carrito ---
  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]); // Guardamos el dulce en la lista
    alert(`¡Qué rico! Agregaste ${producto.nombre} al carrito 🍬`);
  }

  return (
    <div className="contenedor-dulces">
      {/* Icono flotante del Carrito */}
      <div className="carrito-icono">
        🛒 Carrito: {carrito.length} artículos
      </div>

      <h1>🌸 Dulce Mundo 🍬</h1>
      
      <div className="grid-productos">
        {productos.length === 0 ? (
          <p>Cargando dulces...</p>
        ) : (
          productos.map(producto => (
            <div key={producto.id} className="tarjeta">
              <img src={producto.imagen_url} alt={producto.nombre} />
              <h3>{producto.nombre}</h3>
              <p className="precio">${producto.precio}</p>
              
              {/* Botón activo */}
              <button onClick={() => agregarAlCarrito(producto)}>
                Añadir al carrito 🛒
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App