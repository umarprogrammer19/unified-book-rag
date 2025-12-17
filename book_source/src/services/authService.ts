import { AUTH_BASE_URL } from '../utils/env';

/**
 * Store authentication token in localStorage
 */
const storeToken = (token: string) => {
  localStorage.setItem('auth_token', token);
};

/**
 * Retrieve authentication token from localStorage
 */
const getToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

/**
 * Remove authentication token from localStorage
 */
const removeToken = () => {
  localStorage.removeItem('auth_token');
};

/**
 * Store user data in localStorage
 */
const storeUserData = (userData: any) => {
  localStorage.setItem('user_data', JSON.stringify(userData));
};

/**
 * Retrieve user data from localStorage
 */
const getUserData = (): any => {
  const userDataString = localStorage.getItem('user_data');
  return userDataString ? JSON.parse(userDataString) : null;
};

/**
 * Remove user data from localStorage
 */
const removeUserData = () => {
  localStorage.removeItem('user_data');
};

/**
 * Sign in user and store token in localStorage
 */
export const signin = async (email: string, password: string) => {
  const response = await fetch(`${AUTH_BASE_URL}/api/auth/signin`, {
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

  const result = await response.json();

  // Store token and user data in localStorage
  if (result.token) {
    storeToken(result.token);
    storeUserData(result.user);
  }

  return result;
};

/**
 * Sign up user and store token in localStorage
 */
export const signup = async (email: string, password: string, software_background: string, hardware_background: string) => {
  const response = await fetch(`${AUTH_BASE_URL}/api/auth/signup`, {
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

  const result = await response.json();

  // Store token and user data in localStorage
  if (result.token) {
    storeToken(result.token);
    storeUserData(result.user);
  }

  return result;
};

/**
 * Logout user and remove stored data
 */
export const logout = () => {
  removeToken();
  removeUserData();
};

/**
 * Get current user data from localStorage
 */
export const getCurrentUser = () => {
  return getUserData();
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  const token = getToken();
  return !!token;
};

/**
 * Get authentication token
 */
export const getAuthToken = (): string | null => {
  return getToken();
};
