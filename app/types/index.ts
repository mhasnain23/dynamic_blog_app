export type Post = {
    id: string;
    title: string;
    content: string;
    date: string;
    image: string;
}

export type Comment = {
    id: string;
    text: string;
    author: string;
    createdAt: string;
}