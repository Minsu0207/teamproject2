import React, { useState, useEffect } from 'react';
import { Typography, Grid, CardContent } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { useSelector } from "react-redux";

const Page1 = () => {
  let { db } = useSelector((state) => { return state })
  const [page, setPage] = useState(1); // 현재 페이지 번호 상태값
  const usersPerPage = 10; // 페이지당 보여줄 유저 수

  const totalPages = Math.ceil(db.length / usersPerPage); // 전체 페이지 수
  // 현재 페이지에서 보여줄 유저 목록 계산
  const startIndex = (page - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentPageUsers = db.slice(startIndex, endIndex);

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
                {currentPageUsers.map((db) => (
                  <tr key={db.num}>
                    <td>{db.num}</td>
                    <td>{db.age}</td>
                    <td>{db.name}</td>
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

