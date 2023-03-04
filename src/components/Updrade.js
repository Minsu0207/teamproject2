import React from 'react';
import { Box, Typography, Button } from '@mui/material';

// import Logo2 from '/img/logo2'
export const Upgrade = () => {
    return (
        <Box
            display={'flex'}
            alignItems="center"
            gap={4}
            sx={{ m: 3, p: 3, bgcolor: `${'primary.light'}`, borderRadius: '8px' }}
        >
            <>
                <Box>
                    <img alt="Remy Sharp" src={`${process.env.PUBLIC_URL}/img/logo2.png `} width={150} />
                </Box>
            </>
        </Box>
    );
};
