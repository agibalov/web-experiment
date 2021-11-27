export interface Post {
    id: string;
    title: string;
    content: string;
}

const posts: Post[] = [
    { id: '123', title: 'hello world', content: 'hello world content' },
    { id: '234', title: 'qqq www', content: 'hewregf3g24' },
    { id: '345', title: 'www eee', content: 'f234r23r23r' }
];

export function getAllPosts(): Post[] {
    return posts;
}

export function getOnePost(id: string): Post|undefined {
    return posts.find(p => p.id === id);
}
