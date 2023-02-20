import React, { useState, useEffect } from 'react';
import { Typography, Grid, CardContent } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import axios from 'axios';

const Page1 = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // 현재 페이지 번호 상태값
  const usersPerPage = 20; // 페이지당 보여줄 유저 수

  const fetchUsers = async () => {
    try {
      // 요청이 시작 할 때에는 error 와 users 를 초기화하고
      setError(null);
      setUsers(null);
      // loading 상태를 true 로 바꿉니다.
      setLoading(true);
      const response = await axios.get("/ui/page1");
      setUsers(response.data); // 데이터는 response.data 안에 들어있습니다.
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!users) return null;


  const totalPages = Math.ceil(users.length / usersPerPage); // 전체 페이지 수
  // 현재 페이지에서 보여줄 유저 목록 계산
  const startIndex = (page - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentPageUsers = users.slice(startIndex, endIndex);

  // 페이지 번호 변경 함수
  const handlePageChange = (pageNum) => {
    setPage(pageNum);
  };



  return (
    <PageContainer title="Page1 Page" description="this is Page1 page">

      <DashboardCard title="Page1">
        <Typography>
          <div>
            <h1>User List</h1>
            <table>
              <thead>
                <tr>
                  <th>Num</th>
                  <th>Age</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {currentPageUsers.map((user) => (
                  <tr key={user.num}>
                    <td>{user.num}</td>
                    <td>{user.age}</td>
                    <td>{user.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <button
                disabled={page === 1}
                onClick={() => handlePageChange(page - 1)}
              >
                이전 페이지
              </button>
              <button
                disabled={page === totalPages}
                onClick={() => handlePageChange(page + 1)}
              >
                다음 페이지
              </button>
            </div>
            <div>현재 페이지: {page}</div>
          </div>
        </Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page1;

