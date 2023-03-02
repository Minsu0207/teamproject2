import React, { useState, useEffect } from 'react';
import { Typography, Grid, Button, Box, Table, Modal, Backdrop } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import Mainchart from '../dashboard/components/Mainchart';
import { useSelector } from 'react-redux';
import { styled } from '@mui/system';



const Page1 = () => {
  let { user } = useSelector((state) => { return state; });
  let { users } = useSelector((state) => { return state; });



  const [data, setData] = useState(users);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc'); // 정렬 방법 (asc, desc)

  const items = user.slice();
  const updatedItem = { ...items[0], key: 'new value' };
  items[0] = updatedItem;

  //데이터중 recordTime이 가장 최신값이 1개만 추출, 중복제거
  const res = Object.values(data.reduce((acc, currentValue) => {
    const { id, name, position, age, employedDate, contact, lat, lon, temp, o2, heartRate, steps, recordTime } = currentValue;
    if (!acc[id] || acc[id].recordTime < recordTime) {
      acc[id] = { id, name, age, position, employedDate, contact, lat, lon, temp, o2, heartRate, steps, recordTime };
    }
    return acc;
  }, {}));


  //정렬
  const handleSort = (key) => {
    const sortedData = items.sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];
      if (valueA === undefined || valueB === undefined) {
        return 0;
      }
      if (sortOrder === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
    setData(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };


  //모달창 오픈
  const handleOpenModal = (event, member) => {
    setCurrentMember(member);
    setModalIsOpen(true);
  };

  //모달창 클로즈
  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  //배경 css
  const CustomBackdrop = styled(Backdrop)(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  }));

  return (
    <>
      <PageContainer>
        <DashboardCard title="회원관리">
          <Typography>
            <Table sx={{ textAlign: 'left' }}>
              <thead>
                <tr>
                  <th onClick={() => handleSort('id')}>사원번호</th>
                  <th onClick={() => handleSort('name')}>name</th>
                  <th onClick={() => handleSort('position')}>직책</th>
                  <th onClick={() => handleSort('age')}>age</th>
                  <th>상세정보</th>
                </tr>
              </thead>
              <tbody>
                {res.map((a, i) => (
                  <tr key={i}>
                    <td>{a.id}</td>
                    <td>{a.name}</td>
                    <td>{a.position}</td>
                    <td>{a.age}</td>
                    <td>
                      <Button onClick={(e) => handleOpenModal(e, a)}>자세히 보기</Button>
                      <Modal
                        open={modalIsOpen}
                        onClose={handleCloseModal}
                        BackdropComponent={CustomBackdrop}
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
                              mt: 5, //마진 탑
                            }}
                          >
                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                  {currentMember.name}님의 상세 정보
                                </Typography>
                              </Grid>
                              <Grid item xs={12} md={3}>
                                {currentMember.name} {currentMember.position}<br />
                                {currentMember.contact}<br /><br />
                                담당: {currentMember.role}<br />
                                입사일:{currentMember.employedDate}<br />
                              </Grid>
                              <Grid item xs={12} md={1}>
                                나이: {currentMember.age}
                              </Grid>
                              <Grid item xs={12} md={2}>
                                나이: {currentMember.age}
                                나이: {currentMember.heartRate}
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
                                <Button onClick={handleCloseModal}>닫기</Button>
                              </Grid>
                            </Grid>
                          </Box>
                        </PageContainer>
                      </Modal>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Typography>
        </DashboardCard>
      </PageContainer>
    </>
  );
};
export default Page1;
