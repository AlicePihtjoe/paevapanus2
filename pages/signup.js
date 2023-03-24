import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SignupForm from '../components/SignupForm';


const SignupPage = () => {
    return (
        <div className="min-h-screen bg-gray-100 block items-center">
            <Navbar />
            <div>
                <SignupForm />
            </div>
        </div>
    );
};

export default SignupPage;
