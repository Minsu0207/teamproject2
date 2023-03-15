import axios from "axios";
import { useParams } from "react-router-dom";
import { React, useRef, useEffect, useState } from "react";
import { Box, Grid, Chip, CardContent, Typography, Button, Card } from '@mui/material';
import './styles.css';
import Chart from "./Dashboard/Chart";
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { useSelector } from "react-redux";
import {
    IconUserSearch, IconHome
} from '@tabler/icons';
import { ThemeProvider, createTheme } from '@mui/material/styles';


function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function tick() {
            savedCallback.current();
        }

        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

const useStyles = makeStyles({
    table: {
        color: 'white',
    },
    head: {
        backgroundColor: '#f5f5f5',
    },
    cell: {
        padding: '16px 8px',
        textAlign: 'center',
        fontSize: '1.2rem'
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
    let [lastValue, setLastValue] = useState(null);
    const [users, setUsers] = useState(null);
    const [userTen, setUserTen] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [websocket, setWebsocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const lastMessage = messages[messages.length - 1];
    const newMessages = lastMessage ? [lastMessage] : [];
    let { worker } = useSelector((state) => { return state; });
    let { user } = useSelector((state) => { return state; });

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
    //             // if (newData.id != 1002) {
    //             const newMessages = [newData, ...messages.slice(0, 7)];
    //             console.log(newMessages)
    //             setMessages(newMessages);
    //         }
    //     };

    //     websocket.onmessage = onMessage;

    //     return () => {
    //         websocket.close();
    //     };
    // }, [websocket, messages]);

    // const start = () => {

    //     const newWebSocket = new WebSocket('ws://10.164.125.171:8081/ws/health');
    //     console.log("웹소켓 통신시작")
    //     setWebsocket(newWebSocket);
    // };
    // useEffect(() => {
    //     start();
    // }, [user]);



    const fetchUser = async () => {
        try {
            setError(null);
            setUsers(null);
            setLoading(true);
            const response = await axios.get(`/healthinfo/${id}`);
            setUsers(response.data);
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
    if (!users || !userTen) return null;


    const maxHeartRate = userTen.reduce((prev, curr) => prev.heartRate > curr.heartRate ? prev : curr).heartRate;
    const MaxData = userTen.filter(i => i.heartRate === maxHeartRate);

    const sortedUserTen = [...userTen].sort((a, b) => new Date(b.recordTime) - new Date(a.recordTime));

    const theme = createTheme({
        typography: {
            fontFamily:
                'Nanum Gothic,Montserrat,Noto Sans Korean,IBM Plex Sans,Titillium Web'
        },
    })



    return (
        <>
            <ThemeProvider theme={theme}>
                <Box className="sparkboxes">
                    <Grid container spacing={1}>
                        <Grid item xs={12} lg={6}>
                            <Typography variant="h4" component="div">
                                {users.name}
                                <Typography variant="h6" component="span">
                                    님의 상세 페이지
                                </Typography>
                            </Typography>
                        </Grid>

                        <Grid item xs={12} lg={3} container direction="column" alignItems="center" spacing={2}>
                            <Grid item>
                                <Chip
                                    color={
                                        (users.temperature > 37.3 || users.o2 < 90)
                                            ? 'error'
                                            : (users.o2 < 95 || users.temperature <= 35.0)
                                                ? 'warning'
                                                : 'success'
                                    }
                                    label={
                                        (users.temperature <= 35.0)
                                            ? '저체온'
                                            : (users.temperature > 37.3)
                                                ? '고열'
                                                : (users.o2 < 90)
                                                    ? '호흡곤란'
                                                    : (users.o2 < 95)
                                                        ? '저산소증'
                                                        : '정상'
                                    }
                                    sx={{
                                        px: '35px',
                                        color: 'white',
                                        fontSize: '20px',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '25px',
                                        marginTop: '0px',
                                        textAlign: 'center',
                                        width: '170px'
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <Chip
                                    label={
                                        users.status === '정상' ? '정상' :
                                            users.status === '넘어짐' ? '넘어짐' :
                                                users.status === '낙상' ? '낙상 예상' :
                                                    users.status
                                    }
                                    color={users.status === '넘어짐' ? 'warning' : users.status === '낙상' ? 'error' : 'success'}
                                    sx={{
                                        px: '35px',
                                        color: 'white',
                                        fontSize: '20px',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '25px',
                                        textAlign: 'center',
                                        width: '170px'
                                    }}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={12} lg={3}>
                            <Card sx={{
                                minWidth: 200,
                                bgcolor: 'transparent',
                                color: '#fff',
                                top: '0px',
                                right: '10px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                paddingBottom: '10px',
                            }}>
                                <Typography variant="body2">
                                    Age: {users.age}
                                </Typography>
                                <Typography variant="body2">
                                    Position: {users.position}
                                </Typography>
                                <Typography variant="body2">
                                    Contact: {users.contact}
                                </Typography>
                                <Typography variant="body2">
                                    Employed date: {users.employedDate}
                                </Typography>
                            </Card>


                        </Grid>
                    </Grid>
                    {/* <CardContent>
                        <Grid container spacing={1}>
                            <Grid item xs={12} lg={3}>
                                <Typography variant="h5" component="span">
                                    {`최고 심박수 ${MaxData[0].heartRate}`}
                                    <Typography variant="h6" component="span"> bpm</Typography></Typography>

                            </Grid>
                            <Grid item xs={12} lg={3}>
                                <Typography sx={{ textAlign: 'center', fontSize: '30px' }}>

                                    <Chip color={users.temperature <= 35.0 ? 'warning' :
                                        users.temperature >= 37.3 ? 'error' : 'success'}
                                        label={users.temperature <= 35.0 ? '저체온' :
                                            users.temperature >= 37.3 ? '고열' : '정상체온'}
                                        sx={{
                                            px: '15px',
                                            color: 'white',
                                        }} />
                                </Typography>
                            </Grid>
                            <Grid item xs={12} lg={3}>
                                <Typography sx={{ textAlign: 'center' }}>
                                    <Chip color={users.o2 >= 95 ? 'success' :
                                        users.o2 >= 90 ? 'warning' : 'error'}
                                        label={users.o2 >= 95 ? '정상' :
                                            users.o2 >= 90 ? '저산소증주의' : '호흡곤란즉시확인'}
                                        sx={{
                                            px: '15px',
                                            color: 'white',
                                        }} />
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent> */}

                    <Chart userTen={userTen} users={users} newMessages={newMessages} />

                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.cell}>
                                    <Typography sx={{ color: 'white' }}>최근 동기화시간</Typography>
                                </TableCell>
                                <TableCell className={classes.cell}>
                                    <Typography sx={{ color: 'white' }}>행동 분석</Typography>
                                </TableCell>
                                <TableCell className={classes.cell}>
                                    <Typography sx={{ color: 'white' }}>심박수 </Typography>
                                </TableCell>
                                <TableCell className={classes.cell}>
                                    <Typography sx={{ color: 'white' }}>체온 </Typography>
                                </TableCell>
                                <TableCell className={classes.cell}>
                                    <Typography sx={{ color: 'white' }}>산호포화도 </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {sortedUserTen
                                .slice(0, 1)
                                .map((a, index) => (
                                    <TableRow key={index}>
                                        <TableCell className={classes.cell}>
                                            <Typography sx={{ color: 'white' }}>{a.recordTime}</Typography>
                                        </TableCell>
                                        <TableCell className={classes.cell}>
                                            <Typography sx={{ color: 'white' }}>{a.status} 예상</Typography>
                                        </TableCell>
                                        <TableCell className={classes.cell}>
                                            <Typography sx={{ color: 'white' }}>{a.heartRate}</Typography>
                                        </TableCell>
                                        <TableCell className={classes.cell}>
                                            <Typography sx={{ color: 'white' }}>{a.temperature}</Typography>
                                        </TableCell>
                                        <TableCell className={classes.cell}>
                                            <Typography sx={{ color: 'white' }}>{a.o2}</Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>

                    < Box20 />


                    {
                        showButtons ? (
                            <ButtonContainer>
                                {
                                    worker.map((a) => (
                                        <Button key={a.id} href={`/healthinfo/${a.id}`} variant="contained" startIcon={<IconUserSearch />}>
                                            {a.name}
                                        </Button>
                                    ))
                                }
                            </ButtonContainer>
                        ) : (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        <ViewButton onClick={handleViewClick}>다른작업자보기</ViewButton>
                                    </div>
                                    <div>
                                        <Button startIcon={<IconHome />} variant="contained" href={'/home'}>홈으로</Button>
                                    </div>
                                </div>
                            </>
                        )}
                </Box >
            </ThemeProvider>
        </>

    )
}

export default Worker;