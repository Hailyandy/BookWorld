
import './App.css';
import { Layout, Space, Card, List, Avatar, Button, Input, Tooltip, AutoComplete } from 'antd';
import { ConfigContext } from './context/GlobalContext';
import tokenService from './services/token.service';
import { useState, } from 'react';
import {
  createBrowserRouter,
  createHashRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import {
  SearchUserPage,
  FriendRequestSearchPeoplePage,
  UserDeclareInformationPage,
  UserHomePage, RegisterPage, LoginPage, AuthorsError, HomePage, OtpCode, SearchBookPage, BookDetailPage, SelectFavouritebook, AuthorInformationPage, NotFoundPage, GeneralProfile, BookMarketPage, MyBookshelf
} from './pages';
import { ProtectedRoute, ModelReviewPost, TheAutofillItem, RootLayout, AuthorsLayout, GeneralLayout, SearchResultLayout } from './components';
import { searchBookByNameOrAuthor } from './slices/book';
import { searchUserByName } from './slices/user';
//page mẫu, gọi api luôn khi chạy vào route này, cần tham khảo nên để import ra ngoài
import Authors from './pages/Author/Authors';
import { useDispatch } from 'react-redux';
import { searchBookByIdAsync } from './slices/book';
import { getListFriendRequest } from './slices/user';
import { useNavigate } from 'react-router-dom';
function App() {
  const [reload, setReload] = useState(0);
  const dispatch = useDispatch()
  const userRoleArray = tokenService.getRoleUser()
  // console.log(userRoleArray)
  const router = createHashRouter(
    createRoutesFromElements(
      //Sửa lại để test component tí ấy mà
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="select-fav-book" element={<SelectFavouritebook />} />
        <Route path="friend-req-search-people" element={<FriendRequestSearchPeoplePage />} loader={() => {

          return dispatch(getListFriendRequest())
            .unwrap()
            .then(async data => {
              console.log(data)
              return data;
            })
            .catch(e => {
              console.log(e);
              return []
            })

        }} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="search-result" element={<SearchResultLayout />}>
          <Route path="search-book/:searchBooktext" element={<SearchBookPage />} loader={({ params }) => {
            return dispatch(searchBookByNameOrAuthor({ name: params.searchBooktext }))
              .unwrap()
              .then(async data => {
                console.log(data)
                return data;
              })
              .catch(e => {
                console.log(e);
              })
          }}
          />

          <Route path="search-user/:searchUsertext" element={<SearchUserPage />} loader={({ params }) => {
            return dispatch(searchUserByName({ name: params.searchUsertext }))
              .unwrap()
              .then(async data => {
                console.log(data)
                return data;
              })
              .catch(e => {
                console.log(e);
              })
          }}
          />
        </Route>

        <Route path="otp-confirmation/:username" element={<OtpCode />} />
        {
          tokenService.getRoleUser()?.length > 0 && (
            <Route path="users" element={<GeneralLayout />}>
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
            path=":bookId"
            element={<BookDetailPage />}
            loader={({ params }) => {

              return dispatch(searchBookByIdAsync({ id: params.bookId }))
                .unwrap()
                .then(async data => {
                  return data;
                })
                .catch(e => {
                  return e.messege
                });

            }}
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
