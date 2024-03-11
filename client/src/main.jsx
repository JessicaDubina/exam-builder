import { createBrowserRouter, RouterProvider } from 'react-router-dom/dist'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import Signup from './pages/Signup';
import Login from './pages/Login';
import Error from './pages/Error';
import Home from './pages/Home.jsx';
import InstLanding from './pages/InstLanding.jsx';
import StudentLanding from './pages/StudentLanding.jsx';
import NewExam from './pages/NewExam.jsx';
import StudentList from './pages/StudentList.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      }, 
      {
        path: '/login',
        element: <Login />
      }, 
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/InstLanding',
        element: <InstLanding />
      },
      {
        path: '/StudentLanding',
        element: <StudentLanding />
      } ,
      {
        path: '/NewExam',
        element: <NewExam />
      },
      {
        path: '/StudentList',
        element: <StudentList />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
