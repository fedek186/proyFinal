import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import './Register.css';

const cookies = new Cookies();

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleRegister = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        // Obtener usuarios del localStorage
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Verificar que el email no exista
        const emailExiste = usuarios.some(user => user.email === email);

        if (emailExiste) {
            setError('El email ya está registrado');
            setLoading(false);
            return;
        }

        // Verificar que la contraseña sea mayor a 6 caracteres
        if (password.length <= 6) {
            setError('La contraseña debe tener más de 6 caracteres');
            setLoading(false);
            return;
        }

        // Verificar que las contraseñas coincidan
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            setLoading(false);
            return;
        }

        // Si todo es correcto, agregar el usuario
        usuarios.push({ email, password });
        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        // Establecer la cookie
        cookies.set('user-auth', email,);

        // Mostrar mensaje de éxito
        setSuccess('¡Registro exitoso! Redirigiendo...');
        
        // Limpiar formulario
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setLoading(false);

        // Redirigir al home después de 2 segundos
        setTimeout(() => {
            window.location.href = '/';
        }, 2000);
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h1>Register</h1>
                <form onSubmit={handleRegister}>
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
                            placeholder='password'
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirmar contraseña</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Repite tu contraseña"
                            required
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">{success}</div>}

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Registrando...' : 'Registrarse'}
                    </button>
                </form>

                <p className="auth-link">
                    ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
                </p>
            </div>
        </div>
    );
}

export default Register;
