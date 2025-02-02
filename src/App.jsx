// import { BrowserRouter, Route, Routes } from "react-router";
import { useEffect, useState } from "react";
import Header from "./layouts/Header";
import Main from "./components/Main";
import { useQueryClient } from "@tanstack/react-query";

export default function App() {
  // const [tours, setTours] = useState([]);
  // const [error, setError] = useState("");

  // useEffect(() => {
  //   async function fetchTours() {
  //     try {
  //       const res = await fetch("http://127.0.0.1:3000/api/v1/tours");
  //       const data = await res.json();
  //       console.log(data);
  //     } catch (err) {
  //       setError(err);
  //     }
  //   }
  //   fetchTours();
  // }, []);

  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="" element={<Header />} />
    //   </Routes>
    // </BrowserRouter>
    <>
      <Header />
      <Main />
    </>
  );
}
