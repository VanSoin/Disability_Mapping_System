import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-transparent">
      <div className="p-8 rounded-2xl shadow-xl bg-white w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Profile</h2>
        <div className="space-y-4">
          <p className="text-lg text-gray-700"><strong className="text-gray-900">Name:</strong> {user.name}</p>
          <p className="text-lg text-gray-700"><strong className="text-gray-900">Age:</strong> {user.age}</p>
          <p className="text-lg text-gray-700"><strong className="text-gray-900">Disability:</strong> {user.disability}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
