import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import App from './App.jsx'
import './index.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import FormPerson from './pages/persons/FormPerson';
import FormMovie from './pages/movies/FormMovie.jsx';
import MovieDashBoard from './pages/admin/movies/MovieDashboard.jsx';
import PersonDashboard from './pages/admin/persons/PersonDashboard.jsx';
import PhotoPerson from './pages/admin/persons/PhotoPerson.jsx';
import '@fortawesome/fontawesome-free/css/all.min.css';
import PhotoMovie from './pages/admin/movies/PhotoMovie.jsx';

import CastForm from './pages/admin/cast/CastForm.jsx';
import Movielist from './pages/movies/MovieList.jsx';
import DetailMovie from './pages/movies/DetailMovie.jsx';
import DetailMovieAdmin from './pages/admin/movies/DetailMovieAdmin.jsx';
import DetailPerson from './pages/persons/DetailPerson.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Movielist />,
  },
  {
    path: "/movies",
    element: <Movielist />,
  },
  {
    path: "/movies/:id/detail",
    element: <DetailMovie />,
  },
  {
    path: "/movies/detailPerson/:id",
    element: <DetailPerson />,
  },
  {
    path: "/admin/movies/create",
    element: <FormMovie />,
  },
  {
    path: "/admin/movies/:id",
    element: <FormMovie />,
  },
  {
    path: "/admin/persons/create",
    element: <FormPerson />,
  },
  {
    path: "/admin/persons/:id",
    element: <FormPerson />,
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/movies",
    element: <MovieDashBoard />,
  },
  {
    path: "/admin/movies/:id/detail",
    element: <DetailMovieAdmin />,
  },
  {
    path: "/admin/movies/:id/detail/actor",
    element: <CastForm />,
  },
  {
    path: "/admin/persons",
    element: <PersonDashboard />,
  },{
    path: "/admin/persons/:id/photo",
    element: <PhotoPerson />,
  },
  {
    path: "/admin/movies/:id/photo",
    element: <PhotoMovie />,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
