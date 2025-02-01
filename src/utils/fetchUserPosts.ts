import axios from "axios";
import { FETCH_USER_POSTS_LIMIT } from "../constants";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const fetchUserPosts = async ({
  userId,
  page,
}: {
  userId: string;
  page: number;
}): Promise<Post[]> => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${userId}/posts?_page=${page}&_limit=${FETCH_USER_POSTS_LIMIT}`
  );
  return response.data;
};
