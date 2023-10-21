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
const breadcrumbNameMap = {
    '/book-market': 'Chợ sách',
    '/authors': 'Danh sách tác giả',
    '/select-fav-book': 'Chọn sách',
    '/register': 'Đăng ký',
    '/login': 'Đăng nhập',
    '/users': 'Người dùng',
    '/users/fill-infor': 'Nhập thông tin',
    '/search': 'Tìm kiếm',
    '/otp-confirmation': 'Xác nhận OTP',

};



export default function RootLayout() {
    const config = useContext(ConfigContext);
    // let a = new BookService()
    // console.log(a.endPoint)
    const [reload, setReload] = useState(0);

    const reloadApp = () => setReload(prev => prev + 1);
    const [isSignIn, setIsSignIn] = useState(tokenService.getUser())
    const [headerType, setHeaderType] = useState(BSHAREnum.headerType.not_sign_in)
    useEffect(() => {
        console.log(isSignIn)
        reloadApp()
        config()
    }, [isSignIn])

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
            <Header headerType={BSHAREnum.headerType.not_sign_in}></Header>
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
