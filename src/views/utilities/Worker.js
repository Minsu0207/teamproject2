import axios from "axios";
import { useParams } from "react-router-dom";
import { React, useRef, useEffect, useState } from "react";
import { Box, Grid, Chip, CardContent, Typography } from '@mui/material';
import './styles.css';
import Chart from "./Chart";
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    head: {
        backgroundColor: '#f5f5f5',
    },
    cell: {
        padding: '16px 8px',
        textAlign: 'center',
    },
});

function Worker() {
    let { id } = useParams();
    const [user, setUser] = useState(null);
    const [userTen, setUserTen] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [websocket, setWebsocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const classes = useStyles();
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

    console.log(user);
    console.log(userTen);

    const maxAge = userTen.reduce((prev, curr) => prev.heartRate > curr.heartRate ? prev : curr).heartRate;
    const MaxData = userTen.filter(i => i.heartRate === maxAge);

    return (
        <>
            <Box>
                <Grid container spacing={1}>
                    <Grid item xs={12} lg={6}>
                        <Typography variant="h1">
                            {user.name}님의 상세 페이지
                        </Typography>
                    </Grid>
                    <Grid item xs={12} lg={3}>
                        <Typography>
                            <Chip color={user.temperature <= 35.0 ? 'warning' :
                                user.temperature >= 37.3 ? 'error' : 'success'}
                                label={user.temperature <= 35.0 ? '저체온' :
                                    user.temperature >= 37.3 ? '고열' : '정상체온'}
                                sx={{
                                    px: '15px',
                                    color: 'white',
                                }} />
                            <CardContent>
                                <Typography variant="h3">{user.temperature}℃
                                </Typography>
                            </CardContent>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} lg={3}>
                        <Typography>
                            <CardContent>
                                <Typography variant="h4" component="span">{`현재 심박수 ${user.heartRate}`}
                                    <Typography variant="h6" component="span"> bpm</Typography></Typography><br />
                                <Typography variant="h4" component="span">{`최고 심박수 ${MaxData[0].heartRate}`}
                                    <Typography variant="h6" component="span"> bpm</Typography></Typography>
                            </CardContent>
                        </Typography>
                    </Grid>
                </Grid>

                {
                    messages.length > 0 && (
                        <Typography variant="h2">
                            심박수{messages[messages.length - 1].heartRate}동기화 시간{messages[messages.length - 1].recordTime}
                        </Typography>

                    )
                }
                <Chart userTen={userTen} user={user} />

                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.head}>동기화 시간</TableCell>
                            <TableCell className={classes.head}>심박수</TableCell>
                            <TableCell className={classes.head}>체온</TableCell>
                            <TableCell className={classes.head}>산호포화도</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userTen
                            .sort((a, b) => new Date(b.recordTime) - new Date(a.recordTime))
                            .slice(0, 3)
                            .map((a, index) => (
                                <TableRow key={index}>
                                    <TableCell className={classes.cell}>{a.recordTime}</TableCell>
                                    <TableCell className={classes.cell}>{a.heartRate}</TableCell>
                                    <TableCell className={classes.cell}>{a.temperature}</TableCell>
                                    <TableCell className={classes.cell}>{a.o2}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>

            </Box >
        </>

    )
}

export default Worker;