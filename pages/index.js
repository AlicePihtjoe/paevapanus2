import React from 'react';
import Navbar from '../components/Navbar';


const HomePage = () => {
    return (
        <div>
            <Navbar />
            <h1>Welcome to Next.js!</h1>
            <h2>
                <a href="/signup">Sign Up</a>
            </h2>
        </div>
    );
};

export default HomePage;
