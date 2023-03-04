import axios from "axios";
import { useParams } from "react-router-dom";
import { React, useRef, useEffect, useState } from "react";
import { Box, Grid, Chip, CardContent, Typography, Button } from '@mui/material';
import './styles.css';
import Chart from "./Dashboard/Chart";
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { useSelector } from "react-redux";
import {
    IconAperture, IconCopy, IconUserSearch, IconAlertCircle, IconBrandReact, IconLayoutDashboard, IconLogin, IconMoodHappy, IconTypography, IconUserPlus
} from '@tabler/icons';

const useStyles = makeStyles({
    head: {
        backgroundColor: '#f5f5f5',
    },
    cell: {
        padding: '16px 8px',
        textAlign: 'center',
    },
});

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;


const ViewButton = styled.button`
  background: linear-gradient(45deg, #4158d0, #c850c0, #ffcc70);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);

  &:hover {
    cursor: pointer;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const Box20 = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`

function Worker() {
    let { id } = useParams();
    const [showButtons, setShowButtons] = useState(false);
    const classes = useStyles();
    const [user, setUser] = useState(null);
    const [userTen, setUserTen] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [websocket, setWebsocket] = useState(null);
    const [messages, setMessages] = useState([]);
    let { worker } = useSelector((state) => { return state; });

    const handleViewClick = () => {
        setShowButtons(true);
    };

    // useEffect(() => {
    //     if (!websocket) {
    //         return;
    //     }

    //     const onMessage = (msg) => {
    //         const data = msg.data;
    //         const newData = JSON.parse(data);
    //         if (newData.id == Number(id)) {
    //             const newMessages = [...messages, newData];
    //             console.log(newMessages)
    //             setMessages(newMessages);
    //         }
    //     };

    //     websocket.onmessage = onMessage;

    //     return () => {
    //         // websocket.close();
    //     };
    // }, [websocket, messages]);

    // const start = () => {
    //     const newWebSocket = new WebSocket('ws://localhost:8081/ws/health');
    //     console.log("start");
    //     setWebsocket(newWebSocket);
    // };


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


    const maxAge = userTen.reduce((prev, curr) => prev.heartRate > curr.heartRate ? prev : curr).heartRate;
    const MaxData = userTen.filter(i => i.heartRate === maxAge);

    const sortedUserTen = [...userTen].sort((a, b) => new Date(b.recordTime) - new Date(a.recordTime));
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
                            <TableCell className={classes.cell}>동기화시간</TableCell>
                            <TableCell className={classes.cell}>심박수</TableCell>
                            <TableCell className={classes.cell}>체온</TableCell>
                            <TableCell className={classes.cell}>산호포화도</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedUserTen
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
                <Box20 />



                {showButtons ? (
                    <ButtonContainer>
                        {worker.map((a) => (
                            <Button key={a.id} href={`/healthinfo/${a.id}`} variant="outlined" startIcon={<IconUserPlus />}>
                                {a.name}
                            </Button>
                        ))}
                    </ButtonContainer>
                ) : (
                    <ViewButton onClick={handleViewClick}>다른작업자보기</ViewButton>
                )}

            </Box >
        </>

    )
}

export default Worker;