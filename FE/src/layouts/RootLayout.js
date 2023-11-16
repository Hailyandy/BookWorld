import { Outlet, NavLink, useLocation, Link, Route, Routes } from "react-router-dom"
// import Breadcrumbs from "../components/Breadcrumbs"
import { Header } from "~/shared"
import { useEffect, useState, useContext } from "react"
import { Breadcrumb, Layout, Space, Card, List, Avatar, Button, Input, Tooltip, AutoComplete } from 'antd';
import tokenService from "~/services/token.service"
import BSHAREnum from "~/helper/BSHAREenum"
import './css/rootlayout.css'
import { ConfigContext } from "~/context/GlobalContext";
import { BookService } from "~/services/book.service";
import { useSelector } from 'react-redux';
import { getListFriendRequest } from "~/slices/user";
import { useDispatch } from 'react-redux';
const breadcrumbNameMap = {
    //Fatherless route
    '/book-market': 'Chợ sách',
    '/authors': 'Danh sách tác giả',
    '/select-fav-book': 'Chọn sách',
    '/register': 'Đăng ký',
    '/login': 'Đăng nhập',
    '/otp-confirmation': 'Xác nhận OTP',
    '/friend-req-search-people': 'Lời mời kết bạn',


    //Fatherhas route
    '/search-result': 'Tìm kiếm',
    '/search-result/search-book': 'Tìm kiếm sách',
    '/search-result/search-user': 'Tìm kiếm mọi người',
    '/search-result/search-friend': 'Bạn của tôi',

    //user
    '/users': 'Người dùng',
    '/users/fill-infor': 'Nhập thông tin',
    '/users/fill-infor': 'Điền thông tin',
    '/users/profile': 'Profile người dùng',
    '/users/my-bookshelf': 'Tủ sách',
    '/users/review': 'Cảm nhận',
    '/users/review/edit': 'Chỉnh sửa cảm nhận',
    '/users/review/new': 'Tạo bài cảm nhận',
    '/users/review/show': 'Xem bài cảm nhận',
    '/users/fill-infor': 'Điền thông tin',

    //books
    '/books': 'Tuyển tập sách',
    '/books/hidden-book': 'Sách ẩn danh',
    '/books/slug': 'Chi tiết sách',
    '/books/create-market-item': 'Đăng sản phẩm',
    '/books/book-rank': 'Xếp hạng sách',

    //authors
    '/authors/profile': 'Profile Tác giả',
    '/authors/slug': 'Trang cá nhân'
};

export default function RootLayout() {
    const userStateFormSlice = useSelector(state => state.users);
    console.log(userStateFormSlice)
    // let a = new BookService()
    // console.log(a.endPoint)
    const [reload, setReload] = useState(0);
    const reloadRootLayout = () => setReload(prev => prev + 1);
    const [isSignIn, setIsSignIn] = useState(false)
    const [headerType, setHeaderType] = useState(BSHAREnum.headerType.not_sign_in)

    useEffect(() => {
        console.log(isSignIn)
        if (userStateFormSlice.userInfo) {
            console.log('user sign in already')
            setIsSignIn(true)
        }
        reloadRootLayout()
        // config()
    }, [userStateFormSlice.userInfo, userStateFormSlice.friendReqList])

    const location = useLocation();
    console.log(location.pathname)
    const pathSnippets = location.pathname.split('/').filter((i) => {
        // Check if last item is slug
        return i
    });
    for (let i = 0; i < pathSnippets.length; i++) {
        const isSlug = /^\d+$/.test(pathSnippets[i]);
        // Check for slug
        if (isSlug) {
            pathSnippets[i] = 'slug'; // replace with string
        }

    }
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;

        return {
            key: url,
            title: <Link to={url}>{breadcrumbNameMap[url]}</Link>,
        };
    });
    const breadcrumbItems = [
        {
            title: <Link to="/">Trang chủ</Link>,
            key: 'home',
        },
    ].concat(extraBreadcrumbItems);
    return (
        <div className="root-layout" >
            <Header headerType={isSignIn ? BSHAREnum.headerType.signed_in : BSHAREnum.headerType.not_sign_in} reloadRootLayout={setIsSignIn}></Header>
            {/* <span onClick={() => config('topLeft', 'aaa')}>click me</span> */}
            <div className="center-horizontal" style={{ height: '8%', backgroundColor: 'var(--background-color-white)', padding: '0rem 0px 0rem 5rem' }} >
                <Breadcrumb items={breadcrumbItems} />
            </div>
            <main style={{ backgroundColor: '#f5f5f5', minHeight: 'var(--height-containner-main)' }}>
                <Outlet />
            </main>
        </div>
    )
}