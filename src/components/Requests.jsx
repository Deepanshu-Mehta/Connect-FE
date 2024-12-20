import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { UserPlus2, Check, X, Code2, Github, Linkedin } from 'lucide-react';

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState({});

  const reviewRequest = async (status, requestId) => {
    setLoading(prev => ({ ...prev, [requestId]: true }));
    try {
      await axios.post(
        `${BASE_URL}/api/v1/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(requestId));
    } catch (err) {
      console.error("Error reviewing request:", err);
    } finally {
      setLoading(prev => ({ ...prev, [requestId]: false }));
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
      console.log(res.data.data)
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-gray-400 px-4">
        <UserPlus2 className="w-16 h-16 mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">No Pending Requests</h1>
        <p className="text-center max-w-md">
          When other developers want to connect with you, their requests will appear here.
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
            Connection Requests
          </h1>
          <p className="text-gray-400">
            {requests.length} {requests.length === 1 ? 'Request' : 'Requests'} Pending
          </p>
        </div>

        <div className="grid gap-6">
          {requests.map((request) => {
            // Safely access nested properties with optional chaining
            const userData = request?.senderUserId || {};
            const {
              _id,
              firstName = 'Unknown',
              lastName = '',
              photoUrl = '',
              age,
              gender,
              about,
              github,
              linkedin,
              skills = []
            } = userData;

            return (
              <div
                key={request._id}
                className="bg-gray-800 rounded-xl p-6 flex flex-col md:flex-row gap-6 transform transition-all hover:scale-[1.01]"
              >
                <div className="flex-shrink-0">
                  <img
                    alt={`${firstName} ${lastName}`}
                    className="w-24 h-24 rounded-xl object-cover"
                    src={photoUrl || '/api/placeholder/96/96'}
                  />
                </div>

                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
                    <div>
                      <h2 className="text-xl font-bold text-white mb-1">
                        {firstName} {lastName}
                      </h2>
                      {(age || gender) && (
                        <p className="text-gray-400 text-sm mb-2">
                          {[age && `${age} years`, gender].filter(Boolean).join(' • ')}
                        </p>
                      )}
                      <div className="flex gap-3 mb-3">
                        {github && (
                          <a
                            href={github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            <Github className="w-5 h-5" />
                          </a>
                        )}
                        {linkedin && (
                          <a
                            href={linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            <Linkedin className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <button
                        onClick={() => reviewRequest("rejected", request._id)}
                        disabled={loading[request._id]}
                        className="flex items-center gap-2 bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
                      >
                        <X className="w-4 h-4" />
                        Decline
                      </button>
                      <button
                        onClick={() => reviewRequest("accepted", request._id)}
                        disabled={loading[request._id]}
                        className="flex items-center gap-2 bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-500 transition-colors disabled:opacity-50"
                      >
                        <Check className="w-4 h-4" />
                        Accept
                      </button>
                    </div>
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

export default Requests;