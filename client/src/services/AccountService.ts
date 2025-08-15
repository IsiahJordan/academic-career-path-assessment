import api from "@/services/api"

export async function createAccountFromToken(token) {
  const res = await api.post(
    "/create_account_from_token",
    {}, // no body needed
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}


export async function getUserAccount(token) {
  const res = await api.get("/account/details", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

