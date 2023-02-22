import DashboardCard from '../../../components/shared/DashboardCard';
import { Alert, Grid, Stack, Typography, Avatar } from '@mui/material';

function TodayPeople() {

    return (
        <>
            <Alert icon={false} variant="outlined" severity="info">
                <Typography variant="h3" fontWeight="500" >
                    금일 투입인원
                </Typography>
                <Typography variant="h4" fontWeight="500" >
                    10명
                </Typography>
            </Alert>
        </>
    )
}

export default TodayPeople;