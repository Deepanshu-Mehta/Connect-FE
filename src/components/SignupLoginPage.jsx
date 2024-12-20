import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import { Loader2, Code2, Mail, Lock, User, ChevronRight } from 'lucide-react';

const SignupLoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "", 
    lastName: ""
  });
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      const endpoint = isLoginForm ? "/api/v1/auth/login" : "/api/v1/auth/signup";
      const payload = isLoginForm 
        ? { email: formData.email, password: formData.password }
        : { ...formData };
  
      const res = await axios.post(
        BASE_URL + endpoint,
        payload,
        { withCredentials: true }
      );
      
      dispatch(addUser(isLoginForm ? res.data : res.data.data));
      
      // If signing up, first redirect to login
      if (!isLoginForm) {
        setIsLoginForm(true);
        setFormData({
          ...formData,
          firstName: "",
          lastName: ""
        });
      } else {
        // If user doesn't have required profile fields, redirect to profile
        const userData = res.data;
        if (!userData.about || !userData.skills || userData.skills.length === 0) {
          navigate("/profile");
        } else {
          navigate("/feed");
        }
      }
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Code2 className="w-12 h-12 text-pink-500" />
          </div>
          <h2 className="text-3xl font-bold text-white">
            {isLoginForm ? "Welcome back" : "Join ConnectDev"}
          </h2>
          <p className="mt-2 text-gray-400">
            {isLoginForm 
              ? "Connect with your developer community" 
              : "Start connecting with other developers"}
          </p>
        </div>

        {/* Form */}
        <div className="bg-gray-800 rounded-xl p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLoginForm && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    First Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="John"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="bg-gray-700 text-white px-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="Doe"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-gray-700 text-white pl-10 pr-4 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 text-red-500 px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-violet-500 text-white py-2 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isLoginForm ? "Sign In" : "Create Account"}
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLoginForm((prev) => !prev)}
              className="text-pink-500 hover:text-pink-400 text-sm transition-colors"
            >
              {isLoginForm 
                ? "New to ConnectDev? Create an account" 
                : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupLoginPage;