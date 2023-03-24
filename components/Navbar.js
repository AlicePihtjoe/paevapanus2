import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-gradient-to-r from-indigo-600 to-blue-500 py-4 shadow-md">
            <ul className="container mx-auto">
                <li>
                    <a href="/">
                        Home
                    </a>
                </li>
                <li>
                    <a href="/signup">
                        Sign Up
                    </a>
                </li>
                <li>
                    <a href="/betting">
                        Betting
                    </a>
                </li>
            </ul>

            {/* Optional: Add some basic styles for the navbar */}
            <style jsx>{`
        nav {
          background-color: #f8f8f8;
          padding: 1rem;
          display: block;
          color: aliceblue;
        }
        ul {
          display: flex;
          list-style-type: none;
          margin: 0;
          padding: 0;
        }
        li {
          margin-right: 1rem;
        }
        li:hover {
          margin-right: 1rem;
          color: lightgrey;
        }
        li:last-child {
          margin-right: 0;
        }
      `}</style>
        </nav>
    );
};

export default Navbar;
