const API_URL = "http://localhost:8000";

export const getUsers = async () => {
  const res = await fetch(`${API_URL}/users`);
  return await res.json();
};