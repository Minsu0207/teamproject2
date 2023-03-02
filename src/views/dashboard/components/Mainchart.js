import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Fab } from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';
import { useSelector } from 'react-redux';

const Mainchart = () => {
  let { user } = useSelector((state) => { return state; });
  const dblist = user.map((a) => a.age);
  // console.log(dblist)

  // chart color
  const theme = useTheme();
  const secondary = theme.palette.secondary.main;
  const secondarylight = '#f5fcff';
  const errorlight = '#fdede8';

  // chart
  const options = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 10,
      sparkline: {
        enabled: true,
      },

      group: 'sparklines',
    },
    title: { text: '위험 의심 인원', align: 'center' },
    stroke: {
      curve: 'smooth',
      width: 3,
    },
    fill: {
      colors: [secondarylight],
      type: 'solid',
      opacity: 0.2,
    },
    markers: {
      size: 0,
    },
    yaxis: { min: 0, max: 60 },

    // xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Mar', 'Mar', 'Mar', 'Mar', 'Mar', 'Mar', 'Mar'] },
    // tooltip: {
    //   x: {
    //     format: 'dd/MM/yy HH:mm'
    //   },
    // },
  };

  const series = [
    {
      name: '위험 근로자수',
      color: secondary,
      data: user.map((a) => a.age),
    },
  ];

  return (
    <DashboardCard
      title="사용자 추이"
      footer={<Chart options={options} series={series} type="area" height="170px" />}
    ></DashboardCard>
  );
};

export default Mainchart;
