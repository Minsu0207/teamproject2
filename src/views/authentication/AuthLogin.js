import React, { useState } from 'react';
import {
    Box, Typography, FormGroup, FormControlLabel, Button, Stack, Checkbox, Alert
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import CustomTextField from 'src/components/CustomTextField';
import axios from 'axios';
import bcrypt from 'bcryptjs'; // bcrypt 추가
import { useDispatch } from 'react-redux';
import { setLoggedInUser } from 'src/store';

const AuthLogin = ({ title, subtitle, subtext }) => {
    const navigate = useNavigate();
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [formData, setFormData] = useState({
        adminId: '',
        password: '',
    });

    const dispatch = useDispatch();

    const handleSubmit = async () => {
        try {

            const res = await axios.get(`/login?id=${formData.adminId}`, {
                withCredentials: true // 쿠키를 전달할 수 있도록 설정
            });
            if (res.data.length === 0) {
                throw new Error('Login failed');
            }

            const hashedPassword = res.data.password; // 데이터베이스에서 해싱된 비밀번호 가져오기
            const isMatch = await bcrypt.compare(formData.password, hashedPassword); // 입력받은 비밀번호와 비교
            if (!isMatch) {
                throw new Error('Login failed');
            }

            dispatch(setLoggedInUser(res.data));
            setAlertMessage(`${res.data.name}님 환영합니다! 2초후 자동으로 메인페이지로 이동합니다`);
            setOpenAlert(true);
            navigate('/home');
        } catch (e) {
            console.error(e);
            console.log('로그인 실패')
            setAlertMessage('로그인에 실패하였습니다.');
            setOpenAlert(true);
        }
    };

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <>
            {title ? (
                <Typography fontWeight="700" variant="h2" mb={1}>
                    {title}
                </Typography>
            ) : null}
            {subtext}


            <Stack>
                <Box>
                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="adminId" mb="5px">
                        ID
                    </Typography>
                    <CustomTextField id="adminId" name="adminId" variant="outlined" fullWidth onChange={handleChange} />
                </Box>
                <Box mt="25px">
                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="password" mb="5px">
                        Password
                    </Typography>
                    <CustomTextField id="password" name="password" type="password" variant="outlined" fullWidth onChange={handleChange} />
                </Box>
                <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
                    <Typography
                        component={Link}
                        to="/"
                        fontWeight="500"
                        sx={{
                            textDecoration: 'none',
                            color: 'primary.main',
                        }}
                    >
                        Forgot Password ?
                    </Typography>
                </Stack>
            </Stack>
            <Box>
                <Button color="primary" variant="contained" size="large" fullWidth onClick={handleSubmit} type="submit">
                    Sign In
                </Button>
                <Alert open={openAlert} severity="info" sx={{ mt: 2, fontSize: 16 }} onClose={() => setOpenAlert(false)}>
                    {alertMessage}
                </Alert>
            </Box>
            {subtitle}
        </>
    );
};

export default AuthLogin;