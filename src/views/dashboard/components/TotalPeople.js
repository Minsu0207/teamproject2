import { Alert, Box, Grid, Stack, Typography, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';

function TotalPeople() {

    let { users } = useSelector((state) => { return state })

    return (
        <>
            <Alert icon={false} color="info" variant="outlined" severity="info">
                <Typography variant="h3" fontWeight="500" >
                    전체 투입인원
                </Typography>
                <Typography variant="h4" fontWeight="500" >
                    {users.length}명
                </Typography>
            </Alert>
        </>
    )
}

export default TotalPeople;