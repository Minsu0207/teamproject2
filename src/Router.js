import React, { lazy } from 'react';
import Loadable from './components/Loadable';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('./components/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('./components/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('./views/Pages/Dashboard')))
const SamplePage = Loadable(lazy(() => import('./views/Pages/SamplePage')))
const SamplePage1 = Loadable(lazy(() => import('./views/Pages/SamplePage1')))
const Page1 = Loadable(lazy(() => import('./views/Pages/Page1')))
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
      { path: '/page1', exact: true, element: <Page1 /> },
      { path: '/page2', exact: true, element: <Page2 /> },
      { path: '/healthinfo/:id', exact: true, element: <Worker /> },
      { path: '/sample-page', exact: true, element: <SamplePage /> },
      { path: '/sample-page1', exact: true, element: <SamplePage1 /> },
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