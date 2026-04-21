import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import './Login.css';

const cookies = new Cookies();

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Obtener usuarios del localStorage
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Verificar que el email exista
        const usuarioEncontrado = usuarios.filter(user => user.email === email);

        if (usuarioEncontrado.length === 0) {
            setError('El email no está registrado');
            setLoading(false);
            return;
        }

        // Verificar que la contraseña coincida
        if (usuarioEncontrado[0].password !== password) {
            setError('La contraseña es incorrecta');
            setLoading(false);
            return;
        }

        // Si todo es correcto, establecer la cookie
        cookies.set('user-auth', email);

        // Limpiar formulario
        setEmail('');
        setPassword('');
        setError('');
        setLoading(false);

        // Redirigir al home
        window.location.href = '/';
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@email.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Ingresa tu contraseña"
                            required
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Cargando...' : 'Iniciar sesión'}
                    </button>
                </form>

                <p className="auth-link">
                    ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
                </p>
            </div>
        </div>
    );
}

export default Login;
