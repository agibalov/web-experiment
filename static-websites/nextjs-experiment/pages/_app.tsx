import 'bulma/css/bulma.css'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import Head from 'next/head'

function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <Head>
                <title>Next.js experiment</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div className="container">
                <nav className="navbar">
                    <div className="navbar-menu">
                        <div className="navbar-start">
                            <Link href="/">
                                <a className="navbar-item">Home</a>
                            </Link>
                            <Link href="/about">
                                <a className="navbar-item">About</a>
                            </Link>
                            <Link href={{
                                pathname: '/posts/[id]',
                                query: {id: '123'}
                            }}>
                                <a className="navbar-item">Post 123</a>
                            </Link>
                            <Link href="/this-page-definitely-does-not-exist">
                                <a className="navbar-item">404</a>
                            </Link>
                        </div>
                    </div>
                </nav>
                <div className="content">
                    <Component {...pageProps} />
                </div>
                <div>&copy; 2021</div>
            </div>
        </>
    )
}

export default MyApp
