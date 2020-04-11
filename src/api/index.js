import axios from 'axios';

const appUrl = "https://covid19.mathdro.id/api";

export const getData = async (country) => {
  try{
    
    let dataUrl = appUrl;
    if (country) dataUrl = `${appUrl}/countries/${country}`

    const {data: {
      confirmed,
      recovered,
      deaths,
      lastUpdate      
    }} = await axios.get(dataUrl);
    return {
      confirmed,
      recovered,
      deaths,
      lastUpdate
    };

  }catch (exception){
    console.log(exception);
  }
}

export const getDailyData = async () => {
  try {
    const { data } = await axios.get(`${appUrl}/daily`);
    return data;

  } catch (exception) {
    console.log(exception);
  }
}

export const getCountryList = async () => {
  try {
    const { data: {countries} } = await axios.get(`${appUrl}/countries`);
    
    return countries.map((country)=>country.name);

  } catch (exception) {
    console.log(exception);
  }
}