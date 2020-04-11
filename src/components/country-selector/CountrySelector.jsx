import React, {useState, useEffect} from 'react';
import {NativeSelect, FormControl} from '@material-ui/core';
import style from './CountrySelector.module.css';
import {getCountryList} from '../../api';

const CountrySelectors = ({ handleCountryChange }) => {
  const [fetchedCountries, setFetchedCountries] = useState([]);

  useEffect(() => {
    (async function fetchCountries() {
      const fetchedCountries = await getCountryList();
      setFetchedCountries(fetchedCountries);
    })();
  }, [setFetchedCountries]);


  return (
    <div className={style.container}>
      <FormControl className={style.formControl}>
        <NativeSelect default="" onChange={(e)=> handleCountryChange(e.target.value)}>
          <option value="">World Update</option> 
          {fetchedCountries.map((country, i) =>
            <option key={i} value={country}>{country}</option>)
          }
        </NativeSelect>
      </FormControl>
    </div>
  );
}

export default CountrySelectors;
