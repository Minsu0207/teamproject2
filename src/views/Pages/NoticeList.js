import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Box, Grid, Typography } from '@mui/material';

const NoticeList = () => {
    const [noticeList, setNoticeList] = useState([]);

    const user = useSelector((state) => state.user);

    useEffect(() => {
        async function fetchNoticeList() {
            try {
                const response = await axios.get('/api/notices');
                setNoticeList(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchNoticeList();
    }, []);

    return (
        <Box>
            <Grid container spacing={2}>
                {noticeList.map((notice) => (
                    <Grid item xs={12} key={notice.id}>
                        <Box padding="20px" borderBottom="1px solid #eee">
                            <Typography component={Link} to={`/notice/${notice.id}`} variant="h5">
                                {notice.title}
                            </Typography>
                            <Typography variant="subtitle2" sx={{ mt: 1, mb: 1 }}>
                                {notice.author} | {notice.createdAt}
                            </Typography>
                            <Typography>{notice.content}</Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default NoticeList;