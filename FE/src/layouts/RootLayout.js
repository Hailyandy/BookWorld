import { Outlet, NavLink, useLocation, Link, Route, Routes } from "react-router-dom"
// import Breadcrumbs from "../components/Breadcrumbs"
import { Header } from "~/shared"
import { useEffect, useState, useContext } from "react"
import { Alert, Breadcrumb } from 'antd';
import tokenService from "~/services/token.service"
import BSHAREnum from "~/helper/BSHAREenum"
import './css/rootlayout.css'
import { ConfigContext } from "~/context/GlobalContext";
import { BookService } from "~/services/book.service";
import { useSelector } from 'react-redux';
const breadcrumbNameMap = {
    '/book-market': 'Chợ sách',
    '/authors': 'Danh sách tác giả',
    '/select-fav-book': 'Chọn sách',
    '/register': 'Đăng ký',
    '/login': 'Đăng nhập',
    '/search': 'Tìm kiếm',
    '/users': 'Người dùng',
    '/users/fill-infor': 'Nhập thông tin',
    '/otp-confirmation': 'Xác nhận OTP',
    '/users/fill-infor': 'Điền thông tin',
    '/users/profile': 'Profile người dùng',
    '/users/my-bookshelf': 'Tủ sách',
    '/users/review/edit': 'Chỉnh sửa cảm nhận',
    '/users/review/new': 'Tạo bài cảm nhận',
    '/users/fill-infor': 'Điền thông tin',

    '/books': 'Tuyển tập sách',
    '/books/market': 'Chợ sách',

    '/authors': 'Tác giả',
    '/authors/profile': 'Profile Tác giả'
};

export default function RootLayout() {
    const config = useContext(ConfigContext);
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
        if (Object.keys(userStateFormSlice).length !== 0) {
            console.log('user sign in already')
            console.log(userStateFormSlice)
            setIsSignIn(true)
        }
        reloadRootLayout()
        config()
    }, [userStateFormSlice])

    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter((i) => i);
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
            <div className="center-horizontal" style={{ height: '5%', backgroundColor: '#F6F6F6', padding: '0rem 0px 0rem 5rem ' }} >
                <Breadcrumb items={breadcrumbItems} />
            </div>
            <main style={{ height: '85%' }}>
                <Outlet />
            </main>
        </div>
    )
}
