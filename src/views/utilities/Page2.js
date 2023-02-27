import React from 'react';
import { Box, Modal, Table, Typography, Grid, CardContent } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { useSelector } from "react-redux";


const Page2 = () => {
  let { results } = useSelector((state) => { return state })
  console.log(results)
  return (
    <PageContainer title="낙상&추락 위험감지" description="this is Page2 page">
      <DashboardCard title="낙상&추락 위험감지">
        <h3>2회 이상 위험감지자 </h3>
        <Typography sx={{ textAlign: 'center' }}>마지막동기화 27초전</Typography>
        <Table sx={{ textAlign: 'left' }}>
          <thead>
            <tr>
              <th >num</th>
              <th >발생시간</th>
              <th >위험상태</th>
            </tr>
          </thead>
          <tbody>
            {results.map((a, i) => (
              <tr key={i}>
                <td>{a.user}</td>
                <td>{a.recorded_time}</td>
                <td>{a.status}</td>
                <td>

                  <PageContainer >
                  </PageContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page2;
