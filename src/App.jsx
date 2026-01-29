import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    // 👇 ¡PEGA AQUÍ TU LINK DE RAILWAY! (No borres las comillas)
    // Ejemplo: 'https://backend-production-xxxx.up.railway.app/api/productos'
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

  return (
    <div className="contenedor-dulces">
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
              <button>Añadir al carrito 🛒</button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App