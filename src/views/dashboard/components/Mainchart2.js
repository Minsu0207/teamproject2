import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Fab } from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';
import { useSelector } from 'react-redux';


const Mainchart2 = () => {

  let { db } = useSelector((state) => { return state })
  const dblist = db.map((a) => a.age)
  // console.log(dblist)

  // chart color
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;
  const secondarylight = '#f5fcff';
  const errorlight = '#fdede8';

  // chart
  const options = {
    chart: {
      width: 30,
      type: 'donut',
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270
      }
    },
    dataLabels: {
      enabled: false
    },
    fill: {
      type: 'gradient',
    },
    labels: ['투입인원', '위험인원', '오프라인'],
    legend: {
      formatter: function (val, opts) {
        return val + " - " + opts.w.globals.series[opts.seriesIndex]
      }
    },
    title: {
      // text: 'Gradient Donut with custom Start-angle'
    },
    responsive: [{
      breakpoint: 40,
      options: {
        chart: {
          width: 20
        },
        legend: {
          position: 'top'
        }
      }
    }]
  }





  const series = [
    70, 6, 3
  ];


  return (
    <DashboardCard
      title="사용자 추이"
      footer={
        <Chart options={options} series={series} type="donut" width={380} />
      }
    >
    </DashboardCard>
  );
};

export default Mainchart2;
