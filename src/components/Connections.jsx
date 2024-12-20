
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addConnections } from "../utils/connectionSlice";
import { MessageCircle, UserPlus2, Code2 } from 'lucide-react';

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/api/v1/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      // Handle Error Case
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (connections.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-gray-400 px-4">
        <UserPlus2 className="w-16 h-16 mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">No Connections Yet</h1>
        <p className="text-center max-w-md">
          Start matching with other developers to build your network. Your connections will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <Code2 className="w-8 h-8 text-pink-500" />
            Your Connections
          </h1>
          <p className="text-gray-400">
            {connections.length} {connections.length === 1 ? 'Connection' : 'Connections'}
          </p>
        </div>

        <div className="grid gap-6">
          {connections.map((connection) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about, skills = [] } = connection;

            return (
              <div
                key={_id}
                className="bg-gray-800 rounded-xl p-6 flex flex-col md:flex-row gap-6 transform transition-all hover:scale-[1.01]"
              >
                <div className="flex-shrink-0">
                  <img
                    alt={`${firstName} ${lastName}`}
                    className="w-24 h-24 rounded-xl object-cover"
                    src={photoUrl}
                  />
                </div>

                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-3">
                    <div>
                      <h2 className="text-xl font-bold text-white">
                        {firstName} {lastName}
                      </h2>
                      {(age || gender) && (
                        <p className="text-gray-400 text-sm">
                          {[age && `${age} years`, gender].filter(Boolean).join(' • ')}
                        </p>
                      )}
                    </div>
                    <button className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-500 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      Message
                    </button>
                  </div>

                  {about && (
                    <p className="text-gray-300 mb-4 line-clamp-2">{about}</p>
                  )}

                  {skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Connections;