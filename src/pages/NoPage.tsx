import { EMPTY_PAGE_HEADER, EMPTY_PAGE_TITLE, HOME_LABEL } from "../constants";
import { usePageTitle } from "../utils/usePageTitle";
import { useRedirectHome } from "../utils/useRedirectHome";

export const NoPage = () => {
  const handleRedirectHome = useRedirectHome();
  usePageTitle(EMPTY_PAGE_TITLE);

  return (
    <div className="wrapper">
      <div className="buttonWrapper">
        <button className="primary brightness" onClick={handleRedirectHome}>
          {HOME_LABEL}
        </button>
      </div>
      <h1>{EMPTY_PAGE_HEADER}</h1>
    </div>
  );
};
