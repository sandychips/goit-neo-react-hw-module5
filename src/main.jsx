import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import App from './App';
import './index.css'; // Changed from './styles/global.css' to './index.css'
import { Suspense, lazy } from 'react';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage'));
const MovieCast = lazy(() => import('./components/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('./components/MovieReviews/MovieReviews'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Suspense fallback={<div>Завантаження...</div>}><HomePage /></Suspense>,
      },
      {
        path: 'movies',
        element: <Suspense fallback={<div>Завантаження...</div>}><MoviesPage /></Suspense>,
      },
      {
        path: 'movies/:movieId',
        element: <Suspense fallback={<div>Завантаження...</div>}><MovieDetailsPage /></Suspense>,
        children: [
          {
            path: 'cast',
            element: <Suspense fallback={<div>Завантаження...</div>}><MovieCast /></Suspense>,
          },
          {
            path: 'reviews',
            element: <Suspense fallback={<div>Завантаження...</div>}><MovieReviews /></Suspense>,
          },
        ],
      },
      {
        path: '*',
        element: <Suspense fallback={<div>Завантаження...</div>}><NotFoundPage /></Suspense>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);