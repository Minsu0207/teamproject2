import React, { useState, useEffect } from 'react';
import { Typography, Grid, CardContent } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { useSelector } from "react-redux";
import Modal from 'react-modal';

const Page1 = () => {
  let { db } = useSelector((state) => { return state })
  const [data, setData] = useState(db);
  const [modalIsOpen, setModalIsOpen] = useState(false);
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



  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    }
  };

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
                    <td>
                      <button onClick={handleOpenModal}>조회</button>
                      <Modal isOpen={modalIsOpen} onRequestClose={handleCloseModal} style={customStyles}>
                        <h2>{a.name}님의 상세 정보</h2>
                        <p>나이: {a.age}</p>
                        <button onClick={handleCloseModal}>닫기</button>
                      </Modal>
                    </td>
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
    </PageContainer >
  );

}
export default Page1;

