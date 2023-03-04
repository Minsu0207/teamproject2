import React, { useRef, useEffect } from 'react';
import ApexCharts from 'apexcharts';
import './styles.css';
import { Box, Grid } from '@mui/material';
const SamplePage1 = () => {

  const chart1Ref = useRef(null);
  const chart2Ref = useRef(null);
  const chart3Ref = useRef(null);
  const chart4Ref = useRef(null);
  window.Apex = {
    chart: {
      foreColor: '#ccc',
      toolbar: {
        show: false
      },
    },
    stroke: {
      width: 3
    },
    dataLabels: {
      enabled: false
    },
    tooltip: {
      theme: 'dark'
    },
    grid: {
      borderColor: "#535A6C",
      xaxis: {
        lines: {
          show: true
        }
      }
    }
  };

  var spark1 = {
    chart: {
      id: 'spark1',
      group: 'sparks',
      type: 'line',
      height: 80,
      sparkline: {
        enabled: true
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 2,
        opacity: 0.2,
      }
    },
    series: [{
      data: [25, 66, 41, 59, 25, 44, 12, 36, 9, 21]
    }],
    stroke: {
      curve: 'smooth'
    },
    markers: {
      size: 0
    },
    grid: {
      padding: {
        top: 20,
        bottom: 10,
        left: 110
      }
    },
    colors: ['#fff'],
    tooltip: {
      x: {
        show: false
      },
      y: {
        title: {
          formatter: function formatter(val) {
            return '';
          }
        }
      }
    }
  };

  var spark2 = Object.assign({}, spark1, { chart: { ...spark1.chart, id: 'spark2' }, series: [{ data: [47, 45, 74, 32, 56, 31, 44, 33, 45, 19] }] });
  var spark3 = Object.assign({}, spark1, { chart: { ...spark1.chart, id: 'spark3' }, series: [{ data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100] }] });
  var spark4 = Object.assign({}, spark1, { chart: { ...spark1.chart, id: 'spark4' }, series: [{ data: [38, 20, 35, 31, 46, 50, 20, 60, 30, 90] }] });

  useEffect(() => {
    const chart1 = new ApexCharts(chart1Ref.current, spark1);
    const chart2 = new ApexCharts(chart2Ref.current, spark2);
    const chart3 = new ApexCharts(chart3Ref.current, spark3);
    const chart4 = new ApexCharts(chart4Ref.current, spark4);
    chart1.render();
    chart2.render();
    chart3.render();
    chart4.render();
  }, []);

  return (
    <>
      <Box className="sparkboxes">
        <Grid container spacing={1} >
          <Grid item xs >
            <div className='box1' ref={chart1Ref}></div>
          </Grid>
          <Grid item xs>
            <div className='box2' ref={chart2Ref}></div>
          </Grid>
          <Grid item xs>
            <div className='box3' ref={chart3Ref}></div>
          </Grid>
          <Grid item xs>
            <div className='box4' ref={chart4Ref}></div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default SamplePage1;
