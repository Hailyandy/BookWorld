
import './App.css';
import { Button, Divider, notification, Space } from 'antd';
import { ConfigContext } from './context/GlobalContext';
import tokenService from './services/token.service';
import { useState } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import {
  FriendRequestSearchPeoplePage,
  UserDeclareInformationPage,
  UserHomePage, RegisterPage, LoginPage, AuthorsError, HomePage, OtpCode, SearchBookPage, BookDetailPage, SelectFavouritebook, AuthorInformationPage, NotFoundPage, GeneralProfile, BookMarketPage, MyBookshelf
} from './pages';
import { ProtectedRoute, ModelReviewPost, TheAutofillItem, RootLayout, AuthorsLayout, GeneralLayout } from './components';

//page mẫu, gọi api luôn khi chạy vào route này, cần tham khảo nên để import ra ngoài
import Authors from './pages/Author/Authors';


function App() {

  const [reload, setReload] = useState(0);
  const userRoleArray = tokenService.getRoleUser()
  console.log(userRoleArray)
  const router = createBrowserRouter(
    createRoutesFromElements(
      //Sửa lại để test component tí ấy mà
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="select-fav-book" element={<SelectFavouritebook />} />
        <Route path="friend-req-search-people" element={<FriendRequestSearchPeoplePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="search-book" element={<SearchBookPage />} />
        <Route path="otp-confirmation/:username" element={<OtpCode />} />
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
              element={<UserDeclareInformationPage />}
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
            </Route>
          </Route >)
        }
        <Route path="books">
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
      <div id='app'>

        {/* <Register /> */}
        {/* <Login /> */}
        {/* <User /> */}
        {/* <SelectFavouritebook /> */}
        {/* <AuthorInformationPage /> */}
        {/* <RouterProvider router={router} /> */}
        <RouterProvider router={router} />
        <div id="loading" class="loading">
          Loading&#8230;
        </div>
      </div>
    </ConfigContext.Provider>
  );
}

export { App };
