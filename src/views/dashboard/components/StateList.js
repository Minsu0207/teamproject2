import { useSelector } from 'react-redux';
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    Button
} from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';
import React, { useState } from 'react';

import {
    IconBrandReact, IconUrgent, IconMoodHappy, IconMoodSick, IconMoodWrrr, IconFilter
} from '@tabler/icons';
import { color } from '@mui/system';

const StateList = () => {
    let { db } = useSelector((state) => { return state })

    const [filter, setFilter] = useState('all');

    const handleShowAll = () => {
        setFilter('all');
    };

    const handleShowNormal = () => {
        setFilter('normal');
    };
    const handleShowAlert = () => {
        setFilter('alert');
    };

    const handleShowDanger = () => {
        setFilter('danger');
    };

    const filterstate = () => {
        if (filter === 'normal') {
            return state.filter((a) => a.age % 3 === 2);
        } else if (filter === 'danger') {
            return state.filter((a) => a.age % 3 === 0);
        } else if (filter === 'alert') {
            return state.filter((a) => a.age % 3 === 1);
        } else {
            return state;
        }
    };

    // a.age % 3 == 0 ? 'red' :
    //     (a.age % 3 == 1 ? 'orange' : 'green')

    const state = db.map((a) => { return a })
    return (

        <DashboardCard title="Product1">
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Button variant="contained" onClick={handleShowAll}>
                    All
                </Button>
                <Button variant="outline" startIcon={<IconMoodHappy />} onClick={handleShowNormal}>
                    정상
                </Button>
                <Button variant="outline" startIcon={<IconMoodSick />} onClick={handleShowAlert}>
                    주의
                </Button>


                <Button sx={{ color: 'red' }} variant="outline" startIcon={<IconUrgent />} onClick={handleShowDanger}>
                    위험
                </Button>
                <Table
                    aria-label="simple table"
                    sx={{
                        whiteSpace: "nowrap",
                        mt: 2
                    }}
                >
                    <TableHead>

                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Num
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    Naum
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    age
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    체온
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    맥박수
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2" fontWeight={600}>
                                    상태
                                </Typography>
                            </TableCell>


                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filterstate().map((a) => (
                            <TableRow key={a.num}>
                                <TableCell>
                                    <Typography
                                        sx={{
                                            fontSize: "15px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {a.num}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                        {a.name}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {a.age}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {a.age / 2}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                                        {Math.floor(a.age / 1.5)}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        sx={{
                                            px: "3px",
                                            backgroundColor:
                                                a.age % 3 == 0 ? 'red' :
                                                    (a.age % 3 == 1 ? 'orange' : 'green'),
                                            color: "#fff",
                                        }}
                                        size="small"
                                        label={a.age % 3 == 0 ? '위험' :
                                            (a.age % 3 == 1 ? '주의' : '정상')}
                                    ></Chip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </DashboardCard >
    );
};

export default StateList;
