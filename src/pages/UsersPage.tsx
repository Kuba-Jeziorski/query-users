import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchUsers } from "../utils/fetchUsers";
import { usePageTitle } from "../utils/usePageTitle";
import { useRedirectHome } from "../utils/useRedirectHome";
import {
  FETCH_ERROR_LABEL,
  FETCH_RETRY_TRIES,
  FETCH_USERS_LIMIT,
  HOME_LABEL,
  LOADING_LABEL,
  PAGE_TITLE,
} from "../constants";
import { PaginationUsers } from "../components/PaginationUsers";
import { ListingUsers } from "../components/ListingUsers";

export const UsersPage = () => {
  let { pageid: pageParam } = useParams();
  const initialPage = parseInt(pageParam || "1");
  const handleRedirectHome = useRedirectHome();

  const zeroBasedPage = initialPage - 1;

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["users", zeroBasedPage],
    queryFn: () => fetchUsers(zeroBasedPage),
    placeholderData: keepPreviousData,
    retry: FETCH_RETRY_TRIES,
  });

  const totalPages = data?.totalCount
    ? Math.ceil(data.totalCount / FETCH_USERS_LIMIT)
    : 1;

  usePageTitle(`${HOME_LABEL} - page ${pageParam}`);

  if (isLoading) {
    return <p className="pending">{LOADING_LABEL}</p>;
  }

  if (isError) {
    return (
      <p className="pending">
        {FETCH_ERROR_LABEL}
        {error.message}
      </p>
    );
  }

  if (initialPage > totalPages) {
    handleRedirectHome();
  }

  return (
    <div className="wrapper">
      <h1>{PAGE_TITLE}</h1>
      {data?.users && <ListingUsers users={data.users} />}
      <PaginationUsers totalPages={totalPages} page={zeroBasedPage} />
      {isFetching ? <span> {LOADING_LABEL}</span> : null}
    </div>
  );
};
