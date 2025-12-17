const BASE_URL = "get from env BASE_URL" || 'http://localhost:5000';

export const signin = async (email: string, password: string) => {
  const response = await fetch(`${BASE_URL}/api/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Sign-in failed');
  }

  return response.json();
};

export const signup = async (email: string, password: string, software_background: string, hardware_background: string) => {
  const response = await fetch(`${BASE_URL}/api/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, software_background, hardware_background }),
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Sign-up failed');
  }

  return response.json();
};
