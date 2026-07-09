import { useDispatch } from "react-redux";
import { Button } from "../../shared/ui/button"
import { decrement, increment, incrementByValue } from "../../store/actions/counterActions";
import { useState } from "react";

export const Counter = () => {
    const [value, setValue] = useState(0);
    const dispatch = useDispatch();

    const handleIncrement = () => {
        dispatch(increment());
    }

    const handleDecrement = () => {
        dispatch(decrement());
    }

    const handleIncrementByValue = () => {
        dispatch(incrementByValue(value))
        setValue(0);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(Number(e.target.value));
    }

    return (
        <div style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
            <h1>Counter</h1>
            <input type="number" value={value} onChange={handleChange} />

            <Button onClick={handleIncrement}>Increment</Button>
            <Button onClick={handleDecrement}>Decrement</Button>
            <Button onClick={handleIncrementByValue}>Increment by {value}</Button>
        </div>
    )
}