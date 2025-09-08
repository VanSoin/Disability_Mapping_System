import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import UploadPage from "./components/trial";
import Login from "./components/Login"; // Import Login
import Dashboard from "./components/Sidebar"; // Optional: Add Dashboard
export default function App() {
 const [auth, setAuth] = useState(!!localStorage.getItem("token"));
 useEffect(() => {
 document.title = "Disable Friendly Map";
 }, []);
 return (
 <BrowserRouter>
 <Routes>
 <Route path="/" element={<Layout />}>
 <Route path="upload" element={<UploadPage />} />
 <Route path="login" element={<Login setAuth={setAuth} />} />
 <Route
 path="dashboard"
 element={auth ? <Dashboard /> : <Login setAuth={setAuth} />}
 />
 </Route>
 </Routes>
 </BrowserRouter>
 );
}
