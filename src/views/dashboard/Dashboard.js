import React from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

// components
import TotalPeople from './components/TotalPeople';
import TodayPeople from './components/TodayPeople';
import AlertPeople from './components/AlertPeople';
import Map from './components/Map';
import YearlyBreakup from './components/YearlyBreakup';
import RecentTransactions from './components/RecentTransactions';
import ProductPerformance from './components/ProductPerformance';
import MonthlyEarnings from './components/MonthlyEarnings';


const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>

        <Grid container spacing={3}>
          <Grid item xs>
            <TotalPeople />
          </Grid>
          <Grid item xs>
            <TodayPeople />
          </Grid>
          <Grid item xs>
            <AlertPeople />
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs={12} md={7}>
              <Map />
            </Grid>
            <Grid item xs={12} md={5}>
              <Grid item xs={12} >
                <MonthlyEarnings />
              </Grid>
              <Grid item xs={12}>
              </Grid>
              <ProductPerformance />
            </Grid>
          </Grid>


          {/* <RecentTransactions /> */}
          {/* <YearlyBreakup /> */}
        </Grid>
      </Box>
    </PageContainer >
  );
};

export default Dashboard;
