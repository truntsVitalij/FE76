import type { FC } from "react";
import { CityWeather } from "../CityWeather";

export type ISearchResult = {
    name: string;
    latitude: number;
    longitude: number;
    country: string;
    id: number;
}

interface ICurrentWeatherProps {
    list: ISearchResult[];
}

export const CurrentWeather: FC<ICurrentWeatherProps> = ({ list }) => {
    return (
        <div>
            <h3>Current Weather</h3>

            {list.map((item) => (
                <CityWeather key={item.id} item={item} />
            )
            )}
        </div>
    )
}