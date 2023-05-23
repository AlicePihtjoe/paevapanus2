import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';


const Navbar = () => {
    const router = useRouter();
    const [isSignedIn, setIsSignedIn] = useState(false);

    // Check if the user is signed in
    useEffect(() => {
        const checkAuthentication = async () => {
            const { data } = await axios.get('/api/authenticated');
            setIsSignedIn(data.authenticated);
        };
        // Call the function whenever the user navigates to a new page
        checkAuthentication();
    }, []);

    // Sign out the user
    const handleSignOut = async () => {
        try {
            await axios.post('/api/signout');
            setIsSignedIn(false);
            router.push('/');
        } catch (error) {
            alert('Error logging out: ' + error.response?.data?.message || error.message);
            console.error('Error logging out:', error.response?.data?.message || error.message);
        }
    };

    return (
        <nav className="bg-gradient-to-r from-indigo-600 to-blue-500 py-4 shadow-md">
            <ul className="container mx-auto">
                <div className="nav-left">
                <li>
                    <a href="/">
                        Home
                    </a>
                </li>
                <li>
                    <a href="/betting">
                        Betting
                    </a>
                </li>
                </div>
                <div className="nav-right">
                { !isSignedIn &&
                    <li>
                        <a href="/signup">
                            Sign Up
                        </a>
                    </li>
                }
                <li>
                    {isSignedIn ? (
                        <button onClick={handleSignOut}>Sign Out</button>

                    ) : (
                        <a href="/signin">Sign In </a>
                    )}
                </li>
                </div>
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
            justify-content: space-between;
        }
        .nav-left, .nav-right {
            display: flex;
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
