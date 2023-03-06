import React from 'react';
import { Grid, Box } from '@mui/material';
// components
import AlertPeople from './Dashboard/WorkerList';
import Map from './Dashboard/Map';
import StateList from './Dashboard/StateList';
import PageContainer from 'src/components/PageContainer';
import { useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Dashboard = () => {
    const theme = createTheme({
        typography: {
            fontFamily:
                'Montserrat,Noto Sans Korean,Titillium Web,IBM Plex Sans,Nanum Gothic'
        },
    })

    return (
        <ThemeProvider theme={theme}>
            <PageContainer PageContainer title="KeepMe - 스마트솔루션" description="this is Dashboard" >
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
        </ThemeProvider >
    );
};

export default Dashboard;
