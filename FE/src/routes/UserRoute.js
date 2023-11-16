
import {
    createBrowserRouter,
    createRoutesFromElements,
    createHashRouter,
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
} from '~/pages';
import { BookEntity, UserEntity, PostEntity } from '~/entity';
import { mapToClass } from '~/helper/mappingToClass';
import { useDispatch } from 'react-redux';
import { getListFriendRequest, getListFriend, getAllMyBook, get50TopBookAsync } from '~/slices/user';
import { searchBookByIdAsync } from '~/slices/book';
import { ProtectedRoute, ModelReviewPost, TheAutofillItem, RootLayout, AuthorsLayout, GeneralLayout, SearchResultLayout } from '~/components';
const UserRoute = () => {
    const dispatch = useDispatch()
    return <><Route path="friend-req-search-people" element={<FriendRequestSearchPeoplePage />} loader={() => {
        return dispatch(getListFriendRequest())
            .unwrap()
            .then(async (data) => {
                console.log(data);
                return data ? data : [];
            })
            .catch(e => {
                console.log(e);
                return [];
            });

    }} /><Route path="users" element={<GeneralLayout />}>
            <Route
                index
                element={<UserHomePage />} />


            <Route
                path="fill-infor"
                element={<UserDeclareInformationPage />} />
            <Route
                path="profile"
                element={<GeneralProfile />} />
            <Route
                path="my-bookshelf"
                element={<MyBookshelf />}
                loader={() => {
                    return dispatch(getAllMyBook())
                        .unwrap()
                        .then(async (data) => {
                            console.log(data);
                            return data ? mapToClass(data, BookEntity) : [];
                        })
                        .catch(e => {
                            console.log(e);
                            return [];
                        });

                }} />

            <Route path="review">
                <Route
                    path="edit/:bookId"
                    element={<ModelReviewPost />}
                    loader={({ params }) => {

                        return dispatch(searchBookByIdAsync({ id: params.bookId }))
                            .unwrap()
                            .then(async (data) => {
                                return data;
                            })
                            .catch(e => {
                                return e.messege;
                            });

                    }} />
                <Route
                    path="show/:bookId"
                    element={<ModelReviewPost />}
                    loader={({ params }) => {

                        return dispatch(searchBookByIdAsync({ id: params.bookId }))
                            .unwrap()
                            .then(async (data) => {
                                return data;
                            })
                            .catch(e => {
                                return e.messege;
                            });

                    }} />
            </Route>
        </Route></>



}

export default UserRoute
