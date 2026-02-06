import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Catalogo.css'; 

export default function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        // Agregamos /api/productos al final de tu URL de Railway
        const res = await axios.get('https://backend-dulcemundo-pro-production.up.railway.app/api/productos');
        setProductos(res.data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setCargando(false);
      }
    };
    obtenerProductos();
  }, []);

  if (cargando) return <h2 className="catalogo-titulo">Cargando dulzura... 🍭</h2>;

  return (
    <div className="catalogo-container">
      <h1 className="catalogo-titulo">Nuestros Dulces 🍬</h1>
      
      {/* Validación para evitar el error de 'undefined reading map' */}
      {productos && productos.length > 0 ? (
        <div className="productos-grid">
          {productos.map((producto) => (
            <div key={producto.id} className="producto-card">
              <img src={producto.imagen_url} alt={producto.nombre} className="producto-img" />
              <h3 className="producto-nombre">{producto.nombre}</h3>
              <p className="producto-precio">${producto.precio}</p>
              <button className="btn-agregar">Agregar al Carrito 🛒</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay dulces disponibles. ¡Asegúrate de insertarlos en DBeaver! 🍭</p>
      )}
    </div>
  );
}