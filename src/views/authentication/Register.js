import React, { useState } from 'react';
import { Grid, Box, Card, Typography, Stack, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';
import AuthRegister from './auth/AuthRegister';
import axios from 'axios';
import bcrypt from 'bcryptjs'; // bcrypt 추가

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    adminId: '',
    password: '',
    email: '',
  });

  const handleSubmit = async () => {
    try {
      const salt = await bcrypt.genSalt(10); // salt 생성
      const hashedPassword = await bcrypt.hash(formData.password, salt); // 비밀번호 해싱

      const res = await axios.post(`/addMember?
      name=${formData.name}
      &adminId=${formData.adminId}
      &password=${hashedPassword}
      &email=${formData.email}`);

      console.log(res.data)
      if (res.data === 'duplicated') {
        alert('이미 사용 중인 ID입니다. 다른 ID를 입력해주세요.');
        console.log('회원가입 실패 - 중복된 ID');
        return; // 여기서 return을 해줘야 회원가입 성공 메시지를 띄우지 않습니다.
      }
      alert('회원가입이 완료되었습니다.');
      navigate('/auth/login');
    } catch (e) {
      alert('회원가입에 실패하였습니다.');
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <PageContainer title="Register" description="this is Register page">
      <Box
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
      >
        <Grid container spacing={1} justifyContent="center" sx={{ height: '100vh' }}>
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>
              <AuthRegister
                subtext={
                  <Typography variant="subtitle1" textAlign="center" color="textSecondary" mb={1}>
                    회원가입
                  </Typography>
                }
                onSubmit={handleSubmit}
                subtitle={
                  <Stack direction="row" justifyContent="center" spacing={1} mt={3}>
                    <Typography color="textSecondary" variant="h6" fontWeight="400">
                      Already have an Account?
                    </Typography>
                    <Button
                      component={Link}
                      to="/auth/login"
                      variant="text"
                      color="primary"
                      sx={{
                        textDecoration: 'none',
                      }}
                    >
                      Sign In
                    </Button>
                  </Stack>
                }
                onChange={handleChange}
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Register;