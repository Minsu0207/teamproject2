import React, { useState, useEffect } from 'react';
import { Typography, Grid, CardContent } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { useSelector } from "react-redux";

const Page1 = () => {
  let { db } = useSelector((state) => { return state })
  const [data, setData] = useState(db);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [sortOrder, setSortOrder] = useState('asc'); // 정렬 방법 (asc, desc)


  const items = db.slice();

  const updatedItem = { ...items[0], key: 'new value' };
  items[0] = updatedItem;

  console.log(items)
  const handleSort = (key) => {
    const sortedData = items.sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];
      if (valueA === undefined || valueB === undefined) {
        return 0;
      }
      if (sortOrder === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
    setData(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // 페이징 함수
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 변경 함수
  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  // 페이지 번호 계산
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }


  return (
    <PageContainer >

      <DashboardCard title="회원관리">
        <Typography>
          <div>
            <table>
              <thead>
                <tr>
                  <th onClick={() => handleSort('num')}>num</th>
                  <th onClick={() => handleSort('name')}>name</th>
                  <th onClick={() => handleSort('age')}>age</th>
                  <th>상세정보</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((a, i) => (
                  <tr key={i}>
                    <td>{a.num}</td>
                    <td>{a.name}</td>
                    <td>{a.age}</td>
                    <td><a href={`/page1/${i}`}>조회</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              {pageNumbers.map((number) => (
                <button key={number} id={number} onClick={handleClick}>
                  {number}
                </button>
              ))}
            </div>
          </div>
        </Typography>
      </DashboardCard>
    </PageContainer>
  );
};

export default Page1;

