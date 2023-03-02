import axios from "axios";
import { useParams } from "react-router-dom";
import { React, useRef, useEffect, useState } from "react";
import ApexCharts from 'apexcharts';
import { Box, Grid } from '@mui/material';
import './styles.css';

function Worker() {
    let { id } = useParams();
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const chart1Ref = useRef(null);
    const chart2Ref = useRef(null);
    const chart3Ref = useRef(null);
    const chart4Ref = useRef(null);
    const [websocket, setWebsocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const chartRef = useRef(null);

    useEffect(() => {
        if (!websocket) {
            return;
        }

        const onMessage = (msg) => {
            const data = msg.data;
            const newData = JSON.parse(data);
            if (newData.id === Number(id)) {
                const newMessages = [...messages, newData.age];
                setMessages(newMessages);
                console.log(newMessages)
                updateChart(newMessages);
            }
        };

        websocket.onmessage = onMessage;

        return () => {
            // websocket.close();
        };
    }, [websocket, messages]);

    const start = () => {
        const newWebSocket = new WebSocket('ws://localhost:8081/ws/health');
        console.log("start");
        setWebsocket(newWebSocket);
    };

    const fetchUsers = async () => {
        try {
            setError(null);
            setUsers(null);
            setLoading(true);
            const res = await axios.get(`/healthinfo/${id}`);
            setUsers(res.data);
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);



    useEffect(() => {
        if (!chartRef.current) {
            return;
        }
        const chart = new ApexCharts(chartRef.current, {
            series: [
                {
                    name: 'Series 1',
                    data: []
                }
            ],
            chart: {
                id: 'realtime',
                height: 350,
                type: 'line',
                animations: {
                    enabled: true,
                    easing: 'linear',
                    dynamicAnimation: {
                        speed: 1000
                    }
                },
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: false
                }
            },
            xaxis: {
                type: 'datetime',
                range: 60 * 1000
            },
            yaxis: {
                max: 100
            }
        });

        chart.render();

        return () => {
            chart.destroy();
        };
    }, []);

    const updateChart = (newData) => {
        const chart = chartRef.current.chart;
        const series = chart.getSeriesByName('Series 1');

        const timestamp = new Date().getTime();
        const lastValue = series.data.slice(-1)[0].y;
        const newValue = Number(newData.slice(-1)[0]);

        if (series.data.length >= 20) {
            series.addPoint([timestamp, newValue], true, true, true);
        } else {
            series.addPoint([timestamp, newValue], true, false, true);
        }

        if (series.data.length > 1) {
            const lastValue = series.data.slice(-2)[0].y;
            const diff = Math.abs(newValue - lastValue);

            if (diff > 10) {
                series.updateSeries([{ color: '#f44336' }], true);
            } else {
                series.updateSeries([{ color: '#008FFB' }], true);
            }
        }
    };

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!users) return null;




    return (
        <>
            <h1>{users.name}님의 페이지 Test</h1>
            <button type="button" onClick={start}>
                시작
            </button>
            <Box className="sparkboxes">
                <Grid container spacing={1} >
                    <Grid item xs >
                        {/* <div className='box1' ref={chart1Ref}></div> */}
                    </Grid>
                    <Grid item xs>
                        <div className="col" ref={chartRef}></div>
                    </Grid>
                    {/* <Grid item xs>
                        <div className='box2' ref={chart2Ref}></div>
                    </Grid>
                    <Grid item xs>
                        <div className='box3' ref={chart3Ref}></div>
                    </Grid>
                    <Grid item xs>
                        <div className='box4' ref={chart4Ref}></div>
                    </Grid> */}
                </Grid>
            </Box>
        </>


    )
}

export default Worker;