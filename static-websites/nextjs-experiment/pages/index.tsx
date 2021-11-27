import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { getAllPosts, Post } from '../data/posts';
import { GetStaticProps } from 'next';
import Link from 'next/link';

interface HomeProps {
    posts: Post[]
}

const Home: NextPage<HomeProps> = (props) => {
    return (
        <>
            <h1>Posts</h1>
            <p>Some <span className={styles.redAndBold}>text</span></p>
            <ul>
                {props.posts.map(p => (
                    <li key={p.id}>
                        <Link href={{
                            pathname: '/posts/[id]',
                            query: {id: p.id}
                        }}>
                            <a>{p.title}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

export const getStaticProps: GetStaticProps<HomeProps> = ({params}) => {
    return {
        props: {
            posts: getAllPosts()
        }
    }
};

export default Home
