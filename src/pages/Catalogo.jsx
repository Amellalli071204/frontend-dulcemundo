import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Catalogo.css'; // Un solo punto porque están juntos

export default function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        // Usamos la URL completa de tu backend activo
        const res = await axios.get('/api/productos');
        setProductos(res.data);
      } catch (error) {
        console.error("Error de conexión con Railway:", error);
      } finally {
        setCargando(false);
      }
    };
    obtenerProductos();
  }, []);

  if (cargando) return <h2 className="catalogo-titulo">Buscando tus dulces... 🍭</h2>;

  return (
    <div className="catalogo-container">
      <h1 className="catalogo-titulo">Nuestros Dulces 🍬</h1>
      {productos && productos.length > 0 ? (
        <div className="productos-grid">
          {productos.map((p) => (
            <div key={p.id} className="producto-card">
              <img src={p.imagen_url} alt={p.nombre} className="producto-img" />
              <h3 className="producto-nombre">{p.nombre}</h3>
              <p className="producto-precio">${p.precio}</p>
              <button className="btn-agregar">Agregar 🛒</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay dulces disponibles. ¡Revisa tu tabla en DBeaver! 🍭</p>
      )}
    </div>
  );
}