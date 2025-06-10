import posts from "$lib/posts.json";

export const load = ({ params }) => {
    return {
        post: posts.at(Number(params.index)),
        index: Number(params.index),
        length: posts.length
    }
};