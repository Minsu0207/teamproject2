import React from 'react';
import { Typography, Grid, CardContent } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';



const Page2 = () => {
  return (
    <PageContainer title="Page2 Page" description="this is Page2 page">
      <DashboardCard title="Page2">
        <Typography>Page2</Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page2;
