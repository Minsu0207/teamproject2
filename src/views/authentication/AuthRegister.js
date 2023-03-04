import React, { useState } from 'react';
import { Box, Button, TextField, Stack } from '@mui/material';
import axios from 'axios';
import bcrypt from 'bcryptjs'; // bcrypt 추가
import { useNavigate } from 'react-router-dom'; // useNavigate 

const AuthRegister = ({ subtext, subtitle, onChange }) => {
    const navigate = useNavigate(); // useNavigate 설정
    const [formData, setFormData] = useState({
        name: '',
        adminId: '',
        password: '',
        email: '',
    });
    const handleCheckId = async () => {
        try {
            const res = await axios.get(`/checkId?id=${formData.adminId}`);
            if (res.data === true) {
                alert('중복된 ID가 있습니다.');
            } else {
                alert('사용 가능한 ID입니다.');
            }
        } catch (e) {
            console.error(e);
            alert('중복 확인에 실패하였습니다.');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = { ...formData };
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(formData.password, salt);
        data.password = hashedPassword;

        axios
            .post('/addMember', data, { params: data })
            .then((response) => {
                console.log(response);
                navigate('/auth/login'); // 회원가입 후 로그인 페이지로 이동
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };



    return (
        <Box component="form" noValidate onSubmit={handleSubmit}>
            {subtext}
            <Stack spacing={3}>
                <TextField label="Name" name="name" fullWidth onChange={handleChange} variant="outlined" />
                <TextField label="ID" name="adminId" fullWidth onChange={handleChange} variant="outlined" />
                <Button variant="contained" color="primary" onClick={handleCheckId} sx={{ mt: '10px' }}>
                    중복확인
                </Button>
                <TextField label="Password" name="password" fullWidth onChange={handleChange} variant="outlined" type="password" />
                <TextField label="Email" name="email" fullWidth onChange={handleChange} variant="outlined" />
            </Stack>
            <Button color="primary" variant="contained" fullWidth type="submit">
                회원가입
            </Button>
            {subtitle}
        </Box>
    );
};

export default AuthRegister;
