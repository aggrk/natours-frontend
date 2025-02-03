export async function getDocs() {
  try {
    const res = await fetch("http://127.0.0.1:3000/api/v1/tours");

    if (!res.ok) {
      throw new Error(`Unable to fetch data! Status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching tours:", err.message);
    return { error: err.message };
  }
}

export async function signupUser(user) {
  try {
    const res = await fetch("http://127.0.0.1:3000/api/v1/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    if (!res.ok) {
      let error;
      if (data.message.startsWith("Duplicate"))
        error = "Email already exist! Please use another email";
      throw new Error(error || "Som ething went wrong");
    }

    return data;
  } catch (err) {
    console.log(err.message);
    throw err.message;
  }
}

export async function signinUser(credentials) {
  try {
    const res = await fetch("http://127.0.0.1:3000/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    return data;
  } catch (err) {
    console.log(err);
    throw err.message;
  }
}
