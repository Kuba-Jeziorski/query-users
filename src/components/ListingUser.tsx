import { Link } from "react-router-dom";
import { CHECK_USER_LABEL } from "../constants";
import { User } from "../utils/fetchUsers";

type Props = {
  user: User;
};

export const ListingUser = ({ user }: Props) => {
  return (
    <Link to={`/user/${user.id}`} className="user">
      <img src="/src/assets/img/user.png" alt="user icon" loading="lazy" />
      <div className="userBox">
        <div className="userDescription">
          <p className="userHeader">{user.username}</p>
          <h2>{user.name}</h2>
          <p className="userDetails">
            🌍 <span>{user.website}</span>
          </p>
        </div>
        <div className="userRedirectBox">
          <button className="primary">{CHECK_USER_LABEL}</button>
        </div>
      </div>
    </Link>
  );
};
