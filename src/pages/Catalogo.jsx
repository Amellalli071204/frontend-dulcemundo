import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Catalogo = () => {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const res = await axios.get('https://backend-dulcemundo-pro-production.up.railway.app/api/productos');
                if (Array.isArray(res.data)) {
                    setProductos(res.data);
                }
            } catch (err) {
                console.error("Error al cargar productos:", err);
                setError("No se pudieron cargar los dulces. Revisa la conexión.");
            }
        };
        fetchProductos();
    }, []);

    return (
        <div style={{ padding: '20px', color: 'white' }}>
            <h1 style={{ color: '#ff69b4' }}>Nuestros Dulces 🍭</h1>
            {error && <p style={{ color: 'yellow' }}>⚠️ {error}</p>}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                {productos.map(p => (
                    <div key={p.id} style={{ border: '1px solid #ff69b4', padding: '15px', borderRadius: '10px' }}>
                        <img src={p.imagen_url} alt={p.nombre} style={{ width: '100%', borderRadius: '5px' }} />
                        <h3>{p.nombre}</h3>
                        <p style={{ color: '#ff69b4' }}>${p.precio}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Catalogo;