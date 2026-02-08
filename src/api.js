// const API_BASE = "http://localhost:6003/api/users";

// export const signupUser = async (data) => {
//   const res = await fetch(`${API_BASE}/signup`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
//   return res.json();
// };

// export const loginUser = async (data) => {
//   const res = await fetch(`${API_BASE}/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
//   return res.json();
// };

// https://newb-1.onrender.com

 const API = process.env.REACT_APP_API_BASE_URL;
async function handleRes(res) {
  const json = await res.json().catch(() => ({}));
  // normalize backend response: some versions return { message, user } others { user }
  return { status: res.status, body: json };
}

export const signupUser = async (data) => {
  const res = await fetch(`${API}/api/users/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleRes(res);
};

// export const loginUser = async (data) => {
//   // const res = await fetch(`https://newb-2.onrender.com/api/users/login`, {
//    const res = await fetch(`http://localhost:6003/api/users/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
//   return handleRes(res);
// };


export const loginUser = async (data) => {
  const res = await fetch(`${API}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) {
    throw json; // pass backend error
  }

  return json; // 👈 IMPORTANT
};