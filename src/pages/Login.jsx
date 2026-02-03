import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { gsap } from 'gsap';
import { Zap, Mail, Lock } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
      });

      gsap.from(formRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out'
      });
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const result = login(email, password);
    if (result.success) {
      gsap.to(formRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => navigate('/dashboard')
      });
    } else {
      setError(result.error);
      gsap.fromTo(formRef.current,
        { x: -10 },
        { x: 0, duration: 0.1, repeat: 5, yoyo: true, ease: 'power1.inOut' }
      );
    }
  };

  return (
    <div ref={containerRef} className="login-container">
      <div className="login-content">
        <div ref={formRef} className="login-card">
          <div className="login-header">
            <div className="logo-container">
              <Zap size={40} className="logo-icon" />
            </div>
            <h1>Watt-Watch</h1>
            <p className="tagline">Intelligent Campus Energy Auditor</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">
                <Mail size={18} />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@wattwatch.ai"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">
                <Lock size={18} />
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="login-button">
              Sign In
            </button>

            <div className="demo-credentials">
              <p className="demo-label">Demo Credentials:</p>
              <p>Email: <strong>admin@wattwatch.ai</strong></p>
              <p>Password: <strong>admin123</strong></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
