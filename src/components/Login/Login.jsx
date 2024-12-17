import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";
import { useNavigate } from "react-router-dom";
import {BASE_URL} from "../../utils/constants"

const Login = () => {
  // State management for email, password, and API call feedback
  const [email, setEmail] = useState("deepanshu1234@gmail.com");
  const [password, setPassword] = useState("deepanshu123@!@E");
  const [loading, setLoading] = useState(false); // For showing loading indicator
  const [error, setError] = useState(""); // To display error messages
  const dispatch = useDispatch()
  const navigate = useNavigate();

  // Event handlers
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError(""); // Clear previous errors

    try {
      const res = await axios.post(`${BASE_URL}/api/v1/auth/login`, {
        email: email,
        password: password,
      }, {
        withCredentials: true
      });

      dispatch(addUser(res.data));
      navigate("/feed")
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-12 rounded-lg shadow-lg w-full max-w-lg"
      >
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Login
        </h2>

        {/* Email Input */}
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            className="w-full px-5 py-3 rounded bg-gray-700 text-white text-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-300 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
            className="w-full px-5 py-3 rounded bg-gray-700 text-white text-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 mb-4 text-center text-sm">
            {error}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-3 rounded text-lg font-semibold transition-opacity ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-pink-500 to-violet-500 hover:opacity-90"
          } text-white`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
