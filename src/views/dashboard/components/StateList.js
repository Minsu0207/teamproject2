import { useSelector } from 'react-redux';
import {
    Typography,
    Box,
    Grid,
    Table,
    Modal,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    Button,
    Backdrop,
    CardContent,
    Slider,
} from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';
import React, { useMemo, useState } from 'react';
import Mainchart from './Mainchart';
import { styled } from '@mui/system';
import {
    IconUrgent,
    IconMoodHappy,
    IconMoodSick,
    IconX
} from '@tabler/icons';
import PageContainer from 'src/components/container/PageContainer';


const StateList = () => {
    let { users } = useSelector((state) => {
        return state;
    });
    const [data, setData] = useState(users);
    const [currentMember, setCurrentMember] = useState(1);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [filter, setFilter] = useState('위험');
    const handleShowAll = () => {
        setFilter('모든');
    };
    const handleShowNormal = () => {
        setFilter('정상');
    };
    const handleShowAlert = () => {
        setFilter('주의');
    };
    const handleShowDanger = () => {
        setFilter('위험');
    };


    const items = users.slice();
    const updatedItem = { ...items[0], key: 'new value' };
    items[0] = updatedItem;

    //데이터중 recordTime이 가장 최신값이 1개만 추출, 중복제거
    const res = Object.values(data.reduce((a, cur) => {
        const { id, name, position, age, employedDate, contact, lat, lon, temp, o2, heartRate, steps, recordTime } = cur;
        if (!a[id] || a[id].recordTime < recordTime) {
            a[id] = { id, name, age, position, employedDate, contact, lat, lon, temp, o2, heartRate, steps, recordTime };
        }
        return a;
    }, {}));


    let resfilter = res;

    resfilter = (filter) => {
        if (filter === '정상') {
            return res.filter((a) => a.age % 3 == 2);
        } else if (filter === '위험') {
            return res.filter((a) => a.age % 3 == 0);
        } else if (filter === '주의') {
            return res.filter((a) => a.age % 3 == 1);
        } else {
            return res;
        }
    };

    console.log(resfilter())

    const handleOpenModal = (event, member) => {
        setCurrentMember(member);
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setModalIsOpen(false);
    };


    const CustomBackdrop = styled(Backdrop)(({ theme }) => ({
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
    }));

    return (
        <DashboardCard title={`${filter} 작업자 리스트`}>
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Button variant="outline" onClick={handleShowAll}>
                    All
                </Button>
                <Button
                    sx={{ color: 'green' }}
                    variant="outline"
                    startIcon={<IconMoodHappy />}
                    onClick={handleShowNormal}
                >
                    정상
                </Button>
                <Button
                    sx={{ color: 'orange' }}
                    variant="outline"
                    startIcon={<IconMoodSick />}
                    onClick={handleShowAlert}
                >
                    주의
                </Button>
                <Button
                    sx={{ color: 'red' }}
                    variant="outline"
                    startIcon={<IconUrgent />}
                    onClick={handleShowDanger}
                >
                    위험
                </Button>

                <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: 'nowrap',
                        mt: 2,
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    사원번호
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    이름
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    직책
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    체온
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    상태
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    상세정보
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {resfilter(filter).map((a, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        {a.id}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        {a.name}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {a.position}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {a.temp}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        sx={{
                                            px: '3px',
                                            backgroundColor: a.age % 3 === 0 ? 'red' : a.age % 3 === 1 ? 'orange' : 'green',
                                            color: '#fff',
                                        }}
                                        size="small"
                                        label={a.age % 3 === 0 ? '위험' : a.age % 3 === 1 ? '주의' : '정상'}
                                    ></Chip>
                                </TableCell>
                                <TableCell>
                                    <Button variant="outlined" onClick={(e) => handleOpenModal(e, a)}>
                                        조회
                                    </Button>
                                </TableCell>
                                <Modal
                                    open={modalIsOpen}
                                    onClose={handleCloseModal}
                                    BackdropComponent={CustomBackdrop}
                                >
                                    <PageContainer>
                                        <Box
                                            sx={{
                                                bgcolor: 'white', //배경색
                                                color: '',
                                                boxShadow: 3, //그림자
                                                p: 3, //패딩
                                                m: 0, //마진
                                                borderRadius: 2, //경계선 반경
                                                maxWidth: '60%', //최대너비
                                                margin: 'auto', //마진
                                                mt: 15, //마진 탑
                                            }}
                                        >
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                                        {currentMember.name}님의 상세 정보

                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <CardContent>
                                                        <Typography variant="h3">{currentMember.name} {currentMember.position}
                                                        </Typography>
                                                        <Typography variant="body1" color="textSecondary">
                                                            <br />
                                                            전화번호:{currentMember.contact}<br />
                                                            입사일:{currentMember.employedDate}
                                                        </Typography>
                                                    </CardContent>



                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <Chip color={currentMember.temp <= 35.0 ? 'warning' :
                                                        currentMember.temp >= 37.3 ? 'error' : 'success'}
                                                        label={currentMember.temp <= 35.0 ? '저체온' :
                                                            currentMember.temp >= 37.3 ? '고체온' : '정상체온'}
                                                        sx={{
                                                            px: '15px',
                                                            color: 'black',
                                                        }} />
                                                    <CardContent>
                                                        <Typography variant="h1">{currentMember.temp}℃
                                                        </Typography>
                                                        <Typography variant="body1" color="textSecondary">
                                                        </Typography>
                                                    </CardContent>
                                                    <Box sx={{ width: 150 }}>
                                                        <Slider
                                                            color={currentMember.temp <= 35.0 ? 'warning' :
                                                                currentMember.temp >= 37.3 ? 'error' : 'success'}
                                                            defaultValue={50 + (currentMember.temp - 36.5) * 30}
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
                                                <Grid item xs={12} md={4}>
                                                    <CardContent>
                                                        <Typography variant="h4">산호포화도: {currentMember.o2}<br /><br />
                                                            심박수: {currentMember.heartRate}<br /><br />
                                                            걸음수:{currentMember.steps}
                                                        </Typography>
                                                        <Typography variant="body1" color="textSecondary">
                                                        </Typography>
                                                    </CardContent>
                                                </Grid>
                                                <Grid item xs={12} md={12}>
                                                    <Mainchart />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                                        <Button endIcon={<IconX />} variant="outlined" onClick={handleCloseModal}>
                                                            닫기
                                                        </Button>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </PageContainer>
                                </Modal>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box >
        </DashboardCard >
    );
};

export default StateList;
