import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  
  // Obtenemos el usuario del localStorage para saber si está logueado
  const usuarioJson = localStorage.getItem('usuario');
  const usuario = usuarioJson ? JSON.parse(usuarioJson) : null;

  const cerrarSesion = () => {
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <Link to="/" style={styles.linkLogo}>Dulce Mundo 🍭</Link>
      </div>
      
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Catálogo</Link>
        <Link to="/carrito" style={styles.link}>Carrito 🛒</Link>

        {!usuario ? (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/registro" style={styles.link}>Registro</Link>
          </>
        ) : (
          <>
            {/* Si es admin, mostramos el link especial */}
            {usuario.rol === 'admin' && (
              <Link to="/admin" style={styles.linkAdmin}>Panel Admin ⚙️</Link>
            )}
            <button onClick={cerrarSesion} style={styles.btnCerrar}>Salir</button>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#fff0f5', // Rosa pastel
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  linkLogo: {
    textDecoration: 'none',
    color: '#ff69b4',
  },
  links: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center'
  },
  link: {
    textDecoration: 'none',
    color: '#555',
    fontWeight: '500'
  },
  linkAdmin: {
    textDecoration: 'none',
    color: '#ff1493',
    fontWeight: 'bold',
    border: '1px solid #ff1493',
    padding: '5px 10px',
    borderRadius: '10px'
  },
  btnCerrar: {
    backgroundColor: '#ff69b4',
    color: 'white',
    border: 'none',
    padding: '5px 15px',
    borderRadius: '15px',
    cursor: 'pointer'
  }
};