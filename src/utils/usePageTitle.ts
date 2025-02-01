import { useEffect } from "react";
import { PAGE_TITLE } from "../constants";

export const usePageTitle = (currentPageTitle: string) => {
  useEffect(() => {
    document.title = `${PAGE_TITLE} | ${currentPageTitle}`;
    return () => {
      document.title = PAGE_TITLE;
    };
  }, [currentPageTitle]);
};
