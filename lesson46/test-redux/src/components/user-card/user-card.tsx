import type { FC } from "react"
import { useDispatch } from "react-redux";
import type { User } from "../../types/user";
import { Button } from "../../shared/ui/button";
import { increment, decrement } from "../../store/actions/usersActions";

interface IUserCardProps {
    user: User;
}

export const UserCard: FC<IUserCardProps> = ({ user }) => {
    const dispatch = useDispatch();

    const handleIncrement = () => {
        dispatch(increment(user.id));
    }
    const handleDecrement = () => {
        dispatch(decrement(user.id));
    }

    return (
        <div style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
            <p>Name: {user.name}</p>
            <p>Counter: {user.counter}</p>
            <Button onClick={handleIncrement}>Increment</Button>
            <Button onClick={handleDecrement}>Decrement</Button>
        </div>
    )
}