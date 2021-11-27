import type { NextPage } from 'next'
import Head from 'next/head';

const NotFound: NextPage = () => {
    return (
        <>
            <Head>
                <title>Not found</title>
            </Head>
            <p>404 This is my custom not found page</p>
        </>
    )
}

export default NotFound
