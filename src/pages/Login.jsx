import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [credenciales, setCredenciales] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setCredenciales({ ...credenciales, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // CORRECCIÓN: Usamos 'credenciales' que es la variable definida
            const res = await axios.post('https://backend-dulcemundo-pro-production.up.railway.app/api/login', credenciales);
            
            if (res.data.success) {
                alert(`¡Bienvenida, ${res.data.user.nombre}! 🍭`);
                window.location.href = '/catalogo';
            }
        } catch (error) {
            console.error("Error en el login:", error);
            alert("Credenciales incorrectas o error de conexión ❌");
        }
    };

    return (
        <div style={{ padding: '50px', color: 'white', textAlign: 'center' }}>
            <h1 style={{ color: '#ff69b4' }}>Iniciar Sesión</h1>
            <form onSubmit={handleSubmit} style={{ display: 'inline-block', textAlign: 'left' }}>
                <input 
                    type="email" name="email" placeholder="Tu correo" 
                    onChange={handleChange} required 
                    style={{ display: 'block', margin: '10px 0', padding: '10px', width: '300px' }}
                />
                <input 
                    type="password" name="password" placeholder="Tu contraseña" 
                    onChange={handleChange} required 
                    style={{ display: 'block', margin: '10px 0', padding: '10px', width: '300px' }}
                />
                <button type="submit" style={{ backgroundColor: '#ff69b4', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer', borderRadius: '20px', width: '100%' }}>
                    Entrar 🍭
                </button>
            </form>
        </div>
    );
};

export default Login;