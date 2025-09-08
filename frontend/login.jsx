import React, { useState } from "react";
import axios from "axios";
const Login = ({ setAuth }) => {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [message, setMessage] = useState("");
 const [showDetailsForm, setShowDetailsForm] = useState(false);
 // User details form state
 const [name, setName] = useState("");
 const [age, setAge] = useState("");
 const [disability, setDisability] = useState("");
 const handleLogin = async (e) => {
 e.preventDefault();
 try {
 const response = await axios.post("http://localhost:5000/api/users/login", {
 email,
 password,
 });
 localStorage.setItem("token", response.data.token); // Store token
 localStorage.setItem("email", email); // Store email separately for details submission
 setMessage("✅ Login successful!");
 setAuth(true);
 setShowDetailsForm(true); // Show details form after login
 } catch (error) {
 setMessage(error.response?.data?.error || "❌ Login failed.");
 }
 };
 const handleUserDetailsSubmit = async (e) => {
 e.preventDefault();
 try {
 const token = localStorage.getItem("token");
 const email = localStorage.getItem("email"); // Get stored email
 const response = await axios.post(
 "http://localhost:5000/api/users/details",
 { email, name, age, disability }, // Include email in request body
 { headers: { Authorization: Bearer ${token} } } // Send token for authentication
 );
 setMessage("✅ Details submitted successfully!");
 } catch (error) {
 setMessage(error.response?.data?.error || "❌ Failed to submit details.");
 }
 };
 return (
 <div className="flex justify-center items-center min-h-screen">
 <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
 <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
 {!showDetailsForm ? (
 // Login Form
 <form onSubmit={handleLogin} className="space-y-4">
 <div>
 <label className="block text-gray-700 font-medium">Email</label>
 <input
 type="email"
 className="w-full px-4 py-2 mt-2 border rounded-lg"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 required
 />
 </div>
  <div>
 <label className="block text-gray-700 font-medium">Password</label>
 <input
 type="password"
 className="w-full px-4 py-2 mt-2 border rounded-lg"
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 required
 />
 </div>
 <button type="submit" className="w-full bg-indigo-600 text-white py-2 roundedlg">
 Login
 </button>
 </form>
 ) : (
 // User Details Form
 <form onSubmit={handleUserDetailsSubmit} className="space-y-4 mt-6">
 <h2 className="text-xl font-bold text-center text-gray-800">Enter Your
Details</h2>
 <div>
 <label className="block text-gray-700 font-medium">Name</label>
 <input
 type="text"
 className="w-full px-4 py-2 mt-2 border rounded-lg"
 value={name}
 onChange={(e) => setName(e.target.value)}
 required
 />
 </div>
 <div>
 <label className="block text-gray-700 font-medium">Age</label>
   <input
 type="number"
 className="w-full px-4 py-2 mt-2 border rounded-lg"
 value={age}
 onChange={(e) => setAge(e.target.value)}
 required
 />
 </div>
 <div>
 <label className="block text-gray-700 font-medium">Disability</label>
 <input
 type="text"
 className="w-full px-4 py-2 mt-2 border rounded-lg"
 value={disability}
 onChange={(e) => setDisability(e.target.value)}
 required
 />
 </div>
 <button type="submit" className="w-full bg-green-600 text-white py-2 roundedlg">
 Submit Details
 </button>
 </form>
 )}
 {message && <p className="mt-4 text-center text-red-600">{message}</p>}
 </div>
 </div>
 );
};
export default Login;
