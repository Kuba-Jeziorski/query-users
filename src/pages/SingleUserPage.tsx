import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useRedirectBack } from "../utils/useRedirectBack";
import { usePageTitle } from "../utils/usePageTitle";
import { fetchUserPosts } from "../utils/fetchUserPosts";
import { FETCH_USER_POSTS_LIMIT, observerOptions } from "../constants";

export const SingleUserPage = () => {
  const { userId } = useParams();
  const observerElement = useRef<HTMLDivElement | null>(null);
  usePageTitle(`User ${userId}`);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["userPosts", userId],
    enabled: userId !== undefined && !Number.isNaN(userId),
    queryFn: ({ pageParam }) => {
      return fetchUserPosts({ userId: userId!, page: pageParam });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length === FETCH_USER_POSTS_LIMIT
        ? pages.length + 1
        : undefined;
    },
  });

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, observerOptions);

    const currentElement = observerElement.current;

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [handleObserver]);

  const handleRedirectBack = useRedirectBack();

  if (isLoading) {
    return <p className="pending">Loading posts...</p>;
  }

  if (isError) {
    return <p className="pending">Error fetching posts...</p>;
  }

  return (
    <div className="wrapper">
      <div className="buttonWrapper">
        <button className="primary brightness" onClick={handleRedirectBack}>
          BACK
        </button>
      </div>
      <h1>User {userId} Posts</h1>
      {data?.pages.map((page, pageIndex) => (
        <div className="postWrapper" key={pageIndex}>
          {page.map((post, postIndex) => (
            <div className="post" key={post.id}>
              <h2>
                {pageIndex}.{postIndex} - {post.title}
              </h2>
              <p>{post.body}</p>
            </div>
          ))}
        </div>
      ))}
      <div className="observerBlock" ref={observerElement}>
        {isFetchingNextPage ? (
          <p>Loading more...</p>
        ) : hasNextPage ? (
          <p>Scroll down to load more</p>
        ) : (
          <p>No more posts</p>
        )}
      </div>
    </div>
  );
};
