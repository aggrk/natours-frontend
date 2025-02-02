export async function getDocs() {
  try {
    const res = await fetch("https://tunga-natours.onrender.com/api/v1/tours");

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
