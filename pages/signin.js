import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SigninForm from '../components/SigninForm';

const SigninPage = () => {

    const handleGoogleSignIn = () => {
        const googleResponse = window.location.href =
            'https://accounts.google.com/o/oauth2/v2/auth' +
            '?client_id=' + process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID +
            '&response_type=code' +
            '&scope=openid%20email%20profile' +
            '&redirect_uri=https://localhost:3000/api/exchange_code';
    };

    return (
        <div className="min-h-screen bg-gray-100 block items-center">
            <Navbar/>
            <div className="flex flex-col items-center justify-center py-8">
                <h1 className="text-3xl font-bold mb-4 py-10">Sign In</h1>
                <div>
                    <SigninForm/>
                </div>
                <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"

                    onClick={handleGoogleSignIn}
                >
                    Sign in with Google Account
                </button>
            </div>
        </div>
    );
};

export default SigninPage;