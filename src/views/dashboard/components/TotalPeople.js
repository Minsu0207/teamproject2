import DashboardCard from '../../../components/shared/DashboardCard';
import { Box, Grid, Stack, Typography, Avatar } from '@mui/material';

function TotalPeople() {

    return (
        <>
            <DashboardCard title="전체 등록 인원">
                <Typography variant="h4" fontWeight="600"
                >
                    10명
                </Typography>
            </DashboardCard>
        </>
    )
}

export default TotalPeople;