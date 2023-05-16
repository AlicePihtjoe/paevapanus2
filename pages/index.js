import React from 'react';
import Navbar from '../components/Navbar';
import Link from 'next/link';


const HomePage = () => {
    return (
        <div>
            <Navbar />
            <h1 className="flex items-center py-4 justify-center">Welcome to Päevapanus homepage!</h1>
            <h2 className="flex items-center py-4 justify-center">This is a betting Webpage in progress.</h2>
                <div className="flex items-center justify-center">
                    <Link href="/signup">
                        <button className="bg-indigo-600 text-white py-2 px-3 rounded hover:bg-indigo-700 cursor-pointer">
                            Sign Up
                        </button>
                    </Link>
                    <p className="px-3">OR</p>
                    <Link href="/signin">
                        <button className="bg-indigo-600 text-white py-2 px-3 rounded hover:bg-indigo-700 cursor-pointer">
                            Sign In
                        </button>
                    </Link>
                </div>
        </div>
    );
};

export default HomePage;
