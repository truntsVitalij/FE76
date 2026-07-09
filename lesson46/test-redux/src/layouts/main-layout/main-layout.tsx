import { Counter } from "../../components/counter"

export const MainLayout = () => {

    return (
        <div style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
            <h3>Main Layout</h3>
            <Counter />
        </div>
    )
}