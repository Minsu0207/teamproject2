import axios from "axios";
import { useParams } from "react-router-dom";
import { React, useRef, useEffect, useState } from "react";
import ApexCharts from 'apexcharts';
import { Box, Grid, Typography } from '@mui/material';
import '../styles.css';

function Chart({ userTen, user }) {
    const chart1Ref = useRef(null);
    const chart2Ref = useRef(null);
    const chart3Ref = useRef(null);
    const chart4Ref = useRef(null);

    const temperatureData = userTen.map(userTen => userTen.temperature);
    const o2Data = userTen.map(userTen => userTen.o2);
    const stepsData = userTen.map(userTen => userTen.steps);
    const heartRateData = userTen.map(userTen => userTen.heartRate);

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
            data: temperatureData
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

    var spark2 = Object.assign({}, spark1, {
        chart: { ...spark1.chart, id: 'spark2' }, series: [{ data: o2Data }]
    });
    var spark3 = Object.assign({}, spark1, { chart: { ...spark1.chart, id: 'spark3' }, series: [{ data: stepsData }] });
    var spark4 = Object.assign({}, spark1, { chart: { ...spark1.chart, id: 'spark4' }, series: [{ data: heartRateData }] });

    useEffect(() => {

        const renderCharts = () => {
            const chart1 = new ApexCharts(chart1Ref.current, spark1);
            const chart2 = new ApexCharts(chart2Ref.current, spark2);
            const chart3 = new ApexCharts(chart3Ref.current, spark3);
            const chart4 = new ApexCharts(chart4Ref.current, spark4);
            chart1.render();
            chart2.render();
            chart3.render();
            chart4.render();
        }
        // DOM 요소가 렌더링될 때까지 대기
        const checkRender = setInterval(() => {
            if (chart1Ref.current && chart2Ref.current && chart3Ref.current && chart4Ref.current) {
                clearInterval(checkRender);
                renderCharts();
            }
        }, 100);

        return () => {
            clearInterval(checkRender);
        };

    }, []);


    return (
        <>

            <Box className="sparkboxes">
                <Grid container spacing={4} >
                    <Grid item xs={12} md={3} >
                        <div variant="h5" className="chart-text">심박수 {user.heartRate}</div>
                        <div className='box2' ref={chart4Ref}>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={3} >
                        <div variant="h5" className="chart-text">체온 {user.temperature}</div>
                        <div className='box1' ref={chart1Ref}>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={3} >
                        <div variant="h5" className="chart-text">걸음수 {user.steps}</div>
                        <div className='box3' ref={chart3Ref}>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={3} >
                        <div variant="h5" className="chart-text">산소포화도 {user.o2}</div>
                        <div className='box4' ref={chart2Ref}>
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </>

    )
}

export default Chart;