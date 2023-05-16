import React from 'react';
import Navbar from '../components/Navbar';
import SigninForm from '../components/SigninForm';

const SigninPage = () => {
    return (
        <div className="min-h-screen bg-gray-100 block items-center">
            <Navbar />
            <div>
                <SigninForm />
            </div>
        </div>
    );
};

export default SigninPage;

