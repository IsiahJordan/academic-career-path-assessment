import api from './api'

export async function postSignup(userData){
  const res = await api.post("/signup", userData);
  return res.data;
}

export async function postAccountCheck(userData){
  const res = await api.post("/account/exist", userData);
  return res.data;
}

export async function postSignin(userData){
  const res = await api.post("/signin", userData);
  return res.data;
}

export async function verifyUser(token) {
  console.log(token);
  const res = await api.get("/verify", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export async function logoutUser() {
  try {
    const res = await api.post("/logout");
    return res.data; // { status: 1, message: "Logout successful" }
  } catch {
    return { status: 0, message: "Logout failed" };
  }
}

