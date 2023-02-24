import React from 'react';
import { Box, Button, TextField, Stack } from '@mui/material';
import axios from 'axios';
import bcrypt from 'bcryptjs'; // bcrypt 추가

const AuthRegister = ({ subtext, subtitle, onChange }) => {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {};
        for (var pair of formData.entries()) {
            data[pair[0]] = pair[1];
        }
        console.log('formData: ', data);

        const salt = await bcrypt.genSalt(10); // salt 생성
        const hashedPassword = await bcrypt.hash(data.password, salt); // 비밀번호 해싱
        data.password = hashedPassword; // 해싱된 비밀번호로 대체

        axios.post('/addMember', null, { params: data })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Box component="form" noValidate onSubmit={handleSubmit}>
            {subtext}
            <Stack spacing={3}>
                <TextField
                    label="Name"
                    name="name"
                    fullWidth
                    onChange={onChange}
                    variant="outlined"
                />
                <TextField
                    label="ID"
                    name="id"
                    fullWidth
                    onChange={onChange}
                    variant="outlined"
                />
                <TextField
                    label="Password"
                    name="password"
                    fullWidth
                    onChange={onChange}
                    variant="outlined"
                    type="password"
                />
                <TextField
                    label="Email"
                    name="email"
                    fullWidth
                    onChange={onChange}
                    variant="outlined"
                />
            </Stack>
            <Button color="primary" variant="contained" fullWidth type="submit">
                회원가입
            </Button>
            {subtitle}
        </Box>
    );
};

export default AuthRegister;
