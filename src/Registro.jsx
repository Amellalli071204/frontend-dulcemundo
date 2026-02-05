import { useState } from 'react';
import axios from 'axios';

export default function Registro() {
  const [datos, setDatos] = useState({ nombre: '', email: '', password: '' });

  const manejarEnvio = async (e) => {
    e.preventDefault();
    try {
      // Usamos la URL de tu backend en Railway que ya está funcionando
      await axios.post('https://backend-dulcemundo-pro-production.up.railway.app/api/registro', datos);
      alert("¡Cuenta creada con éxito! 🍬 Bienvenido a Dulce Mundo.");
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || "No se pudo crear la cuenta"));
    }
  };

  return (
    <div className="auth-container" style={{ padding: '50px', textAlign: 'center' }}>
      <h2 style={{ color: '#ff69b4' }}>Crea tu cuenta</h2>
      <form onSubmit={manejarEnvio} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', margin: 'auto', gap: '10px' }}>
        <input type="text" placeholder="Nombre completo" required onChange={e => setDatos({...datos, nombre: e.target.value})} />
        <input type="email" placeholder="Correo" required onChange={e => setDatos({...datos, email: e.target.value})} />
        <input type="password" placeholder="Contraseña" required onChange={e => setDatos({...datos, password: e.target.value})} />
        <button type="submit" style={{ backgroundColor: '#ff69b4', color: 'white', border: 'none', padding: '10px', borderRadius: '20px', cursor: 'pointer' }}>
          Registrarme 🍭
        </button>
      </form>
    </div>
  );
}