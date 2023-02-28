import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import Router from './routes/Router';
import { useDispatch, useSelector } from 'react-redux';
import { baselightTheme } from './theme/DefaultColors';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { getDbList, getUserList, getGpsList, getVitalsignList } from './store';
import Error from './views/authentication/Error';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const routing = useRoutes(Router);
  const theme = baselightTheme;
  let dispatch = useDispatch();

  // const fetchUsers = async () => {
  //   try {
  //     setError(null);
  //     setLoading(true);
  //     await axios.get("/test").then((result) => {
  //       dispatch(getDbList(result.data));
  //       console.log("데이터 통신 성공")
  //     })
  //   } catch (e) {
  //     setError(e);
  //     console.log("데이터 가져오기 실패")
  //   }
  //   setLoading(false);
  // };

  // const fetchUsers2 = async () => {
  //   try {
  //     setError(null);
  //     setLoading(true);
  //     await axios.get("/results").then((result) => {
  //       dispatch(getResultsList(result.data));
  //       console.log("데이터 통신 성공")
  //     })
  //   } catch (e) {
  //     setError(e);
  //     console.log("데이터 가져오기 실패")
  //   }
  //   setLoading(false);
  // };

  const fetchData = async (url, actionCreator) => {
    try {
      setError(null);
      setLoading(true);
      const result = await axios.get(url);
      dispatch(actionCreator(result.data));
      console.log('데이터 통신 성공');
    } catch (e) {
      setError(e);
      console.log('데이터 가져오기 실패');
    }
    setLoading(false);
  };

  const fetch = () => fetchData('/test', getDbList);
  const fetch1 = () => fetchData('/user', getUserList);
  const fetch2 = () => fetchData('/vitalsign', getVitalsignList);
  const fetch3 = () => fetchData('/gps', getGpsList);

  useEffect(() => {
    fetch();
    fetch1();
    fetch2();
    fetch3();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <Error />;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {routing}
    </ThemeProvider>
  );
};

export default App;
