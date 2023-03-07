import { React, useRef, useEffect, useState } from "react";
import ApexCharts from 'apexcharts';
import { Box, Grid, Typography } from '@mui/material';
import '../styles.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function Chart({ userTen, users, newMessages }) {

    const chart1Ref = useRef(null);
    const chart2Ref = useRef(null);
    const chart3Ref = useRef(null);
    const chart4Ref = useRef(null);
    const chart5Ref = useRef(null);

    const [userTen1, setUserTen1] = useState([]);

    useEffect(() => {
        if (newMessages.length > 0) {
            const newTen = [...userTen, newMessages[0]];
            setUserTen1(newTen.slice(-10));
        }
    }, [userTen1]);

    console.log(userTen)
    console.log(userTen1)

    const temperatureData = userTen.map(a => a.temperature);
    const o2Data = userTen.map(a => a.o2);
    const stepsData = userTen.map(a => a.steps);
    const heartRateData = userTen.map(a => a.heartRate);
    const lineDate = [
        {
            name: "Heart Rate",
            data: userTen.map(user => user.heartRate)
        },
        {
            name: "O2",
            data: userTen.map(user => user.o2)
        },
        {
            name: "Temperature",
            data: userTen.map(user => user.temperature)
        }
    ];

    window.Apex = {
        chart: {
            fontFamily: 'Titillium Web,IBM Plex Sans,Nanum Gothic,Montserrat,Noto Sans Korean',
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
            fontFamily: 'Titillium Web,IBM Plex Sans,Montserrat,Nanum Gothic,Noto Sans Korean',
            id: 'spark1',
            group: 'sparks',
            type: 'line',
            height: 95,
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

    var linechart = {
        chart: {
            height: 378,
            type: 'line',
            zoom: {
                enabled: false
            },
            dropShadow: {
                enabled: true,
                top: 3,
                left: 2,
                blur: 4,
                opacity: 1,
            }
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        //colors: ["#3F51B5", '#2196F3'],
        title: {
            text: 'Vital sign',
            size: 40,
            align: 'left',
            offsetY: 25,
            offsetX: 20
        },
        markers: {
            size: 6,
            strokeWidth: 0,
            hover: {
                size: 9
            }
        },
        grid: {
            show: true,
            padding: {
                bottom: 0
            }
        },

        labels: userTen.map(user => user.recordTime),
        xaxis: {

            tooltip: {
                enabled: false
            }
        },
        legend: {
            showForSingleSeries: true,
            position: 'top',
            horizontalAlign: 'right',
            offsetY: 0
        }
    }

    var spark2 = Object.assign({}, spark1, {
        chart: { ...spark1.chart, id: 'spark2' }, series: [{ data: o2Data }]
    });
    var spark3 = Object.assign({}, spark1, { chart: { ...spark1.chart, id: 'spark3' }, series: [{ data: stepsData }] });
    var spark4 = Object.assign({}, spark1, { chart: { ...spark1.chart, id: 'spark4' }, series: [{ data: heartRateData }] });

    var line1 = Object.assign({}, linechart, { chart: { ...linechart.chart, id: 'spline1ark4' }, series: lineDate });


    useEffect(() => {

        const renderCharts = () => {
            const chart4 = new ApexCharts(chart1Ref.current, spark4);
            const chart1 = new ApexCharts(chart2Ref.current, spark1);
            const chart2 = new ApexCharts(chart3Ref.current, spark2);
            const chart3 = new ApexCharts(chart4Ref.current, spark3);
            const chartLine = new ApexCharts(chart5Ref.current, line1);
            chart1.render();
            chart2.render();
            chart3.render();
            chart4.render();
            chartLine.render();
        }
        // DOM 요소가 렌더링될 때까지 대기
        const checkRender = setInterval(() => {
            if (chart1Ref.current && chart2Ref.current && chart3Ref.current && chart4Ref.current && chart5Ref.current) {
                clearInterval(checkRender);
                renderCharts();
            }
        }, 100);

        return () => {
            clearInterval(checkRender);
        };

    }, []);

    const theme = createTheme({
        typography: {
            fontFamily:
                'IBM Plex Sans,Titillium Web,Nanum Gothic,Montserrat,Noto Sans Korean'
        },
    })

    return (
        <>
            <ThemeProvider theme={theme}>
                <Box className="sparkboxes">
                    <Grid container spacing={4} >
                        <Grid item xs={12} md={3} >
                            <div variant="h5" className="chart-text">
                                심박수 {newMessages.length === 0
                                    ? `${users.heartRate}`
                                    : `${newMessages[0]?.heartRate}`}</div>
                            <div className='box1' ref={chart1Ref}>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={3} >
                            <div variant="h5" className="chart-text">
                                체온{newMessages.length === 0
                                    ? `${users.temperature}`
                                    : `${newMessages[0]?.temperature}`}</div>
                            <div className='box2' ref={chart2Ref}>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={3} >
                            <div variant="h5" className="chart-text">
                                산소포화도{newMessages.length === 0
                                    ? `${users.o2}`
                                    : `${newMessages[0]?.o2}`}</div>
                            <div className='box4' ref={chart3Ref}>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={3} >
                            <div variant="h5" className="chart-text">
                                걸음수{newMessages.length === 0
                                    ? `${users.steps}`
                                    : `${newMessages[0]?.steps}`}</div>
                            <div className='box3' ref={chart4Ref}>
                            </div>
                        </Grid>

                    </Grid>
                    <Grid item xs={12} md={12} >
                        <div className='box5' ref={chart5Ref}></div>
                    </Grid>
                </Box>
            </ThemeProvider>
        </>

    )
}

export default Chart;