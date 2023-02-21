import DashboardCard from '../../../components/shared/DashboardCard';
import { Box, Grid, Stack, Typography, Avatar } from '@mui/material';

function AlertPeople() {

    return (
        <>
            <DashboardCard title="위험 의심 인원" >
                <Typography variant="h4" fontWeight="600"
                    color='red'>
                    2명
                </Typography>
            </DashboardCard>
        </>
    )
}

export default AlertPeople;