import { Code, Users, Settings, LogOut } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const [isDropdownOpen, setDropdownOpen] = useState(false); // State to toggle dropdown

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  return (
    <nav className="bg-gray-900 text-white px-4 py-3 flex justify-between items-center">
      {/* Left Section */}
      <div className="flex items-center space-x-2">
        <Code size={24} className="text-emerald-400" />
        <span className="text-xl font-semibold text-emerald-400">
          ConnectDev 👨‍💻
        </span>
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
                  <a
                    href="#"
                    className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100"
                  >
                    <Users size={16} />
                    <span>Profile</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100"
                  >
                    <Settings size={16} />
                    <span>Settings</span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
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
