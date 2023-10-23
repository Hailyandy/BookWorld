
import { SearchBookPage, BookDetailPage, SelectFavouritebook, AuthorInformationPage, NotFoundPage, GeneralProfile, BookMarketPage, MyBookshelf } from '~/pages'
import {
    RootLayout,
    AuthorsLayout,
    GeneralLayout,
    AuthorInfor,
    AuthorsError,
    Authors,
    LoginPage,
    RegisterPage,
    UserDeclareInformationPage,
    UserHomePage,
    HomePage,
    ModelReviewPost,
} from '~/components'
// routes.js
const routes = {
    author: [
        {
            index: true,
            element: <UserHomePage />
        },
        {
            path: 'fill-infor',
            element: <UserDeclareInformationPage />
        },
        {
            path: 'profile',
            element: <GeneralProfile />
        },
        {
            path: 'my-bookshelf/:id',
            element: <MyBookshelf />
        },
        {
            path: 'review',
            element: <GeneralLayout />,
            children: [
                {
                    index: true,
                    element: <MyBookshelf />
                },
                {
                    path: 'edit/:id',
                    element: < ModelReviewPost />

                },
                {
                    path: 'new/:id',
                    element: < ModelReviewPost />

                },
                {
                    path: 'profile',
                    element: < GeneralProfile />
                }
            ]
        }
    ],
    user: [
        // {
        //     index: true,
        //     element: <UserDashboard />
        // },
        // {
        //     path: '/account',
        //     element: <UserAccount />
        // }
    ]
}
export default routes
