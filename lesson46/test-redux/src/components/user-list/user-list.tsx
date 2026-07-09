import type { FC } from "react"
import type { User } from "../../types/user"
import { UserCard } from "../user-card"

interface IUserListProps {
    list: User[];
}
export const UserList: FC<IUserListProps> = ({ list }) => {
    return (
        <div style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
            <h3>User List</h3>
            <div>
                {list.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </div>
    )
}