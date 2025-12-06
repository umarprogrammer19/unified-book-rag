import React, { useState } from 'react';
import Layout from '@theme/Layout';
import { signup } from '../services/authService';
import { useHistory } from '@docusaurus/router';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [softwareBackground, setSoftwareBackground] = useState('');
  const [hardwareBackground, setHardwareBackground] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signup(email, password, softwareBackground, hardwareBackground);
      alert('Registration successful!');
      history.push('/login'); // Redirect to login page or home
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Register" description="Register for an account">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem 0',
          minHeight: 'calc(100vh - var(--ifm-navbar-height) - var(--ifm-footer-height))',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '400px',
            padding: '2rem',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'var(--ifm-background-color)',
          }}
        >
          <h1 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Register</h1>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                padding: '0.8rem',
                border: '1px solid var(--ifm-color-emphasis-300)',
                borderRadius: '4px',
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                padding: '0.8rem',
                border: '1px solid var(--ifm-color-emphasis-300)',
                borderRadius: '4px',
              }}
            />
            <input
              type="text"
              placeholder="Software Background"
              value={softwareBackground}
              onChange={(e) => setSoftwareBackground(e.target.value)}
              style={{
                padding: '0.8rem',
                border: '1px solid var(--ifm-color-emphasis-300)',
                borderRadius: '4px',
              }}
            />
            <input
              type="text"
              placeholder="Hardware Background"
              value={hardwareBackground}
              onChange={(e) => setHardwareBackground(e.target.value)}
              style={{
                padding: '0.8rem',
                border: '1px solid var(--ifm-color-emphasis-300)',
                borderRadius: '4px',
              }}
            />
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '0.8rem 1.2rem',
                backgroundColor: 'var(--ifm-color-primary)',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                fontSize: '1rem',
              }}
            >
              {loading ? 'Loading...' : 'Register'}
            </button>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
