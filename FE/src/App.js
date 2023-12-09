
import './App.css';
import { Layout, Space, Card, List, Avatar, Button, Input, Tooltip, AutoComplete } from 'antd';
import { ConfigContext } from './context/GlobalContext';
import tokenService from './services/token.service';
import { useEffect, useState, } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  createHashRouter,
  Route,
  RouterProvider
} from 'react-router-dom'
import {
  Admins,
  AuthorBook,
  UserCreatedPost,
  QuizPage,
  AdminDashBoard, AdminPostList, AdminReportList, AdminAddBookPage,
  BookMarket,
  AnonymousUser,
  BookRankPage,
  SearchFriendPage,
  SearchUserPage,
  FriendRequestSearchPeoplePage,
  UserDeclareInformationPage,
  UserHomePage, RegisterPage, LoginPage, AuthorsError, HomePage, OtpCode, SearchBookPage, BookDetailPage, AuthorInformationPage, NotFoundPage, GeneralProfile, BookMarketPage, MyBookshelf
} from './pages';
import { ProtectedRoute, ModelReviewPost, TheAutofillItem, RootLayout, AuthorsLayout, GeneralLayout, SearchResultLayout } from './components';
import { searchBookByNameOrAuthor, getAllGenresBookAsync, } from './slices/book';
import { searchUserByName, getAllReportPdfAsync, getAllSuggestBookAsync, getAllPostAsync, statisticAsync } from './slices/user';
//page mẫu, gọi api luôn khi chạy vào route này, cần tham khảo nên để import ra ngoài
import Authors from './pages/Author/Authors';
import { useDispatch } from 'react-redux';
import { searchBookByIdAsync } from './slices/book';
import { getUserInformationAsync, getCurrentUserPostListAsync, getUserTopScoreByBookIdAsync, getListBookOfAuthorAsync, getUserPostListAsync, getListFriendRequest, getListFriend, getAllMyBook, get50TopBookAsync, getAllAuthorsAsync, getListQuizByBookIdAsync } from './slices/user';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { mapToClass } from './helper/mappingToClass';
import { BookEntity, UserEntity, PostEntity } from './entity';

import {
  AdminRoute,
  UserRoute,
  BookRoute,
  AuthorRout
} from './routes';
import CreateTestPage from './pages/quiz/CreateTestPage';
import BSHAREnum from './helper/BSHAREenum';

