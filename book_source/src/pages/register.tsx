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
          <h1 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Register</h1>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', }}>
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
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ marginBottom: '0.5rem', display: 'block' }}>Software Background:</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['Python', 'C++', 'ROS/ROS2', 'JavaScript/Web', 'Beginner'].map((option) => (
                  <button
                    type="button"
                    key={option}
                    onClick={() => setSoftwareBackground(option)}
                    style={{
                      padding: '0.6rem 1rem',
                      borderRadius: '20px',
                      border:
                        softwareBackground === option
                          ? '1px solid var(--ifm-color-primary)'
                          : '1px solid var(--ifm-color-emphasis-400)',
                      backgroundColor:
                        softwareBackground === option
                          ? 'var(--ifm-color-primary)'
                          : 'transparent',
                      color:
                        softwareBackground === option
                          ? 'white'
                          : 'var(--ifm-font-color-base)',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      transition: 'all 0.2s ease-in-out',
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ marginBottom: '0.5rem', display: 'block' }}>Hardware Background:</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['Arduino/ESP', 'Raspberry Pi', 'NVIDIA Jetson', 'Desktop GPU', 'None'].map((option) => (
                  <button
                    type="button"
                    key={option}
                    onClick={() => setHardwareBackground(option)}
                    style={{
                      padding: '0.6rem 1rem',
                      borderRadius: '20px',
                      border:
                        hardwareBackground === option
                          ? '1px solid var(--ifm-color-primary)'
                          : '1px solid var(--ifm-color-emphasis-400)',
                      backgroundColor:
                        hardwareBackground === option
                          ? 'var(--ifm-color-primary)'
                          : 'transparent',
                      color:
                        hardwareBackground === option
                          ? 'white'
                          : 'var(--ifm-font-color-base)',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      transition: 'all 0.2s ease-in-out',
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
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
