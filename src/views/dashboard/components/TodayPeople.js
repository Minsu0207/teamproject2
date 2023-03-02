import DashboardCard from '../../../components/shared/DashboardCard';
import { Alert, Grid, Stack, Typography, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
function TodayPeople() {
    let { users } = useSelector((state) => { return state })
    return (
        <>
            <Alert icon={false} variant="outlined" severity="info">
                <Typography variant="h3" fontWeight="500" >
                    금일 투입인원
                </Typography>
                <Typography variant="h4" fontWeight="500" >
                    {users.length}명
                </Typography>
            </Alert>
        </>
    )
}

export default TodayPeople;