import { Code, Users, LogOut , UserRoundPlus, CircleUserRound} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from React Router
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const [isDropdownOpen, setDropdownOpen] = useState(false); 
  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };
  const handleLogout = async()=>{
    try{
      await axios.post(`${BASE_URL}/api/v1/auth/logout`, {}, {withCredentials: true});
      dispatch(removeUser());
      navigate('/signup-login');

    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <nav className="bg-gray-900 text-white px-4 py-3 flex justify-between items-center">
      {/* Left Section */}
      <div className="flex items-center space-x-2">
        <Code size={24} className="text-emerald-400" />
        <Link to={'/feed'} className="text-xl font-semibold text-emerald-400">
          ConnectDev 👨‍💻
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {user && <p className="text-sm">Welcome {user.firstName}</p>}

        {user && (
          <div className="relative">
            {/* User Avatar */}
            <button
              onClick={toggleDropdown}
              className="flex items-center justify-center w-10 h-10 rounded-full ring-2 ring-emerald-400 ring-offset-2 ring-offset-gray-900 overflow-hidden focus:outline-none"
            >
              <img
                alt="User Profile"
                src={user.photoUrl}
                className="object-cover w-full h-full"
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <ul className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg z-10">
                <li>
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100"
                  >
                    <Users size={16} />
                    <span>Profile</span>
                  </Link>
                </li>
                <li>
                  <Link to={'/connections'}
                    className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100"
                  >
                    <CircleUserRound size={16} />
                    <span>Connections</span>
                  </Link>
                </li>
                <li>
                  <Link to={'/requests'}
                    className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100"
                  >
                    <UserRoundPlus size={16} />
                    <span>Pending Requests</span>
                  </Link>
                </li>
                <li>
                  <a onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </a>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
