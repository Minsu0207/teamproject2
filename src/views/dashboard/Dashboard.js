import React from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

// components
import TotalPeople from './components/TotalPeople';
import TodayPeople from './components/TodayPeople';
import AlertPeople from './components/AlertPeople';
import Map from './components/Map';
import StateList from './components/StateList';
import Mainchart from './components/Mainchart';
import Mainchart2 from './components/Mainchart2';
import Mainchart3 from './components/Mainchart3';


const Dashboard = () => {
  return (
    <PageContainer title="KeepMe - 스마트솔루션" description="this is Dashboard">
      <Box>
        <Grid container spacing={3} >
          <Grid item xs >
            <TotalPeople />
          </Grid>
          <Grid item xs>
            <TodayPeople />
          </Grid>
          <Grid item xs>
            <AlertPeople />
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Mainchart />
            </Grid>
            <Grid item xs={12} md={4}>
              <Mainchart2 />
            </Grid>
            <Grid item xs={12} md={4}>
              <Mainchart3 />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <StateList />
            </Grid>
            <Grid item xs={12} md={6}>
              <Map />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </PageContainer >
  );
};

export default Dashboard;
