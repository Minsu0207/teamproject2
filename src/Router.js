import React, { lazy } from 'react';
import Loadable from './components/Loadable';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('./components/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('./components/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('./views/Pages/Dashboard')))
const Page2 = Loadable(lazy(() => import('./views/Pages/Page2')))
const Error = Loadable(lazy(() => import('./views/authentication/Error')));
const Register = Loadable(lazy(() => import('./views/authentication/Register')));
const Login = Loadable(lazy(() => import('./views/authentication/Login')));
const Worker = Loadable(lazy(() => import('./views/Pages/Worker')));




const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/auth/login" replace={true} /> }, // 수정됨
      { path: '/home', exact: true, element: <Dashboard /> },
      { path: '/page2', exact: true, element: <Page2 /> },
      { path: '/healthinfo/:id', exact: true, element: <Worker /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];


export default Router;