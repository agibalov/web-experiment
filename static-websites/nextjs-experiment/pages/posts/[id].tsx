import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { getAllPosts, getOnePost } from '../../data/posts';
import Head from 'next/head';

interface PostProps {
    id: string;
    title: string;
    content: string;
}

const Post: NextPage<PostProps> = (post) => {
    return (
        <>
            <Head>
                <title>Post #{post.id}</title>
            </Head>
            <h1>Post #{post.id}</h1>
            <pre>
                Title: {post.title}{'\n'}
                Content: {post.content}{'\n'}
            </pre>
        </>
    );
}

interface PostParsedUrlQuery extends ParsedUrlQuery {
    id: string;
}

export const getStaticPaths: GetStaticPaths<PostParsedUrlQuery> = () => {
    const posts = getAllPosts();
    return {
        paths: posts.map(p => ({
            params: {
                id: p.id
            }
        })),
        fallback: false
    };
};

export const getStaticProps: GetStaticProps<PostProps, PostParsedUrlQuery> = ({params}) => {
    if (params === undefined) {
        // TODO: how should I indicate an error?
        throw new Error(`params is undefined`);
    }

    const post = getOnePost(params.id);
    if (post === undefined) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            id: post.id,
            title: post?.title,
            content: post?.content
        }
    };
};

export default Post
