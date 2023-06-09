import '../styles/tailwind.css';
import Head from 'next/head';
import { AuthProvider} from "../contexts/AuthContext";

function myApp({ Component, pageProps }) {
    return (
        <AuthProvider>
        <>
            <Head>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            </Head>
            <Component {...pageProps} />
        </>
        </AuthProvider>
           );
}

export default myApp;