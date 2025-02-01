import { useEffect, useState } from "react";

export default function App() {
  const [tours, setTours] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTours() {
      try {
        const res = await fetch("http://127.0.0.1:3000/api/v1/tours");
        const data = await res.json();
        console.log(data);
      } catch (err) {
        setError(err);
      }
    }
    fetchTours();
  }, []);

  return (
    <div>
      <p></p>
    </div>
  );
}
