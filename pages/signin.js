// THIS WORKS BELOW

import React from 'react';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';
import SigninForm from '../components/SigninForm';

const SigninPage = () => {
    const router = useRouter();

    const handleGoogleSignIn = () => {
        const googleResponse = window.location.href =
            'https://accounts.google.com/o/oauth2/v2/auth' +
            '?client_id=946650179071-j4vaq85486sa8m9djjf41ef39biflq3j.apps.googleusercontent.com' +
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