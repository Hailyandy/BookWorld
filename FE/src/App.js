
import './App.css';
import Login from './pages/Login/Login';
import User from './pages/User/User';
import Register from "./pages/Register/Register"

import HeaderLayout from './shared/header/Header';
import { SelectFavouritebook, AuthorInformationPage, NotFoundPage } from './pages';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import RootLayout from 'layouts/RootLayout';
import AuthorsLayout from 'layouts/AuthorsLayout';
import AuthorInfor from 'pages/Author/AuthorInformation';
import AuthorsError from 'pages/Author/AuthorsError';
import Authors from 'pages/Author/Authors';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="select-fav-book" element={<SelectFavouritebook />} />
      <Route path="authors" element={<AuthorsLayout />} errorElement={<AuthorsError />}>
        <Route
          index
          element={<Authors />}
        // loader={authorsLoader}
        // errorElement={<AuthorsError />}
        />
        <Route
          path=":id"
          element={<AuthorInformationPage />}
        // loader={authorDetailsLoader}
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>

  )
)
function App() {
  return (
    <div class="App">
      {/* <Register /> */}
      {/* <Login /> */}
      {/* <User /> */}
      {/* <SelectFavouritebook /> */}
      {/* <AuthorInformationPage /> */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
