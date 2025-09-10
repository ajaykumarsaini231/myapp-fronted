import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  email: string;
  photoUrl?: string;
  bio?: string;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      navigate("/signin"); // redirect if not logged in
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin");
  };

  if (!user) return null; // avoid rendering before user loads

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      {/* Profile Card */}
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md flex flex-col items-center space-y-4">
        {/* Avatar */}
        <img
          src={
            user.photoUrl ||
            "data:image/png;base64,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"
          }
          alt="User Avatar"
          className="w-24 h-24 rounded-full border-2 border-gray-300"
        />

        {/* User Info */}
        <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-gray-500 text-center">{user.bio || "No bio available."}</p>

        {/* Buttons */}
        <div className="flex space-x-4 mt-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
