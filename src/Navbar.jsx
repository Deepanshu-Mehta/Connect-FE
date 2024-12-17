import { Code, Users, Settings, LogOut } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="navbar bg-gray-900 text-white">
      <div className="flex-1">
        <div className="flex items-center space-x-2">
          <Code size={24} className="text-emerald-400" />
          <a className="btn btn-ghost text-xl text-emerald-400">DevTinder 👨‍💻</a>
        </div>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end mx-7">
          <div 
            tabIndex={0} 
            role="button" 
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full ring ring-emerald-400 ring-offset-2 ring-offset-gray-900">
              <img
                alt="User Profile"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                className="object-cover"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white text-gray-800 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
          >
            <li>
              <a className="justify-between hover:bg-gray-100">
                <div className="flex items-center space-x-2">
                  <Users size={16} />
                  <span>Profile</span>
                </div>
              </a>
            </li>
            <li>
              <a className="hover:bg-gray-100">
                <div className="flex items-center space-x-2">
                  <Settings size={16} />
                  <span>Settings</span>
                </div>
              </a>
            </li>
            <li>
              <a className="text-red-600 hover:bg-red-50">
                <div className="flex items-center space-x-2">
                  <LogOut size={16} />
                  <span>Logout</span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar