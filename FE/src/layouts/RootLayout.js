import { Outlet, NavLink, useLocation, Link, Route, Routes } from "react-router-dom"
// import Breadcrumbs from "../components/Breadcrumbs"
import { Header } from "~/shared"
import { useEffect, useState, useContext } from "react"
import { Breadcrumb, Layout, Space, Card, List, Avatar, Button, Input, Tooltip, AutoComplete } from 'antd';
import tokenService from "~/services/token.service"
import BSHAREnum from "~/helper/BSHAREenum"
import './css/rootlayout.css'

import { BookService } from "~/services/book.service";
import { useSelector } from 'react-redux';
import { getListFriendRequest, receiveFriendRequestFromSocket } from "~/slices/user";
import { useDispatch } from 'react-redux';
import { updateLocalHostUrl } from "~/helper/BSHAREresource";
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { ConfigContext } from "~/context/GlobalContext";

// import { connect } from '~/helper/socket';
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
    '/authors/slug': 'Trang cá nhân',

    //admin
    '/statistic-post-list': 'Các bài đăng',
    '/statistic-report-post': 'Nội dung báo cáo',
};

const newBreadcrumbNameMap = {};
// Loop over the keys of the original object
for (let key of Object.keys(breadcrumbNameMap)) {
    // Add the text before the key and assign the same value
    newBreadcrumbNameMap[`${tokenService.getUserRoleName()}${key}`] = breadcrumbNameMap[key];
}
export var stompClient = null;
export default function RootLayout() {
    const dispatch = useDispatch()
    const contextContent = useContext(ConfigContext);
    const [friendRequestCount, setFriendRequestCount] = useState(0)
    const userStateFormSlice = useSelector(state => state.users);
    // updateLocalHostUrl(tokenService.getUserRoleName())
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

    /**
     * Let's say we are on the URL https://developer.mozilla.org/en-US/docs/Web/API/Location/pathname#examples
     * console.log(location.pathname); // '/en-US/docs/Web/API/Location/pathname'
    */
    /**
     * https://hailyandy.github.io/BookWorld/ROLE_ADMIN/statistic-report-post => ['',ROLE_ADMIN,statistic-report-post]
     * filter 1: ['',statistic-report-post]
     * filter 2: [statistic-report-post]
     * mapping với các đường dẫn của breadcrumbNameMap nên phải chỉnh lại. Do thêm tokenservice.getRoleUser vào
     */
    const pathSnippets = location.pathname.split('/').filter((item, index) => {
        // Check if last item is slug
        console.log(index)
        return index != 1

    }).filter((item) => {
        return item != ''
    });


    // console.log(pathSnippets)
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
            title: <Link to={
                `/${tokenService.getUserRoleName()}${url}`}>{breadcrumbNameMap[url]}</Link>,
        };
    });

    const breadcrumbItems = [
        {
            title: <Link to={`/${tokenService.getUserRoleName()}`}>Trang chủ</Link>,
            key: 'home',
        },
    ].concat(extraBreadcrumbItems);
    useEffect(() => {
        if (isSignIn) {
            connect()
        }
        console.log('connectsocket')
    }, [isSignIn])


    function connect() {
        let Sock = new SockJS('https://book-world-0f7cf4c7e1a0.herokuapp.com/chat');
        let headers = {
            "Content-Type": "application/json",
            "Authorization": `${tokenService.getLocalAccessToken()}`,
            "Access-Control-Allow-Origin": "*"
        }
        contextContent.stompClient = Stomp.over(Sock);
        contextContent.stompClient.connect(headers, function (frame) {
            console.log('Connected: ' + frame);
            contextContent.stompClient.subscribe(`/user/${tokenService.getUser().id}/queue/friend/request/total`, onMessageReceived);
        });

    }

    const onMessageReceived = (payload) => {
        var payloadData = JSON.parse(payload.body);
        //1
        setFriendRequestCount(payloadData.data)
        // dispatch(receiveFriendRequestFromSocket(payloadData.data))

    }
    return (
        <div className="root-layout" >
            <Header friendRequestCount={friendRequestCount} headerType={isSignIn ? BSHAREnum.headerType.signed_in : BSHAREnum.headerType.not_sign_in} reloadRootLayout={setIsSignIn}></Header>
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
