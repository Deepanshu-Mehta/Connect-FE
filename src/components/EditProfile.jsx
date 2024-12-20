import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Github, Linkedin, Plus, X } from 'lucide-react';

const EditProfile = ({ user }) => {
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    photoUrl: user.photoUrl || "",
    about: user.about || "",
    github: user.github || "",
    linkedin: user.linkedin || "",
    skills: user.skills || []
  });
  const [newSkill, setNewSkill] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()]
      });
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const saveProfile = async () => {
  setError(""); // Clear previous errors
  try {
    const res = await axios.patch(
      `${BASE_URL}/api/v1/profile/edit`,
      formData,
      { withCredentials: true }
    );
    console.log("data :" + formData)

    console.log("API Response:", res?.data?.data); // Debug the response

    if (res?.data?.data && Object.keys(res.data.data).length > 0) {
      dispatch(addUser(res.data.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } else {
      throw new Error("Invalid response data from server");
    }
  } catch (err) {
    console.error("Error updating profile:", err);
    setError(err?.response?.data?.message || "An unexpected error occurred");
  }
};


  const inputClasses = "w-full px-4 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500 text-white";
  const labelClasses = "block text-gray-300 mb-1 font-medium";

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-8 rounded-xl shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Edit Profile</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>
              <div>
                <label className={labelClasses}>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>
            </div>

            <div>
              <label className={labelClasses}>Photo URL</label>
              <input
                type="text"
                name="photoUrl"
                value={formData.photoUrl}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <label className={labelClasses}>
                  <span className="flex items-center gap-2">
                    <Github className="w-4 h-4" /> GitHub URL
                  </span>
                </label>
                <input
                  type="text"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>
              <div className="relative">
                <label className={labelClasses}>
                  <span className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4" /> LinkedIn URL
                  </span>
                </label>
                <input
                  type="text"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  className={inputClasses}
                />
              </div>
            </div>

            <div>
              <label className={labelClasses}>About</label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                className={`${inputClasses} h-32`}
                placeholder="Tell others about yourself..."
              />
            </div>

            <div>
              <label className={labelClasses}>Skills</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className={inputClasses}
                  placeholder="Add a skill..."
                  onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                />
                <button
                  onClick={addSkill}
                  className="px-4 bg-pink-600 rounded-lg hover:bg-pink-500 transition-colors"
                >
                  <Plus className="w-5 h-5 text-white" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm flex items-center gap-1"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="hover:text-red-400"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
          
          <button
            onClick={saveProfile}
            className="mt-6 w-full bg-gradient-to-r from-pink-500 to-violet-500 py-3 rounded-lg text-white font-semibold hover:opacity-90 transition-opacity"
          >
            Save Profile
          </button>
        </div>

        <div className="flex justify-center">
          <UserCard user={formData} />
        </div>
      </div>

      {showToast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
          Profile saved successfully
        </div>
      )}
    </div>
  );
};

export default EditProfile;