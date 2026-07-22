import { useEffect, useState } from "react";
import type { ISearchResult } from "../CurrentWeather";

interface ICurrentWeather {
    temperature_2m: number;
    wind_speed_10m: number;
    relative_humidity: number;
    weather_code: number;
}

export const CityWeather = ({ item }: { item: ISearchResult }) => {
    const [currentWeather, setCurrentWeather] = useState<ICurrentWeather | null>(null);

    useEffect(() => {
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${item.latitude}&longitude=${item.longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`)
            .then(response => response.json())
            .then(data => setCurrentWeather(data.current)
            )
    }, [item])

    console.log(currentWeather, 'CURRENT WEATHER')

    return (
        <div>
            <h3>Weather in {item.name}</h3>
            <p>Temperature: {currentWeather?.temperature_2m}</p>
            <p>Wind speed: {currentWeather?.wind_speed_10m}</p>
            <br />
        </div>
    )
}