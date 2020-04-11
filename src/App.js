import React, { useState, useEffect } from 'react';
import {Cards, Charts, CountrySelectors} from './components';
import styles from './App.module.css';
import {getData} from './api';

const App = () => {

  const [fetchedData, setFetchedData] = useState({});
  const [country, setCountry] = useState("");

  useEffect(() => {
    (async function fetchData() {
      const fetchedData = await getData();
      setFetchedData(fetchedData);
    })();
  }, []);

  const handleCountryChange = async (country) => {
    const fetchedData = await getData(country);
    setFetchedData(fetchedData);
    setCountry(country);
  }

  return (
    <div className={styles.mainDiv}>
      <header className={styles.appHeader}>
        <h1>Covid 19 Tracker</h1>
      </header>
      <CountrySelectors handleCountryChange={handleCountryChange} />
      <Cards data={fetchedData} />
      <Charts data={fetchedData} country={country} />
    </div>
  );
}  

export default App;
