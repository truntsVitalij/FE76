import { useEffect, useState } from 'react';
import './App.css'
import { CityInput } from './components/CityInput';
import { CurrentWeather, type ISearchResult } from './components/CurrentWeather';


function App() {
  const [searchResults, setSearchResults] = useState<ISearchResult[] | null>(null);

  const handleSearch = (data: ISearchResult[]) => {
    console.log(data, 'DATA');
    setSearchResults(data);
  }

  return (
    <div>
      <h1> Weather Application</h1>

      <div>
        <CityInput onSearch={handleSearch} />

        {searchResults && <CurrentWeather list={searchResults} />}
      </div>
    </div>
  )
}

export default App
