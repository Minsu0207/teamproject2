import React from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
// components
import AlertPeople from './components/AlertPeople';
import Map from './components/Map';
import StateList from './components/StateList';


const Dashboard = () => {
  return (
    <PageContainer title="KeepMe - 스마트솔루션" description="this is Dashboard">
      <Box>
        <Grid container spacing={4} >
          <Grid item xs>
            {/* <TotalPeople /> */}
          </Grid>
          <Grid item xs>
            {/* <TodayPeople /> */}
          </Grid>
          <Grid item xs>
            <AlertPeople />
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              {/* <Mainchart /> */}
            </Grid>
            <Grid item xs={12} lg={4}>
              {/* <Mainchart2 /> */}
            </Grid>
          </Grid>
          <Grid item xs={12} lg={6}>
            <StateList />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Map />
              </Grid>
              <Grid item xs={12}>
                <h1>현장 날씨</h1>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </PageContainer >
  );
};

export default Dashboard;
