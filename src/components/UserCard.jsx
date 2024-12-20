import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { Heart, X, Github, Linkedin, Code2 } from 'lucide-react';

const UserCard = ({ user }) => {
  const { 
    _id, 
    firstName, 
    lastName, 
    photoUrl, 
    about, 
    github, 
    linkedin,
    skills 
  } = user;
  
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/api/v1/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {

      console.error(err);
    }
  };

  return (
    <div className="w-96 bg-gray-800 rounded-xl overflow-hidden shadow-xl transform transition-all hover:scale-[1.01]">
      <div className="relative h-96">
        <img
          src={photoUrl}
          alt={`${firstName} ${lastName}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 p-6">
          <h2 className="text-2xl font-bold text-white">
            {firstName} {lastName}
          </h2>
          <div className="flex gap-3 mt-2">
            {github && (
              <a 
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {linkedin && (
              <a 
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-gray-300 font-semibold flex items-center gap-2 mb-2">
            <Code2 className="w-4 h-4" />
            Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills && skills.length > 0 ? (
              skills.map((skill, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-gray-400 text-sm">No skills listed</span>
            )}
          </div>
        </div>

        <p className="text-gray-300 mb-6">
          {about || "No description provided"}
        </p>
        
        {_id && (
          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleSendRequest('ignored', _id)}
              className="p-4 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
              aria-label="Ignore"
            >
              <X className="w-6 h-6 text-gray-300" />
            </button>
            <button
              onClick={() => handleSendRequest('interested', _id)}
              className="p-4 bg-pink-600 rounded-full hover:bg-pink-500 transition-colors"
              aria-label="Interested"
            >
              <Heart className="w-6 h-6 text-white" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;