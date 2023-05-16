import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-gradient-to-r from-indigo-600 to-blue-500 py-4 shadow-md">
            <div className="flex justify-between container mx-auto">
                <div>
                    <ul className="flex">
                        <li className="mr-6">
                            <a href="/">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="/betting">
                                Betting
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul className="flex">
                        <li className="mr-6">
                            <a href="/signup">
                                Sign Up
                            </a>
                        </li>
                        <li>
                            <a href="/signin">
                                Sign In
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Optional: Add some basic styles for the navbar */}
            <style jsx>{`
                nav {
                    background-color: #f8f8f8;
                    padding: 1rem;
                    display: block;
                    color: aliceblue;
                }
                ul {
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
