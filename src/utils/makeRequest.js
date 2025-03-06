import axios from "axios";

const API_BASE_URL = "https://natours-api-chd9.onrender.com/api/v1";

const makeRequest = async (method, url, data = null, options = {}) => {
  try {
    const config = {
      method,
      url: `${API_BASE_URL}${url}`,
      data,
      withCredentials: true,
      ...options,
    };

    const res = await axios(config);
    return res.data;
  } catch (err) {
    const errMessage = err?.response?.data?.message || "Something went wrong!";
    console.error(`Error in ${method} ${url}:`, errMessage);
    throw new Error(errMessage);
  }
};

export default makeRequest;
