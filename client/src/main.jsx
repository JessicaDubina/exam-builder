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
import TakeExam from './pages/TakeExam.jsx';
import StudentList from './pages/StudentList.jsx';
import CreateExam from './pages/CreateExam';
import CreateQuestion from './pages/CreateQuestion';
import Exams from './pages/Exams.jsx'

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
        path: '/instructor',
        element: <InstLanding />
      },
      {
        path: '/student',
        element: <StudentLanding />
      } ,
      {
        path: '/exam/:examId',
        element: <TakeExam />
      },
      {
        path: '/students',
        element: <StudentList />
      },
      {
        path: '/createexam',
        element: <CreateExam />
      },
      {
        path: '/createquestion',
        element: <CreateQuestion />
      },
      {
        path: '/exams',
        element: <Exams />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
