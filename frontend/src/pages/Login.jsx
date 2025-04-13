import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import styles from '../styles/Login.module.css';

function Login() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    navigate('/tasks');
    } catch (err) {
    console.error(err);
    setError('Credenciales incorrectas o error de servidor');
    }
};

return (
    <div className={styles.container}>
    <h2>Iniciar sesión</h2>
    <form onSubmit={handleSubmit} className={styles.form}>
        <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
