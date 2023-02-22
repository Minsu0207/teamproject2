import { CssBaseline, ThemeProvider } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import Router from './routes/Router';
import { useDispatch, useSelector } from "react-redux";
import { baselightTheme } from "./theme/DefaultColors";
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { getDbList } from './store'
import Error from './views/authentication/Error';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const routing = useRoutes(Router);
  const theme = baselightTheme;
  let dispatch = useDispatch();

  const fetchUsers = async () => {
    try {
      setError(null);
      setLoading(true);
      await axios.get("/test").then((result) => {
        dispatch(getDbList(result.data));
        console.log("데이터 통신 성공")
      })
    } catch (e) {
      setError(e);
      console.log("데이터 가져오기 실패")
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <Error />


  return (
    <ThemeProvider theme={theme}>

      <CssBaseline />
      {routing}

    </ThemeProvider>
  );
}

export default App;
