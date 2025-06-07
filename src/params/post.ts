import posts from "$lib/posts.json";
import type { ParamMatcher } from "@sveltejs/kit";

export const match = ((param: string) => {
    return Number(param) >= 0 && Number(param) < posts.length;
}) satisfies ParamMatcher;