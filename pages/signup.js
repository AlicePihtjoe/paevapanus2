import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SignupForm from '../components/SignupForm';


const SignupPage = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center">
            <Navbar />
            <div className="container mx-auto max-w-md">
                <SignupForm />
            </div>
        </div>
    );
};

export default SignupPage;
