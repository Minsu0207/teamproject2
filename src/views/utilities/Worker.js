import axios from "axios";
import { useParams } from "react-router-dom";
import { React, useRef, useEffect, useState } from "react";
import { Box, Grid, Chip, CardContent, Typography, Slider } from '@mui/material';
import './styles.css';
import Chart from "./Chart";
function Worker() {
    let { id } = useParams();
    const [user, setUser] = useState(null);
    const [userTen, setUserTen] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [websocket, setWebsocket] = useState(null);
    const [messages, setMessages] = useState([]);


    useEffect(() => {
        if (!websocket) {
            return;
        }

        const onMessage = (msg) => {
            const data = msg.data;
            const newData = JSON.parse(data);
            if (newData.id == Number(id)) {
                const newMessages = [...messages, newData];
                console.log(newMessages)
                setMessages(newMessages);
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


    const fetchUser = async () => {
        try {
            setError(null);
            setUser(null);
            setLoading(true);
            const response = await axios.get(`/healthinfo/${id}`);
            setUser(response.data);
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    };

    const fetchUserTen = async () => {
        try {
            setError(null);
            setUserTen(null);
            setLoading(true);
            const response = await axios.get(`/healthinfoTen/${id}`);
            setUserTen(response.data);
        } catch (e) {
            setError(e);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUser();
        fetchUserTen();
    }, []);

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    if (!user || !userTen) return null;

    return (
        <>
            <h1>{user.name}님의 상세 페이지 </h1>
            <button type="button" onClick={start}>
                시작
            </button>
            <h2>
                {messages.length > 0 && (
                    <div>
                        <p>심박수{messages[messages.length - 1].heartRate}동기화 시간{messages[messages.length - 1].recordTime}</p>
                    </div>
                )}
                <Box className="sparkboxes">
                    <Grid container spacing={1} >
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Chip color={user.temperature <= 35.0 ? 'warning' :
                            user.temperature >= 37.3 ? 'error' : 'success'}
                            label={user.temperature <= 35.0 ? '저체온' :
                                user.temperature >= 37.3 ? '고열' : '정상체온'}
                            sx={{
                                px: '15px',
                                color: 'black',
                            }} />
                        <CardContent>
                            <Typography variant="body1">{user.temperature}℃
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                            </Typography>
                        </CardContent>
                        <Box sx={{ width: 150 }}>
                            <Slider
                                color={user.temperature <= 35.0 ? 'warning' :
                                    user.temperature >= 37.3 ? 'error' : 'success'}
                                defaultValue={50 + (user.temperature - 36.5) * 30}
                                getAriaValueText={(value) => `${value}`}
                                step={10}
                                marks={[
                                    {
                                        value: 0,
                                        label: "25°C"
                                    },

                                    {
                                        value: 50,
                                        label: "36.5°C"
                                    },
                                    {
                                        value: 100,
                                        label: "40°C"
                                    }
                                ]}
                            />
                        </Box>
                    </Grid>
                </Box>
                <Chart userTen={userTen} user={user} />
            </h2>

            {user && userTen.map((a, index) => (
                <Typography variant="body1">
                    {`심박수: ${a.heartRate} `}{`체온: ${a.temperature} `}{`산호포화도: ${a.o2} `} {`동기화 시간: ${a.recordTime}`}
                </Typography>
            ))}

        </>


    )
}

export default Worker;