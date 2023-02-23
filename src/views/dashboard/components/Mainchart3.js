import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../components/shared/DashboardCard';
import { useSelector } from 'react-redux';

const Mainchart3 = () => {

  let { db } = useSelector((state) => { return state })

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
  const ageCounts = db.reduce((acc, curr) => {
    const ageGroup = Math.floor(curr.age / 10) * 10;
    acc[ageGroup] = (acc[ageGroup] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(ageCounts).map((ageGroup) => `${ageGroup}대`);
  const series = Object.values(ageCounts);


  return (
    <DashboardCard
      title="사용자 추이"
      footer={
        <Chart options={options} labels={labels} series={series} type="donut" width={380} />
      }
    >
    </DashboardCard>
  );
};

export default Mainchart3;