function App() {
  const [reload, setReload] = useState(0);
  const dispatch = useDispatch()
  const userRoleArray = tokenService.getRole()
  /** @type {*} */
  const router = createBrowserRouter(
    createRoutesFromElements(
      //Sửa lại để test component tí ấy mà
      <>
        <Route path="/" element={<RootLayout />}>
          {/* HomePage */}
          <Route index element={<HomePage />} />
          {/* <Route path="select-fav-book" element={<SelectFavouritebook />} /> */}
          {/* <QuizPage /> */}


          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="otp-confirmation/:username" element={<OtpCode />} />
          {
            /**
             * user root
            */
            tokenService.getRole(BSHAREnum.roles.user) && (
              <>
                <Route path={`/${tokenService.getUserRoleName()}`} element={<GeneralLayout />}>
                  <Route
                    index
                    element={<UserHomePage />}
                    loader={async () => {
                      var data = { listFriendRequest: [], userPost: [], suggestionBooks: [], currentReadingBooks: [], favouriteBooks: [], friends: [] }
                      data.listFriendRequest = await dispatch(getListFriendRequest('not param'))
                        .unwrap()
                        .then(async data => {
                          console.log('get all friend req success')
                        })
                        .catch(e => {
                          console.log(e);
                          console.log('get all friend req erroer')
                        })

                      data.suggestionBooks = await dispatch(getAllSuggestBookAsync())
                        .unwrap()
                        .then(async data => {
                          console.log(data)
                          return data ? mapToClass(data, BookEntity) : [];
                        })
                        .catch(e => {
                          console.log(e);
                          return []
                        })

                      data.friends = await dispatch(getListFriend())
                        .unwrap()
                        .then(async data => {
                          console.log(data)
                          return data ? data : [];
                        })
                        .catch(e => {
                          console.log(e);
                          return []
                        })

                      data.currentReadingBooks = await dispatch(getAllMyBook())
                        .unwrap()
                        .then(async data => {
                          console.log(data)
                          return data ? mapToClass(data, BookEntity) : [];
                        })
                        .catch(e => {
                          console.log(e);
                          return []
                        })
                      data.favouriteBooks = await dispatch(get50TopBookAsync())
                        .unwrap()
                        .then(async data => {
                          console.log(data)
                          return data ? mapToClass(data, BookEntity) : [];
                        })
                        .catch(e => {
                          console.log(e);
                        })

                      data.userPost = await dispatch(getAllPostAsync())
                        .unwrap()
                        .then(async data => {
                          console.log(data)
                          return data ? data : [];
                        })
                        .catch(e => {
                          console.log(e);
                        })
                      return data
                    }}
                  // errorElement={<AuthorsError />}
                  />

                  <Route path="user-post-list" element={<UserCreatedPost />}
                    loader={async () => {
                      var data = { userPost: [] }
                      data.userPost = await dispatch(getUserPostListAsync({ userId: tokenService.getUser().id }))
                        .unwrap()
                        .then(async data => {
                          console.log(data)
                          return data ? data.data : [];
                        })
                        .catch(e => {
                          console.log(e);
                        })
                      return data


                    }} />

                  <Route path="friend-req-search-people" element={<FriendRequestSearchPeoplePage />}
                    loader={() => {
                      return dispatch(getListFriendRequest())
                        .unwrap()
                        .then(async data => {
                          console.log(data)
                          return data ? data : [];
                        })
                        .catch(e => {
                          console.log(e);
                          return []
                        })

                    }} />
                  <Route
                    path="fill-infor"
                    element={<UserDeclareInformationPage />}
                  // loader={authorDetailsLoader}
                  />

                  <Route
                    path="profileOther/:idUser"
                    element={<GeneralProfile />}
                    // loader={authorDetailsLoader}

                    loader={async ({ params }) => {
                      let data = { userInfor: '', postList: [] }
                      data.postList = await dispatch(getUserPostListAsync({ userId: params.idUser }))
                        .unwrap()
                        .then(async data => {
                          console.log(data)
                          return data ? data.data : [];
                        })
                        .catch(e => {
                          console.log(e);
                          return []
                        })
                      data.userInfor = await dispatch(getUserInformationAsync({ idUser: params.idUser }))
                        .unwrap()
                        .then(async data => {
                          console.log(data)
                          return data ? data.data : [];
                        })
                        .catch(e => {
                          console.log(e);
                          return []
                        })
                      return data
                    }}
                  />
                  <Route path="my-bookshelf" element={<GeneralLayout />} >
                    <Route
                      index
                      element={<MyBookshelf />}
                      loader={() => {
                        return dispatch(getAllMyBook())
                          .unwrap()
                          .then(async data => {
                            console.log(data)
                            return data ? mapToClass(data, BookEntity) : [];
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
                  </Route>
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
                          return data ? mapToClass(data, BookEntity) : [];
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
                      loader={async ({ params }) => {
                        let data = { bookDetail: [], comment: [], userTopScore: [] }

                        data.bookDetail = await dispatch(searchBookByIdAsync({ id: params.bookId }))
                          .unwrap()
                          .then(async data => {
                            return data ? data : [];
                          })
                          .catch(e => {
                            return []
                          });
                        data.userTopScore = await dispatch(getUserTopScoreByBookIdAsync({ idBook: params.bookId }))
                          .unwrap()
                          .then(async data => {
                            return data ? data.data : [];
                          })
                          .catch(e => {
                            return []
                          });
                        return data
                      }}
                    >
                    </Route>
                    <Route path="fun-quiz/:idBook" element={<QuizPage />}
                      loader={({ params }) => {
                        return dispatch(getListQuizByBookIdAsync({ idBook: params.idBook }))
                          .unwrap()
                          .then(async data => {
                            console.log(data)
                            return data ? data : [];
                          })
                          .catch(e => {
                            console.log(e);
                            return []
                          })

                      }} />
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
                  <Route path="search-result" element={<SearchResultLayout />}>
                    <Route path="search-book/:searchBooktext" element={<SearchBookPage />} loader={({ params }) => {
                      return dispatch(searchBookByNameOrAuthor({ param: { page: 0, size: 5 }, name: params.searchBooktext }))
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
                          return data ? data : [];
                        })
                        .catch(e => {
                          console.log(e);
                        })
                    }}
                    />
                  </Route>
                </Route >

              </>

            )
          }
          {
            tokenService.getRole(BSHAREnum.roles.admin) && (
              <Route path={`/${tokenService.getUserRoleName()}`} element={<GeneralLayout />}>
                <Route
                  index
                  element={<Admins />}
                // loader={authorsLoader}
                // errorElement={<AuthorsError />}
                />
                <Route
                  path="statistic-post-list"
                  element={<AdminDashBoard />}
                  loader={() => {
                    return dispatch(statisticAsync({ year: 2023 }))
                      .unwrap()
                      .then(async data => {
                        console.log(data)
                        return data ? data.data : [];
                      })
                      .catch(e => {
                        console.log(e);
                        return []
                      })

                  }}
                />
                <Route
                  path="statistic-report-post"
                  element={<AdminReportList />
                  }
                  loader={() => {
                    return dispatch(getAllReportPdfAsync())
                      .unwrap()
                      .then(async data => {
                        console.log(data)
                        return data ? data : [];
                      })
                      .catch(e => {
                        console.log(e);
                        return []
                      })

                  }}
                />
                <Route
                  path="add-new-book"
                  element={<AdminAddBookPage />}
                  loader={async () => {
                    var data = { genres: [], authors: [] }
                    data.genres = await dispatch(getAllGenresBookAsync())
                      .unwrap()
                      .then(async data => {
                        console.log(data)
                        return data ? data : [];
                      })
                      .catch(e => {
                        console.log(e);
                        return []
                      })

                    data.authors = await dispatch(getAllAuthorsAsync())
                      .unwrap()
                      .then(async data => {
                        console.log(data)
                        return data ? data : [];
                      })
                      .catch(e => {
                        console.log(e);
                        return []
                      })
                    return data
                  }}
                />
              </Route>
            )
          }
          {
            tokenService.getRole(BSHAREnum.roles.author) && (
              <Route path={`/${tokenService.getUserRoleName()}`} element={<AuthorsLayout />} >
                <Route
                  index
                  element={<Authors />}
                // loader={authorsLoader}
                // errorElement={<AuthorsError />}
                />
                <Route path="create-test/:idBook" element={<CreateTestPage />} loader={async ({ params }) => {
                  return dispatch(getListQuizByBookIdAsync({ idBook: params.idBook }))
                    .unwrap()
                    .then(async data => {
                      console.log(data)
                      return data ? data : [];
                    })
                    .catch(e => {
                      console.log(e);
                      return []
                    })
                }} />
                <Route path="author-created-book" element={<AuthorBook />} loader={async () => {
                  return dispatch(getListBookOfAuthorAsync())
                    .unwrap()
                    .then(async data => {
                      console.log(data)
                      return data ? mapToClass(data.data, BookEntity) : [];
                    })
                    .catch(e => {
                      console.log(e);
                      return []
                    })
                }} />

                <Route
                  path="created-book"
                  element={<BookMarket />}
                // loader={authorDetailsLoader}
                />
                <Route
                  path=":id"
                  element={<AuthorInformationPage />}
                // loader={authorDetailsLoader}
                />
                <Route
                  path="profile"
                  element={<GeneralProfile />}
                  loader={async () => {
                    let data = { userInfor: '', postList: [] }
                    data.postList = await dispatch(getUserPostListAsync({ userId: tokenService.getUser().id }))
                      .unwrap()
                      .then(async data => {
                        console.log(data)
                        return data ? data.data : [];
                      })
                      .catch(e => {
                        console.log(e);
                        return []
                      })
                    data.userInfor = await dispatch(getUserInformationAsync({ idUser: tokenService.getUser().id }))
                      .unwrap()
                      .then(async data => {
                        console.log(data)
                        return data ? data.data : [];
                      })
                      .catch(e => {
                        console.log(e);
                        return []
                      })
                    return data
                  }}
                />
                <Route path="books">
                  <Route
                    path=":bookId"
                    element={<BookDetailPage />}
                    loader={async ({ params }) => {
                      let data = { bookDetail: [], comment: [], userTopScore: [] }

                      data.bookDetail = await dispatch(searchBookByIdAsync({ id: params.bookId }))
                        .unwrap()
                        .then(async data => {
                          return data ? data : [];
                        })
                        .catch(e => {
                          return []
                        });
                      data.userTopScore = await dispatch(getUserTopScoreByBookIdAsync({ idBook: params.bookId }))
                        .unwrap()
                        .then(async data => {
                          return data ? data.data : [];
                        })
                        .catch(e => {
                          return []
                        });
                      return data
                    }}
                  >
                  </Route>
                </Route >
                <Route path="user-post-list" element={<UserCreatedPost />}
                  loader={async () => {
                    var data = { userPost: [] }
                    data.userPost = await dispatch(getUserPostListAsync({ userId: tokenService.getUser().id }))
                      .unwrap()
                      .then(async data => {
                        console.log(data)
                        return data ? data.data : [];
                      })
                      .catch(e => {
                        console.log(e);
                      })
                    return data


                  }} />
              </Route>
            )
          }
          <Route path="*" element={<NotFoundPage />} />
        </Route >
      </>

    )
  )

  const reloadApp = () => setReload(prev => prev + 1);
  let valueContext = {
    reloadAppB: reloadApp,
    stompClient: null
  }
  return (

    <ConfigContext.Provider value={valueContext}>
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
