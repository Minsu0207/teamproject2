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
  Avatar,
} from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';
import React, { useState } from 'react';
import Mainchart from './Mainchart';
import { styled } from '@mui/system';
import {
  IconUrgent,
  IconMoodHappy,
  IconMoodSick,
} from '@tabler/icons';
import PageContainer from 'src/components/container/PageContainer';


const StateList = () => {
  let { vitalsign } = useSelector((state) => {
    return state;
  });

  const lastdb = Object.values(
    vitalsign.reduce((acc, { id, name, age, heartRate, o2, steps, temp, insertTime }) => {
      if (!acc[id] || acc[id].insertTime < insertTime) {
        acc[id] = { id, name, age, heartRate, o2, steps, temp, insertTime };
      }
      return acc;
    }, {}),
  );


  // console.log(lastdb);

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

  const state = lastdb.map((a) => {
    return a;
  });

  const filterstate = () => {
    if (filter === '정상') {
      return state.filter((a) => a.age % 3 === 2);
    } else if (filter === '위험') {
      return state.filter((a) => a.age % 3 === 0);
    } else if (filter === '주의') {
      return state.filter((a) => a.age % 3 === 1);
    } else {
      return state;
    }
  };

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
                  Num
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  이름
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  나이
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  체온
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  맥박수
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  상태
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  상세보기
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lastdb.map((a, i) => (
              <TableRow key={a.num}>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    <Avatar src={`/img/a${2}.jpg`} />
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {a.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                    {a.age}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                    {a.temp}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                    {a.heartRate}
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
                  aria-labelledby="modal-title"
                  aria-describedby="modal-description"
                >
                  <PageContainer>
                    <Box
                      sx={{
                        // bgcolor: "background.paper", //배경색
                        bgcolor: 'white', //배경색
                        color: '',
                        boxShadow: 3, //그림자
                        p: 3, //패딩
                        m: 0, //마진
                        borderRadius: 2, //경계선 반경
                        maxWidth: '70%', //최대너비
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
                        <Grid item xs={12} md={2}>
                          나이: {currentMember.age}
                        </Grid>
                        <Grid item xs={12} md={2}>
                          나이: {currentMember.age}
                        </Grid>
                        <Grid item xs={12} md={2}>
                          나이: {currentMember.age}
                        </Grid>
                        <Grid item xs={12} md={2}>
                          나이: {Math.max(currentMember.age)}
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Mainchart />
                        </Grid>
                        <Grid item xs={12} md={12}>
                          <Mainchart />
                        </Grid>
                        <Grid item xs={12}>
                          <Button variant="outlined" onClick={handleCloseModal}>
                            닫기
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </PageContainer>
                </Modal>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
  );
};

export default StateList;
