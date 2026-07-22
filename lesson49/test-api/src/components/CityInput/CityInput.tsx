import { useState } from "react";
import styles from "./CityInput.module.css";
import type { ISearchResult } from "../CurrentWeather";

export const CityInput = ({ onSearch }: { onSearch: (data: ISearchResult[]) => void }) => {
    const [value, setValue] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    const isButtonDisabled = value.length < 3;

    const handleClick = async () => {

        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${value}&count=10&language=ru`);
        const data = await response.json();
        onSearch(data.results.map((item: any) => ({ country: item.country, name: item.name, latitude: item.latitude, longitude: item.longitude, id: item.id })));
    }

    return (
        <div>
            <input type="text" placeholder="Enter city" className={styles.input} value={value} onChange={handleChange} />
            <button disabled={isButtonDisabled} className={styles.button} onClick={handleClick}>Get Weather</button>
        </div>
    )
}