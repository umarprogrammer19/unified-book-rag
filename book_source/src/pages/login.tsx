import React, { useState } from 'react';
import Layout from '@theme/Layout';
import { signin } from '../services/authService';
import Link from '@docusaurus/Link';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signin(email, password);
      window.location.href = '/'; // Redirect to home page with hard refresh
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Login" description="Login to your account">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem 0',
          minHeight: '90vh',
          margin: "50px 0 0 0"
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
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
          }}
        >
          <h1 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Login</h1>
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
              {loading ? 'Loading...' : 'Login'}
            </button>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
          </form>
          <p style={{ textAlign: 'center', marginTop: '1rem' }}>
            Need an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
