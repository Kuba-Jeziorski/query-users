import { useNavigate } from "react-router-dom";

type Props = {
  totalPages: number;
  page: number;
};

export const PaginationUsers = ({ totalPages, page }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="paginationWrapper">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          className="pagination"
          key={index}
          onClick={() => navigate(`/${index + 1}`)}
          disabled={index === page}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};
