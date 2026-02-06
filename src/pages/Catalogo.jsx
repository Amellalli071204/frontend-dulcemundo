import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Catalogo = () => {
    const [productos, setProductos] = useState([]); // Iniciamos con lista vacía
    const [error, setError] = useState(null);

    const fetchProductos = async () => {
        try {
            // Usamos la ruta corta gracias al Proxy que ya configuramos
            const res = await axios.get('https://backend-dulcemundo-pro-production.up.railway.app/api/productos');
            
            console.log("Datos recibidos del backend:", res.data);

            // VALIDACIÓN MAESTRA: Si no es lista, no hacemos .map
            if (Array.isArray(res.data)) {
                setProductos(res.data);
            } else {
                console.error("El backend no mandó una lista, mandó:", res.data);
                setError("El servidor mandó un formato incorrecto.");
                setProductos([]); 
            }
        } catch (err) {
            console.error("Error al conectar con Railway:", err);
            setError("No se pudieron cargar los dulces. Revisa la conexión.");
        }
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    return (
        <div style={{ padding: '20px', color: 'white', backgroundColor: '#1a1a1a', minHeight: '100vh' }}>
            <h1 style={{ color: '#ff69b4' }}>Nuestros Dulces 🍭</h1>
            
            {error && <p style={{ color: 'yellow' }}>⚠️ {error}</p>}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                {productos.length > 0 ? (
                    productos.map((producto) => (
                        <div key={producto.id} style={{ border: '1px solid #ff69b4', padding: '15px', borderRadius: '10px' }}>
                            <img 
                                src={producto.imagen_url} 
                                alt={producto.nombre} 
                                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px' }} 
                            />
                            <h3>{producto.nombre}</h3>
                            <p>{producto.descripcion}</p>
                            <p style={{ fontWeight: 'bold', color: '#ff69b4' }}>${producto.precio}</p>
                            <button style={{ backgroundColor: '#ff69b4', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>
                                Agregar al carrito 🛒
                            </button>
                        </div>
                    ))
                ) : (
                    !error && <p>Cargando dulces deliciosos... 🍬</p>
                )}
            </div>
        </div>
    );
};

export default Catalogo;