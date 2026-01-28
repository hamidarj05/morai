import axiosClient from "../api/axiosClient";

const KEY = "currentUser";

export function getCurrentUser() {
  const saved = localStorage.getItem(KEY);
  return saved ? JSON.parse(saved) : null;
}

export function logout() {
  localStorage.removeItem(KEY);
}

export async function login(email, password) {
  const res = await axiosClient.get("/users", {
    params: { email, password },
  });

  const user = res.data && res.data.length > 0 ? res.data[0] : null;

  if (!user) {
    throw new Error("Invalid email or password");
  }

  localStorage.setItem(KEY, JSON.stringify(user));
  return user;
}
 
export async function register({ name, email, password }) { 

  const check = await axiosClient.get("/users", { params: { email } });
  if (check.data && check.data.length > 0) {
    throw new Error("Email already used. Try another one.");
  }
 
  const newUser = {
    name,
    email,
    password,
    role: "client", 
    createdAt: new Date().toISOString(),
  };

  const created = await axiosClient.post("/users", newUser);
 
  localStorage.setItem(KEY, JSON.stringify(created.data));
  return created.data;
}
