import React, { lazy } from 'react';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')))
const SamplePage = Loadable(lazy(() => import('../views/utilities/SamplePage')))
const SamplePage1 = Loadable(lazy(() => import('../views/utilities/SamplePage1')))
const Page1 = Loadable(lazy(() => import('../views/utilities/Page1')))
const Page2 = Loadable(lazy(() => import('../views/utilities/Page2')))
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));
const Worker = Loadable(lazy(() => import('../views/utilities/Worker')));




const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/home" /> },
      { path: '/home', exact: true, element: <Dashboard /> },
      { path: '/page1', exact: true, element: <Page1 /> },
      { path: '/healthinfo/:id', exact: true, element: <Worker /> },
      { path: '/page2', exact: true, element: <Page2 /> },
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
