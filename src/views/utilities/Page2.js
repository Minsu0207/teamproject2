import React from 'react';
import { Box, Modal, Table, Typography, Grid, CardContent } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';


const Page2 = () => {
  return (
    <PageContainer title="낙상&추락 위험감지" description="this is Page2 page">
      <DashboardCard title="낙상&추락 위험감지">
        <h3>2회 이상 위험감지자 </h3>
        <Typography sx={{ textAlign: 'center' }}>마지막동기화 27초전</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page2;
