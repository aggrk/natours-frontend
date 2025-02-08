import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:3000/api/v1";

// Fetch tours
export async function getTours() {
  try {
    const res = await axios.get(`${API_BASE_URL}/tours`);
    return res.data;
  } catch (err) {
    console.error(
      "Error fetching tours:",
      err.response?.data?.message || err.message,
    );
    return { error: err.response?.data?.message || "Failed to fetch tours" };
  }
}

//Signup user
export async function signupUser(user) {
  try {
    const res = await axios.post(`${API_BASE_URL}/users/signup`, user, {
      withCredentials: true,
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    const errMessage = err?.response?.data.message || "Something went wrong!";
    console.log(errMessage);
    if (errMessage.startsWith("Duplicate"))
      throw new Error("Email already exist, Please use another email");
    throw Error(errMessage);
  }
}

//Signin user
export async function signinUser(userCred) {
  try {
    const res = await axios.post(`${API_BASE_URL}/users/login`, userCred, {
      withCredentials: true,
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err.response);
    throw new Error(err?.response?.data.message);
  }
}

//Fetch user data
export async function fetchUser() {
  try {
    const res = await axios.get(`${API_BASE_URL}/users/me`, {
      withCredentials: true,
    });
    console.log(res.data);

    return res.data;
  } catch (err) {
    console.log(err?.response?.data.message);
    const errMessage =
      err?.response?.data.message || "Failed to fetch user data";
    throw new Error(errMessage);
  }
}

//logoutUser
export async function logoutUser() {
  try {
    const res = await axios.get(`${API_BASE_URL}/users/logout`, {
      withCredentials: true,
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err?.response?.data.message);
    const errMessage =
      err?.response?.data.message || "Failed to fetch user out";
    throw new Error(errMessage);
  }
}
