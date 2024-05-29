import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import { IoMenuSharp } from "react-icons/io5";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const [menu, setMenu] = useState("home");
  const navbarRef = useRef();
  const toggleRef = useRef();

  const handleToggle = () => {
    setIsActive(prevState => !prevState);
  };

  const closeMenu = () => {
    setIsActive(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target) && !toggleRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <section className='navbar__section'>
      <header className='header flex'>
        <div ref={toggleRef} className='navbar__toggle' onClick={handleToggle}>
          <IoMenuSharp />
        </div>

        <div className='logoDiv'>
          <div onClick={() => { setMenu("home"); closeMenu(); }} className="logo flex">
            <Link to='/'><h1 className="logo-text">Events</h1></Link>
          </div>
        </div>

        <div ref={navbarRef} className={`navbar ${isActive ? 'active' : ''}`}>
          <ul className='navbar__list flex'>
            <li onClick={() => { setMenu("home"); closeMenu(); }} className={`navbar__item ${menu === "home" ? 'active' : ''}`}>
              <Link to='/'><span className="navbar__itemLink">Αρχική</span></Link>
            </li>
            <li onClick={() => { setMenu("favorites"); closeMenu(); }} className={`navbar__item ${menu === "favorites" ? 'active' : ''}`}>
              <Link to='/favorites'><span className="navbar__itemLink">Αγαπημένα</span></Link>
            </li>
            <li onClick={() => { setMenu("news"); closeMenu(); }} className={`navbar__item ${menu === "news" ? 'active' : ''}`}>
              <Link to='/news'><span className="navbar__itemLink">Νέα</span></Link>
            </li>
          </ul>
        </div>
      </header>
    </section>
  );
};

export default Navbar;
