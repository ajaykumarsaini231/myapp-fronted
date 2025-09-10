import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

interface User {
  name: string;
  email: string;
  photoUrl?: string;
}

const HomePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [typedText, setTypedText] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);
  const navigate = useNavigate();

  // Load user info from localStorage on page load
useEffect(() => {
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    const parsedUser = JSON.parse(savedUser);
    setUser(parsedUser);
    setTypedText("");
    setShowWelcome(true);

    const fullText = `Welcome, ${parsedUser.name.split(" ")[0]}`;
    let index = 0;
    let typing = true; // typing or deleting

    const interval = setInterval(() => {
      if (typing) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
        if (index === fullText.length) {
          typing = false;
          setTimeout(() => {}, 3*1000); // wait before deleting
        }
      } else {
        setTypedText((prev) => prev.slice(0, -1)); // remove last char
        if (typedText.length === 1) {
          clearInterval(interval); // stop after fully deleted
          setShowWelcome(false);
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }
}, []);



  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/signin");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <header className="flex justify-between items-center p-6 shadow-md bg-white relative">
        <div className="text-2xl font-bold text-blue-600">MyAppLogo</div>

        {/* Dynamic Navbar */}
        <nav className="space-x-4">
          {user ? (
            <div className="flex items-center space-x-3">
              <img
                src={
                    user.photoUrl ||
                    "data:image/png;base64,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"
                }
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-gray-300"
                />


              {/* Typing Welcome */}
              {showWelcome && (
                <span className="font-medium text-gray-700 transition-opacity duration-1000 animate-fade-out">
                  {typedText}
                </span>
              )}

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/signin"
                className="px-4 py-2 text-blue-600 font-semibold rounded-lg hover:bg-blue-100 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to <span className="text-blue-600">MyApp</span>
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          A simple and secure platform to get started with authentication flow.
        </p>

        {!user && (
          <div className="space-x-4">
            <Link
              to="/signup"
              className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition"
            >
              Get Started
            </Link>
            <Link
              to="/signin"
              className="px-6 py-3 border border-gray-400 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition"
            >
              Login
            </Link>
          </div>
        )}
      </main>

      <footer className="bg-white shadow-inner py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
