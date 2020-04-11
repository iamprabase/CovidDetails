import React, { useState, useEffect } from 'react';
import { getDailyData } from '../../api';
import styles from './Charts.module.css';
import {Line, Bar} from 'react-chartjs-2';

const Charts = ({ data: {recovered, confirmed, deaths}, country}) => {
  const [fetchedDailyData, setFetchedDailyData] = useState([]);

  useEffect(() => {
    (async function fetchDailyData() {
      const fetchedDailyData = await getDailyData();
      setFetchedDailyData(fetchedDailyData);
    })();
  }, []);

  const lineChart = (
    fetchedDailyData.length? (<Line 
      data={{
        labels: fetchedDailyData.map(({ reportDate }) => reportDate ),
        datasets: [{
          data: fetchedDailyData.map(({ confirmed }) => confirmed.total),
          label: "Infected",
          borderColor: '#3333ff'          
        }, {
          data: fetchedDailyData.map(({ deaths }) => deaths.total),
          label: "Deaths",
          borderColor: 'rgba(255,0,0,0.8)'
        }, {
            data: fetchedDailyData.map(({ recovered }) => recovered.total),
          label: "Recovered",
          borderColor: 'rgba(255,0,0,0.8)'
        }],
      }} 
    />): null
  )

  const barChart = (
    (confirmed)?(<Bar
      data={{
        labels: ['Cured', 'Infected', 'Deaths'],
        datasets: [{
          label: 'People',
          backgroundColor: [
            'rgba(0, 255, 0, 0.9)',
            'rgba(0, 0, 200, 0.9)',
            'rgba(255, 0, 0, 0.9)',
          ],
          data: [recovered.value, confirmed.value, deaths.value]
        }]
      }}
      options={{
        legend: {display: false},
        title: {display: true, text: `Data For ${country}`},
        
        }}
    />):null
  )

  return (
    <div className={styles.container}>
      {country ? barChart : lineChart  }
    </div>
  );
}

export default Charts;
