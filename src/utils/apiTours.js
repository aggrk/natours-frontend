import makeRequest from "./makeRequest";

// Fetch tours
export async function getTours() {
  return makeRequest("get", "/tours");
}

//Signup user
export async function signupUser(user) {
  return makeRequest("post", "/users/signup", user);
}

//Signin user
export async function signinUser(userCred) {
  return makeRequest("post", "/users/login", userCred);
}

//Fetch user data
export async function fetchUser() {
  return makeRequest("get", "/users/me");
}

//logoutUser
export async function logoutUser() {
  return makeRequest("get", "/users/logout");
}

//Forgot password
export async function forgotPassword(email) {
  return makeRequest("post", "/users/forgotPassword", email);
}

//Update password
export async function updatePassword(data, token) {
  return makeRequest("patch", `/users/resetPassword/${token}`, data);
}

//Get a tour
export async function getTour(id) {
  return makeRequest("get", `/tours/${id}`);
}

//Update user
export async function updateUser(data) {
  return makeRequest("patch", "/users/updateMe", data);
}

//Update user(logged in) passsword
export async function changePassword(data) {
  return makeRequest("patch", "/users/updateMyPassword", data);
}

//Adding tour to favorite
export async function createFavorite(tour) {
  return makeRequest("post", "/favorites", tour);
}

//Fetching all favorites tours
export async function getFavorites() {
  return makeRequest("get", "/favorites");
}

//Remove a tour from favorites
export async function removeFavorite(id) {
  return makeRequest("delete", `/favorites/${id}`);
}

//Get All activities
export async function getActivities() {
  return makeRequest("get", "/activities");
}
