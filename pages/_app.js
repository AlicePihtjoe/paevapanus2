import '../styles/tailwind.css';
import Head from 'next/head';

function myApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default myApp;