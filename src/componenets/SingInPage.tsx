import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

interface User {
  name:string;
  email: string;
  photoUrl?: string;
}

const SignInPage: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/signin",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.success) {
        // Store JWT token
        localStorage.setItem("token", res.data.token);

        // Store user info
        const loggedInUser: User = {
          name: res.data.user.name,
          email: res.data.user.email,
          photoUrl: res.data.user.photoUrl || "/default-avatar.png",
        };
        localStorage.setItem("user", JSON.stringify(loggedInUser));

        navigate("/"); // redirect to HomePage
      } else {
        setErrorMsg(res.data.message || "Login failed");
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || "Login request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 p-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md transform transition-all hover:scale-105">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          Login
        </h2>

        {errorMsg && (
          <div className="mb-4 text-red-600 text-sm font-medium text-center animate-pulse">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-semibold rounded-xl text-white transition-transform transform ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-green-400 to-blue-500 hover:scale-105 hover:from-green-500 hover:to-blue-600"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-green-500 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
