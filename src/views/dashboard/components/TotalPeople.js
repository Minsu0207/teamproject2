import DashboardCard from '../../../components/shared/DashboardCard';
import { Alert, Box, Grid, Stack, Typography, Avatar } from '@mui/material';

function TotalPeople() {

    return (
        <>
            <Alert icon={false} color="info" variant="outlined" severity="info">
                <Typography variant="h3" fontWeight="500" >
                    전체 투입인원
                </Typography>
                <Typography variant="h4" fontWeight="500" >
                    10명
                </Typography>
            </Alert>
        </>
    )
}

export default TotalPeople;