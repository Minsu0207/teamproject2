import { Box, Grid, Alert, Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';

function AlertPeople() {
    let { worker } = useSelector((state) => { return state; });

    return (
        <>
            <Box>
                <Grid container spacing={1}>
                    <Grid item xs={12} lg={4}>
                        <Alert variant="outlined" severity="info" >
                            <Typography variant="h4" fontWeight="500">
                                전체 등록 인원
                            </Typography>
                            <Typography variant="h4" fontWeight="500">
                                {worker.length}
                            </Typography>
                        </Alert>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <Alert variant="outlined" severity="success" >
                            <Typography variant="h4" fontWeight="500">
                                현장 등록 인원
                            </Typography>
                            <Typography variant="h4" fontWeight="500">
                                {worker.length}
                            </Typography>
                        </Alert>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <Alert variant="outlined" severity="error">
                            <Typography variant="h4" fontWeight="400">
                                위험 의심 인원
                            </Typography>
                            <Typography variant="h4" fontWeight="500">
                                4명
                            </Typography>
                        </Alert>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default AlertPeople;