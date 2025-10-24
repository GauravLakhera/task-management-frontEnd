import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import ProjectDetails from './pages/Projects/ProjectDetails';

import { Toaster } from 'react-hot-toast';
import './index.css';
import ReduxProvider from './store/redux/reduxProvider';
import Task from './pages/Task/Task';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Login /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/project/:projectId', element: <ProjectDetails /> },
        { path: '/task', element: <Task /> }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReduxProvider>
      <Toaster position='top-right' reverseOrder={false} />
      <RouterProvider router={router} />
    </ReduxProvider>
  </React.StrictMode>
);
