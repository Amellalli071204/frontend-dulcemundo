import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [credenciales, setCredenciales] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const entrar = async (e) => {
    e.preventDefault();
    try {
      // Agregamos /api/login al final de tu URL
      const res = await axios.post('https://backend-dulcemundo-pro-production.up.railway.app/api/login', credentials);
      
      if (res.data.success) {
        // Guardamos los datos del usuario para el Navbar
        localStorage.setItem('usuario', JSON.stringify(res.data.user));
        alert(`¡Hola ${res.data.user.nombre}! 👋`);
        navigate('/'); // Te manda al inicio después de entrar
      }
    } catch (error) {
      alert("Credenciales incorrectas o error de conexión ❌");
      console.error(error);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 style={{ color: '#ff69b4' }}>Iniciar Sesión</h1>
      <form onSubmit={entrar} style={{ display: 'inline-block', textAlign: 'left' }}>
        <input 
          type="email" 
          placeholder="Tu correo" 
          onChange={(e) => setCredenciales({...credenciales, email: e.target.value})} 
          required 
          style={styles.input}
        /><br/>
        <input 
          type="password" 
          placeholder="Tu contraseña" 
          onChange={(e) => setCredenciales({...credenciales, password: e.target.value})} 
          required 
          style={styles.input}
        /><br/>
        <button type="submit" style={styles.boton}>Entrar 🍭</button>
      </form>
    </div>
  );
}

const styles = {
  input: { padding: '10px', margin: '5px', borderRadius: '5px', border: '1px solid #ccc', width: '250px' },
  boton: { padding: '10px 20px', backgroundColor: '#ff69b4', color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer', width: '100%', marginTop: '10px' }
};