import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Typography, Grid, Button, Box, Table, Modal, Backdrop } from '@mui/material';
import DashboardCard from '../../components/DashboardCard';
import { useSelector } from 'react-redux';
import { styled } from '@mui/system';
import PageContainer from 'src/components/PageContainer';

const Page1 = () => {

  let { worker } = useSelector((state) => { return state; });

  const navigate = useNavigate();



  const [data, setData] = useState(worker);
  const [sortOrder, setSortOrder] = useState('asc'); // 정렬 방법 (asc, desc)

  const items = worker.slice();
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


  const handleOpenWorker = (event, member) => {
    navigate(`/healthinfo/${member.id}`);
  };



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
                      <Button onClick={(e) => handleOpenWorker(e, a)}>자세히 보기</Button>
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