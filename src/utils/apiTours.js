import axios from "axios";

const API_BASE_URL = "https://natours-api-chd9.onrender.com/api/v1";

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
    return res.data;
  } catch (err) {
    console.log(err?.response?.data.message);
    const errMessage =
      err?.response?.data.message || "Failed to fetch user out";
    throw new Error(errMessage);
  }
}

//Forgot password
export async function forgotPassword(email) {
  try {
    const res = await axios.post(
      `${API_BASE_URL}/users/forgotPassword`,
      email,
      { withCredentials: true },
    );

    console.log(res.data);
    return res.data;
  } catch (err) {
    const errMessage = err?.response?.data.message;
    console.log(errMessage);
    throw new Error(errMessage);
  }
}

export async function updatePassword(data, token) {
  try {
    const res = await axios.patch(
      `${API_BASE_URL}/users/resetPassword/${token}`,
      data,
      { withCredentials: true },
    );
    return res.data;
  } catch (err) {
    const errMessage = err?.response?.data.message;
    console.log(err.response);
    throw new Error(errMessage);
  }
}

export async function getTour(id) {
  try {
    const res = await axios.get(`${API_BASE_URL}/tours/${id}`, {
      withCredentials: true,
    });

    return res.data;
  } catch (err) {
    const errMessage = err?.response?.data.message;
    console.log(errMessage);
    throw new Error(errMessage);
  }
}

export async function updateUser(data) {
  try {
    const res = await axios.patch(`${API_BASE_URL}/users/updateMe`, data, {
      withCredentials: true,
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    const errMessage = err?.response?.data.message;
    console.log(errMessage);
    throw new Error(errMessage);
  }
}

export async function createFavorite(tour) {
  try {
    const res = await axios.post(`${API_BASE_URL}/favorites`, tour, {
      withCredentials: true,
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    const errMessage = err?.response?.data.message;
    console.log(errMessage);
    throw new Error(errMessage);
  }
}

export async function getFavorites() {
  try {
    const res = await axios.get(`${API_BASE_URL}/favorites`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.log(err?.response?.data.message);
    const errMessage =
      err?.response?.data.message || "Failed to fetch user data";
    throw new Error(errMessage);
  }
}

export async function removeFavorite(id) {
  try {
    const res = await axios.delete(`${API_BASE_URL}/favorites/${id}`, {
      withCredentials: true,
    });

    return res.data;
  } catch (err) {
    console.log(err?.response?.data.message);
    const errMessage =
      err?.response?.data.message || "Failed to fetch user data";
    throw new Error(errMessage);
  }
}
