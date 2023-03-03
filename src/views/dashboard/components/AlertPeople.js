import { Alert, AlertTitle, Box, Fab, Grid, Stack, Typography, Avatar } from '@mui/material';


function AlertPeople() {
    return (
        <>
            <Alert variant="filled" severity="warning">
                <Typography variant="h3" fontWeight="500" >
                    위험 의심 인원
                </Typography>
                <Typography variant="h4" fontWeight="500" >
                    3명
                </Typography>
            </Alert>
        </>
    )
}

export default AlertPeople;