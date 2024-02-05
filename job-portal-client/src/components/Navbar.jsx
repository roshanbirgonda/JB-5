import React, { useState } from 'react';
import { Link, NavLink, Navigate, useNavigate, useParams } from 'react-router-dom';
import { FaBarsStaggered, FaXmark } from 'react-icons/fa6';

const Navbar = () => {
  // const [token, setToken] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const token = Boolean(localStorage.getItem('token'));
  const reqRole = localStorage.getItem('role');
  const role = reqRole==='seeker'?true:false
  console.log(role);
  const navigate = useNavigate();


  const navItems = [
    { path: '/', title: 'Home' },
    { path: '/my-job', title: 'My Jobs' },
    { path: '/About', title: 'About Us' },
    { path: '/post-job', title: 'Post a Job' },
  ];

  const navItems2 = [
    { path: '/', title: 'Home' },
    { path: '/applied-jobs', title: 'Applied Jobs' },
    { path: '/About', title: 'About Us' },
    { path: '/post-res', title: 'Profile' },
  ]

    const handleLogout = () => {
      localStorage.removeItem("token");
      // window.location.reload();
      navigate("/login");
    };

  return (
    <header className="max-w-screen-2xl sticky container mx-auto xl:px-24 px-4 bg-gray-200">
      <nav className="flex justify-between items-center py-6">
        <a href="/" className="flex items-center gap-2 text-2xl text-black">
          <span>JobFusion</span>
        </a>
        {/* nav items for large display */}
        {!role ? (<ul className="hidden md:flex gap-12">
          {navItems.map(({ path, title }) => (
            <li key={path} className="text-base text-primary hover:underline">
              {token?(<NavLink to={path} className={({ isActive }) => (isActive ? 'active' : '')}>
                {title}
              </NavLink>):""}
            </li>
          ))}
        </ul>) : (<ul className="hidden md:flex gap-12">
          {navItems2.map(({ path, title }) => (
            <li key={path} className="text-base text-primary hover:underline">
              {token ?(<NavLink to={path} className={({ isActive }) => (isActive ? 'active' : '')}>
                {title}
              </NavLink>) : ""}
            </li>
          ))}
        </ul>)}

        <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
        {token ? (
            <Link to="/login" onClick={handleLogout}  className="py-2 px-5 border rounded bg-white hover:bg-red-500 hover:text-white">
              Logout
            </Link>
          ) : (
            <>
              <Link to="/login" className="py-2 px-5 border rounded bg-white hover:bg-gray-200">
                Login
              </Link>
              <Link to="/sign-up" className="py-2 px-5 border rounded bg-blue text-white hover:bg-cyan-500">
                SignUp
              </Link>
            </>
          )}
        </div>

        {/* for small screen */}
        <div className="md:hidden block">
          <button onClick={handleMenuToggler}>
            {isMenuOpen ? <FaXmark className="w-5 h-5 text-primary" /> : <FaBarsStaggered className="w-5 h-5 text-primary" />}
          </button>
        </div>
      </nav>
      {/* nav items for small screen */}
      <div className={`px-4 bg-black py-5 rounded-sm ${isMenuOpen ? '' : 'hidden'}`}>
        {!role ?(<ul>
          {navItems.map(({ path, title }) => (
            <li key={path} className="text-base text-white first:text-white py-1">
              {token ?(<NavLink to={path} className={({ isActive }) => (isActive ? 'active' : '')}>
                {title}
              </NavLink>) : ""}
            </li>
          ))}
          <li className="text-white py-1">
            {token ? (
              <Link to={`/login`} onClick={handleMenuToggler}>
                Logout
              </Link>
            ) : (
              <Link to="/login" onClick={handleMenuToggler}>
                Login
              </Link>
            )}
          </li>
        </ul>) : (<ul>
          {navItems2.map(({ path, title }) => (
            <li key={path} className="text-base text-white first:text-white py-1">
              {token ?(<NavLink to={path} className={({ isActive }) => (isActive ? 'active' : '')}>
                {title}
              </NavLink>) : ""}
            </li>
          ))}
          <li className="text-white py-1">
            {token ? (
              <Link to={`/login`} onClick={handleMenuToggler}>
                Logout
              </Link>
            ) : (
              <Link to="/login" onClick={handleMenuToggler}>
                Login
              </Link>
            )}
          </li>
        </ul>)}
      </div>
    </header>
  );
};

export default Navbar;
