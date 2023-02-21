import DashboardCard from '../../../components/shared/DashboardCard';
import { Box, Grid, Stack, Typography, Avatar } from '@mui/material';

function TodayPeople() {

    return (
        <>
            <DashboardCard title="금일 투입인원">
                <Typography variant="h4" fontWeight="600"
                >10명
                </Typography>

            </DashboardCard>
        </>
    )
}

export default TodayPeople;