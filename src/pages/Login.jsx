import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    // Definimos el estado con el nombre 'credenciales'
    const [credenciales, setCredenciales] = useState({ email: '', password: '' });
    const [cargando, setCargando] = useState(false);

    const handleChange = (e) => {
        setCredenciales({ ...credenciales, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);
        try {
            // ✅ CORRECTO: Usamos la URL completa y la variable 'credenciales'
            const res = await axios.post('https://backend-dulcemundo-pro-production.up.railway.app/api/login', credenciales);
            
            if (res.data.success) {
                // ✅ REAL: Guardamos los datos del usuario para persistencia
                localStorage.setItem('usuario', JSON.stringify(res.data.user));
                
                alert(`¡Bienvenida de nuevo, ${res.data.user.nombre}! 🍭`);
                
                // Redirigimos al catálogo
                window.location.href = '/catalogo';
            }
        } catch (error) {
            console.error("Error en el login:", error);
            // Si el backend responde con un error 401 o 500
            const mensaje = error.response?.data?.message || "Error de conexión con el servidor";
            alert(`❌ ${mensaje}`);
        } finally {
            setCargando(false);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Iniciar Sesión 🍬</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Correo electrónico" 
                    onChange={handleChange} 
                    value={credenciales.email}
                    required 
                    style={styles.input}
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Contraseña" 
                    onChange={handleChange} 
                    value={credenciales.password}
                    required 
                    style={styles.input}
                />
                <button 
                    type="submit" 
                    disabled={cargando}
                    style={cargando ? styles.buttonDisabled : styles.button}
                >
                    {cargando ? 'Entrando...' : 'Entrar 🚀'}
                </button>
            </form>
            <p style={styles.text}>
                ¿No tienes cuenta? <a href="/registro" style={styles.link}>Regístrate aquí</a>
            </p>
        </div>
    );
};

// Estilos básicos para que se vea genial
const styles = {
    container: { padding: '50px', textAlign: 'center', backgroundColor: '#1a1a1a', minHeight: '100vh', color: 'white' },
    title: { color: '#ff69b4', marginBottom: '30px' },
    form: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' },
    input: { padding: '12px', width: '300px', borderRadius: '8px', border: '1px solid #ff69b4', backgroundColor: '#333', color: 'white' },
    button: { padding: '12px 30px', borderRadius: '25px', border: 'none', backgroundColor: '#ff69b4', color: 'white', cursor: 'pointer', fontWeight: 'bold', width: '325px' },
    buttonDisabled: { padding: '12px 30px', borderRadius: '25px', border: 'none', backgroundColor: '#555', color: '#aaa', width: '325px' },
    text: { marginTop: '20px' },
    link: { color: '#ff69b4', textDecoration: 'none' }
};

export default Login;