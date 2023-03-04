import React from 'react';
import { Grid, Box } from '@mui/material';
// components
import AlertPeople from './Dashboard/AlertPeople';
import Map from './Dashboard/Map';
import StateList from './Dashboard/StateList';
import PageContainer from 'src/components/PageContainer';
import { useSelector } from 'react-redux';

const Dashboard = () => {
    return (
        <PageContainer title="KeepMe - 스마트솔루션" description="this is Dashboard">
            <Box>
                <Grid container spacing={2} >
                    <Grid item xs={12} >
                        <AlertPeople />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <StateList />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Map />
                    </Grid>
                </Grid>
            </Box>
        </PageContainer >
    );
};

export default Dashboard;
