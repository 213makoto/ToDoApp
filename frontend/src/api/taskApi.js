const API_URL = "http://localhost:8000";

export const getTasks = async () => {
  const res = await fetch(`${API_URL}/tasks`);
  return await res.json();
};

export const createTask = async (task) => {
  await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
};

export const deleteTask = async (id) => {
  await fetch(`${API_URL}/tasks/${id}`, {
    method: "DELETE",
  });
};

export const updateTask = async (id, title, done) => {
  await fetch(`${API_URL}/tasks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, done, }),
  });
};
export const getTasksByUser = async (userId) => {
  const res = await fetch(
    `${API_URL}/users/${userId}/tasks`
  );

  return await res.json();
};