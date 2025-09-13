const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

export async function signup(data) {
  const res = await fetch(`${API_BASE}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  const payload = await res.json();
  
  if (!res.ok) throw new Error(payload.error || 'Signup failed');
  
  // Extract user and token from the nested data structure
  if (payload.success && payload.data) {
    const { user, token } = payload.data;
    return { user, token };
  } else {
    throw new Error('Invalid response structure from signup API');
  }
}

export async function login(data) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  const payload = await res.json();
  
  if (!res.ok) throw new Error(payload.error || 'Login failed');
  
  // Extract user and token from the nested data structure
  if (payload.success && payload.data) {
    const { user, token } = payload.data;
    return { user, token };
  } else {
    throw new Error('Invalid response structure from login API');
  }
}

export async function postShareNeed(formType, formData, userId) {
  const API_URL = `${API_BASE}/api/needs`;
  const payload = { formType, formData, userId };
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.error || 'Failed to post share need');
  return result;
}
