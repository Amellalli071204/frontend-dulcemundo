import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [credenciales, setCredenciales] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const entrar = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://backend-dulcemundo-pro-production.up.railway.app/api/login', credenciales);
      if (res.data.success) {
        // Guardamos el rol (admin o cliente) para saber qué mostrar
        localStorage.setItem('usuario', JSON.stringify(res.data.user));
        alert(`¡Hola ${res.data.user.nombre}!`);
        
        // Si eres admin, te mandamos al panel de control
        if (res.data.user.rol === 'admin') navigate('/admin');
        else navigate('/');
      }
    } catch (err) {
      alert("Credenciales incorrectas ❌");
    }
  };

  return (
    <div className="auth-container" style={{ padding: '50px', textAlign: 'center' }}>
      <h2 style={{ color: '#ff69b4' }}>Iniciar Sesión</h2>
      <form onSubmit={entrar} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', margin: 'auto', gap: '10px' }}>
        <input type="email" placeholder="Tu correo" onChange={e => setCredenciales({...credenciales, email: e.target.value})} />
        <input type="password" placeholder="Tu contraseña" onChange={e => setCredenciales({...credenciales, password: e.target.value})} />
        <button type="submit" style={{ backgroundColor: '#ff69b4', color: 'white', border: 'none', padding: '10px', borderRadius: '20px', cursor: 'pointer' }}>
          Entrar 🍬
        </button>
      </form>
    </div>
  );
}