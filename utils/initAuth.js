import { init } from "next-firebase-auth";

const initAuth = () => {
    init({
        authPageURL: "/auth/signin",
        appPageURL: "/",
        loginAPIEndpoint: "/api/signin",
        logoutAPIEndpoint: "/api/auth/signout",
        firebaseClientInitConfig: {
            apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
            authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        },
        cookies: {
            name: "ExampleApp",
            keys: [process.env.COOKIE_SECRET_CURRENT, process.env.COOKIE_SECRET_PREVIOUS],
            httpOnly: true,
            maxAge: 12 * 60 * 60 * 24 * 1000,
            overwrite: true,
            path: "/",
            sameSite: "strict",
            secure: process.env.NEXT_PUBLIC_COOKIE_SECURE === "true",
        },
    });
};

export default initAuth;
