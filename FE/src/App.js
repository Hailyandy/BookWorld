
import './App.css';
import { SearchPage, BookDetailPage, SelectFavouritebook, AuthorInformationPage, NotFoundPage, GeneralProfile, BookMarketPage, MyBookshelf } from './pages';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import routes from './components/route/routes';
import RootLayout from './layouts/RootLayout';
import AuthorsLayout from './layouts/AuthorsLayout';
import GeneralLayout from './layouts/AuthorsLayout';
import AuthorInfor from './pages/Author/AuthorInformation';
import AuthorsError from './pages/Author/AuthorsError';
import Authors from './pages/Author/Authors';
import LoginPage from './pages/Login/index';
import RegisterPage from "./pages/Register/index"
import UserPage from './pages/User/index'
import UserHomePage from './pages/UserHome';
import HomePage from './pages/Home/Home';
import { Button, Divider, notification, Space } from 'antd';
import ModelReviewPost from './components/Model/TheModelReviewPost';
import { ConfigContext } from './context/GlobalContext';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import tokenService from './services/token.service';
import { useState } from 'react';


function NotificationHandler() {
  const [api, contextHolder] = notification.useNotification();
  //'topLeft', 'topRight', 'bottomLeft'
  const openNotification = (placement, message) => {
    api.info({
      message: `Notification ${placement}`,
      description:
        message,
      placement,
    });
  };
  return {
    contextHolder, openNotification
  }
}

function App() {
  var notificationHandler = NotificationHandler()
  const [reload, setReload] = useState(0);
  const userRoleArray = tokenService.getRoleUser()
  console.log(userRoleArray)
  const router = createBrowserRouter(
    createRoutesFromElements(
      //Sửa lại để test component tí ấy mà
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="select-fav-book" element={<SelectFavouritebook />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="search" element={<SearchPage />} />
        {
          tokenService.getRoleUser()?.length > 0 && (<Route path="users" element={<GeneralLayout />}>
            <Route
              index
              element={<UserHomePage />}
            // loader={authorsLoader}
            // errorElement={<AuthorsError />}
            />
            <Route
              path="fill-infor"
              element={<UserPage />}
            // loader={authorDetailsLoader}
            />
            <Route
              path="profile"
              element={<GeneralProfile />}
            // loader={authorDetailsLoader}
            />
            <Route
              path="my-bookshelf/:id"
              element={<MyBookshelf />}
            // loader={authorDetailsLoader}
            />
            <Route
              path="my-bookshelf/:id"
              element={<MyBookshelf />}
            // loader={authorDetailsLoader}
            />

            <Route path="review" errorElement={<GeneralLayout />}>
              <Route
                index
                element={<MyBookshelf />}
              />
              <Route
                path="edit/:id"
                element={<ModelReviewPost />}
              // loader={authorDetailsLoader}
              />
              <Route
                path="new/:id"
                element={<ModelReviewPost />}
              // loader={authorDetailsLoader}
              />
              <Route
                path="profile"
                element={<GeneralProfile />}
              // loader={authorDetailsLoader}
              />
            </Route>
          </Route >)
        }
        <Route path="books"  >
          <Route
            index
            element={<UserHomePage />}
          // loader={authorsLoader}
          // errorElement={<AuthorsError />}
          />
          <Route
            path=":id"
            element={<BookDetailPage />}
          // loader={authorDetailsLoader}
          />
          <Route
            path="market"
            element={<BookMarketPage />}
          // loader={authorDetailsLoader}
          />
        </Route >
        <Route path="authors" errorElement={<AuthorsError />}>
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
          <Route
            path="profile"
            element={<GeneralProfile />}
          // loader={authorDetailsLoader}
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route >
    )
  )
  const reloadApp = () => setReload(prev => prev + 1);
  return (

    <ConfigContext.Provider value={reloadApp}>
      <div class="App">
        {notificationHandler.contextHolder}

        {/* <Register /> */}
        {/* <Login /> */}
        {/* <User /> */}
        {/* <SelectFavouritebook /> */}
        {/* <AuthorInformationPage /> */}
        {/* <RouterProvider router={router} /> */}
        <RouterProvider router={router} />
      </div>
    </ConfigContext.Provider>
  );
}

export { App, NotificationHandler };
