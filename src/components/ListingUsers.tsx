import { User } from "../utils/fetchUsers";
import { ListingUser } from "./ListingUser";

type Props = {
  users: User[];
};

export const ListingUsers = ({ users }: Props) => {
  return (
    <ul>
      {users.map((user) => (
        <ListingUser user={user} key={user.id} />
      ))}
    </ul>
  );
};
