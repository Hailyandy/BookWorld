import { Outlet, NavLink, useLocation, Link, Route, Routes } from "react-router-dom"
// import Breadcrumbs from "../components/Breadcrumbs"
import { Header } from "shared"
import { useEffect, useState } from "react"
import { Alert, Breadcrumb } from 'antd';
import tokenService from "services/token.service"
import BSHAREnum from "helper/BSHAREenum"
import './css/rootlayout.css'
const breadcrumbNameMap = {
    '/authors': 'Danh sách tác giả',
    '/select-fav-book': 'Chọn sách',
    '/apps/2': 'Application2',
    '/apps/1/detail': 'Detail',
    '/apps/2/detail': 'Detail',
};
export default function RootLayout() {
    const [isSignIn, setIsSignIn] = useState(tokenService.getUser())
    const [headerType, setHeaderType] = useState(BSHAREnum.headerType.not_sign_in)
    useEffect(() => {
        console.log(isSignIn)
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

            <div className="center-horizontal" style={{ height: '5%', backgroundColor: '#F6F6F6' }} >

                <Breadcrumb items={breadcrumbItems} />
            </div>
            <main style={{ height: '85%', backgroundColor: '#30edd8' }}>
                <Outlet />
            </main>
        </div>
    )
}
