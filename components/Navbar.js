import React from 'react';
import axios from 'axios';

async function handleSignOut() {
    try {
        await axios.post('/api/signout');
        alert('Logged out successfully!');
        // Redirect to the login page or do other post-logout actions
    } catch (error) {
        alert('Error logging out: ' + error.response?.data?.message || error.message);
        console.error('Error logging out:', error.response?.data?.message || error.message);
    }
}

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
                    <a href="/signin">
                        Sign In
                    </a>
                </li>
                <li>
                    <a href="/betting">
                        Betting
                    </a>
                </li>
                <li>
                    <button onClick={handleSignOut}>Sign Out</button>
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
