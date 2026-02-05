import React from 'react';
import './Catalogo.css';

function Catalogo({ productos, agregar }) {
  return (
    <div className="pantalla-tienda">
      <div className="grid-productos">
        {productos.map(p => (
          <div key={p.id} className="tarjeta-dulce">
            <div className="imagen-contenedor">
              <img src={p.imagen_url} alt={p.nombre} />
            </div>
            <h3>{p.nombre}</h3>
            <p className="precio-tag">${p.precio}</p>
            <button className="btn-agregar" onClick={() => agregar(p)}>
              Agregar 🛒
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalogo;