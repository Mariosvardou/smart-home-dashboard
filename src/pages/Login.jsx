import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setError("User not found. Please sign up first.");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password. Try again.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email format.");
      } else {
        setError("Login failed. Check your credentials.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-md shadow-sm w-full max-w-sm"
        noValidate
      >
        <h2 className="text-xl font-semibold mb-5 text-gray-900 text-center">
          Log In
        </h2>

        {error && (
          <p className="text-red-600 mb-4 text-sm text-center" role="alert">
            {error}
          </p>
        )}

        <label htmlFor="email" className="block mb-1 text-gray-700 font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 transition mb-4"
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          title="Enter your email address"
          autoFocus
        />

        <label
          htmlFor="password"
          className="block mb-1 text-gray-700 font-medium"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 transition mb-6"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          title="Enter your password"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-gray-800 text-white py-2 rounded transition hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 ${
            loading ? "cursor-not-allowed opacity-70" : ""
          }`}
          aria-busy={loading}
        >
          {loading ? "Logging in..." : "Log In"}
        </button>

        <p className="mt-4 text-center text-sm text-gray-700">
          Don't have an account?{" "}
          <Link to="/signup" className="text-gray-800 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
