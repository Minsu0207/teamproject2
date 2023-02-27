import React, { useState, useEffect } from 'react';
import { Typography, Grid, Button, Box, Table, Modal, Backdrop } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import Mainchart from '../dashboard/components/Mainchart'
import { useSelector } from "react-redux";
import { styled } from "@mui/system";

const Page1 = () => {
  let { db } = useSelector((state) => { return state })
  
  const [data, setData] = useState(db);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentMember, setCurrentMember] = useState(1)
  const [sortOrder, setSortOrder] = useState('asc'); // 정렬 방법 (asc, desc)

  const items = db.slice();


  const updatedItem = { ...items[0], key: 'new value' };
  items[0] = updatedItem;

  // console.log(items)
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

  // 페이징 함수
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 변경 함수
  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  // 페이지 번호 계산
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }



  const handleOpenModal = (event, member) => {
    setCurrentMember(member)
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };


  const CustomBackdrop = styled(Backdrop)(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  }));


  return (
    <>
      <PageContainer >
        <DashboardCard title="회원관리">
          <Typography>
            <Table sx={{ textAlign: 'left' }}>
              <thead>
                <tr>
                  <th onClick={() => handleSort('num')}>num</th>
                  <th onClick={() => handleSort('name')}>name</th>
                  <th onClick={() => handleSort('age')}>age</th>
                  <th>상세정보</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((a, i) => (
                  <tr key={i}>
                    <td>{a.num}</td>
                    <td>{a.name}</td>
                    <td>{a.age}</td>
                    <td>

                      <Button onClick={(e) => handleOpenModal(e, a)}>조회</Button>
                      <Modal
                        open={modalIsOpen}
                        onClose={handleCloseModal}
                        BackdropComponent={CustomBackdrop}
                        aria-labelledby="modal-title"
                        aria-describedby="modal-description"
                      >
                        <PageContainer >
                          <Box sx={{
                            // bgcolor: "background.paper", //배경색
                            bgcolor: 'white', //배경색
                            color: '',
                            boxShadow: 3, //그림자
                            p: 3, //패딩
                            m: 0, //마진
                            borderRadius: 2,//경계선 반경
                            maxWidth: '70%', //최대너비
                            margin: "auto", //마진
                            mt: 15  //마진 탑
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
            <div>
              {pageNumbers.map((number) => (
                <button key={number} id={number} onClick={handleClick}>
                  {number}
                </button>
              ))}
            </div>
          </Typography>
        </DashboardCard>
      </PageContainer >

    </>
  );

}
export default Page1;

