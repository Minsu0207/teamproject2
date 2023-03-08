import { useSelector } from 'react-redux';
import {
  Typography, Box, Grid, Modal, Chip, Button,
  Backdrop, CardContent, Slider,
} from '@mui/material';
import DashboardCard from '../../../components/DashboardCard';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  IconUrgent, IconMoodHappy, IconMoodSick, IconX, IconFall
} from '@tabler/icons';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  head: {
    backgroundColor: '#f5f5f5',
  },
  cell: {
    padding: '16px 8px',
    textAlign: 'center',
  },
});


const StateList = () => {
  let { worker } = useSelector((state) => { return state; });
  const classes = useStyles();
  const [filter, setFilter] = useState('모든');
  const handleShowAll = () => {
    setFilter('All');
  };
  const handleShowNormal = () => {
    setFilter('정상');
  };
  const handleShowAlert = () => {
    setFilter('주의');
  };
  const handleShowDanger = () => {
    setFilter('위험');
  };


  const items = worker.slice();
  const updatedItem = { ...items[0], key: 'new value' };
  items[0] = updatedItem;

  let resfilter = items;

  resfilter = (filter) => {
    if (filter === '정상') {
      return items.filter((user) => {
        const status = (user.status === '정상') ? 1 : 0;
        const tempStatus = (user.temperature >= 35.0 && user.temperature <= 37.3) ? 1 : 0;
        const o2Status = (user.o2 >= 95) ? 1 : 0;
        return (status === 1 && tempStatus === 1 && o2Status === 1);
      });
    } else if (filter === '주의') {
      return items.filter((user) => {
        const status = (user.status === '넘어짐') ? 1 : 0;
        const tempStatus = (user.temperature < 37.3) ? 1 : 0;
        const o2Status = (user.o2 >= 95) ? 1 : (user.o2 >= 90) ? 2 : 3;
        return (status === 1 || (tempStatus === 1 && o2Status === 2));
      });
    } else if (filter === '위험') {
      return items.filter((user) => {
        const status = (user.status === '낙상') ? 1 : 0;
        const tempStatus = (user.temperature > 37.3) ? 1 : 0;
        const o2Status = (user.o2 >= 95) ? 1 : (user.o2 >= 90) ? 2 : 3;
        return (status === 1 || tempStatus === 1 || o2Status === 3);
      });
    } else {
      return items;
    }
  };
  console.log(items)

  const handleChage = (event, member) => {
    navigate(`/healthinfo/${member.id}`);
  };

  const navigate = useNavigate();

  console.log(items)

  return (
    <DashboardCard title={`${filter} 작업자 리스트`}>
      <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
        <Button variant="outline" onClick={handleShowAll}>
          All
        </Button>
        <Button
          sx={{ color: 'green' }}
          variant="outline"
          startIcon={<IconMoodHappy />}
          onClick={handleShowNormal}
        >
          정상
        </Button>
        <Button
          sx={{ color: 'orange' }}
          variant="outline"
          startIcon={<IconMoodSick />}
          onClick={handleShowAlert}
        >
          주의
        </Button>
        <Button
          sx={{ color: 'red' }}
          variant="outline"
          startIcon={<IconUrgent />}
          onClick={handleShowDanger}
        >
          위험
        </Button>

        <Table className={classes.table}
          aria-label="simple table"
          sx={{
            whiteSpace: 'nowrap',
            mt: 2,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell className={classes.cell} align="center">
                <Typography variant="subtitle2" fontWeight={600}>
                  사원번호
                </Typography>
              </TableCell>
              <TableCell className={classes.cell} align="center">
                <Typography variant="subtitle2" fontWeight={600}>
                  이름
                </Typography>
              </TableCell>
              <TableCell className={classes.cell} align="center">
                <Typography variant="subtitle2" fontWeight={600}>
                  직책
                </Typography>
              </TableCell>
              <TableCell className={classes.cell} align="center">
                <Typography variant="subtitle2" fontWeight={600}>
                  체온
                </Typography>
              </TableCell>
              <TableCell className={classes.cell} align="center">
                <Typography variant="subtitle2" fontWeight={600}>
                  상태
                </Typography>
              </TableCell>
              <TableCell className={classes.cell} align="center">
                <Typography variant="subtitle2" fontWeight={600}>
                  행동예측
                </Typography>
              </TableCell>
              <TableCell className={classes.cell} align="center">
                <Typography variant="subtitle2" fontWeight={600}>
                  상세보기
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resfilter(filter).map((a, i) => (
              <TableRow key={i}>
                <TableCell className={classes.cell} align="center">
                  <Typography variant="subtitle2" fontWeight={600}>
                    {a.id}
                  </Typography>
                </TableCell>
                <TableCell className={classes.cell} align="center">
                  <Typography variant="subtitle2" fontWeight={600}>
                    {a.name}
                  </Typography>
                </TableCell>
                <TableCell className={classes.cell} align="center">
                  <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                    {a.position}
                  </Typography>
                </TableCell>
                <TableCell className={classes.cell} align="center">
                  <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                    {a.temperature}
                  </Typography>
                </TableCell>
                <TableCell className={classes.cell} align="center">
                  <Chip
                    color={
                      (a.temperature > 37.3 || a.o2 < 90)
                        ? 'error'
                        : (a.temperature <= 35.0 || a.o2 < 95)
                          ? 'warning'
                          : 'success'
                    }
                    label={
                      (a.temperature <= 35.0)
                        ? '저체온'
                        : (a.temperature > 37.3)
                          ? '고열'
                          : (a.o2 < 90)
                            ? '호흡곤란'
                            : (a.o2 < 95)
                              ? '저산소증'
                              : '정상'
                    }
                    sx={{
                      px: '15px',
                      color: 'white',
                      width: '105px'
                    }}
                  />
                </TableCell>
                <TableCell className={classes.cell} align="center">
                  <Chip
                    label={a.status}
                    color={a.status == '넘어짐' ? 'warning' : a.status == '낙상' ? 'error' : 'success'}
                    sx={{
                      px: '15px',
                      color: 'white',
                      width: '100px'

                    }}
                  />
                </TableCell>
                <TableCell className={classes.cell} align="center">
                  <Button variant="outlined" onClick={(e) => handleChage(e, a)}>상세 정보</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box >
    </DashboardCard >
  );
};

export default StateList;
