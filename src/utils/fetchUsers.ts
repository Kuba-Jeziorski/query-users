import axios from "axios";
import { FETCH_USERS_LIMIT } from "../constants";

export type User = {
  id: number;
  username: string;
  name: string;
  website: string;
};

export const fetchUsers = async (
  page = 0
): Promise<{
  users: User[];
  totalCount: number;
  hasMore: boolean;
}> => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users?_page=${
      page + 1
    }&_limit=${FETCH_USERS_LIMIT}`
  );
  return {
    users: response.data,
    totalCount: response.headers["x-total-count"],
    hasMore: response.data.length === FETCH_USERS_LIMIT,
  };
};
