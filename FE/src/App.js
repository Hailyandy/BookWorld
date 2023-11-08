
import './App.css';
import { Layout, Space, Card, List, Avatar, Button, Input, Tooltip, AutoComplete } from 'antd';
import { ConfigContext } from './context/GlobalContext';
import tokenService from './services/token.service';
import { useState, } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import {
  BookMarket,
  AnonymousUser,
  BookRankPage,
  SearchFriendPage,
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
import { getListFriendRequest, getListFriend, getAllMyBook, get50TopBookAsync } from './slices/user';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
function App() {
  const [reload, setReload] = useState(0);
  const dispatch = useDispatch()
  const userRoleArray = tokenService.getRoleUser()
  // console.log(userRoleArray)
  const router = createBrowserRouter(
    createRoutesFromElements(
      //Sửa lại để test component tí ấy mà
      <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="select-fav-book" element={<SelectFavouritebook />} />
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
          {/* random user online */}
          <Route path="search-user/:searchText" element={<SearchUserPage />} loader={({ params }) => {
            return dispatch(searchUserByName({ name: params.searchText }))
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

          {/* only friend search */}
          <Route path="search-friend" element={<SearchFriendPage />} loader={() => {
            return dispatch(getListFriend())
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
            <>
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
                  path="my-bookshelf"
                  element={<MyBookshelf />}
                  loader={() => {
                    return dispatch(getAllMyBook())
                      .unwrap()
                      .then(async data => {
                        console.log(data)
                        return data;
                      })
                      .catch(e => {
                        console.log(e);
                        return []
                      })

                  }}
                // loader={authorDetailsLoader}
                />

                <Route path="review" >
                  <Route
                    path="edit/:bookId"
                    element={<ModelReviewPost />}
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
                    path="show/:bookId"
                    element={<ModelReviewPost />}
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
                </Route>
              </Route >
            </>

          )
        }
        <Route path="books">
          <Route
            index
            element={<UserHomePage />}
          // loader={authorsLoader}
          // errorElement={<AuthorsError />}
          />
          <Route path="book-rank" element={<BookRankPage />} loader={() => {
            return dispatch(get50TopBookAsync())
              .unwrap()
              .then(async data => {
                console.log(data)
                return data;
              })
              .catch(e => {
                console.log(e);
              })
          }} />
          <Route
            path="hidden-book"
            element={<AnonymousUser />}
          // loader={authorDetailsLoader}
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
            element={<BookMarket />}
          // loader={authorDetailsLoader}
          />
          <Route
            path="create-market-item"
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
