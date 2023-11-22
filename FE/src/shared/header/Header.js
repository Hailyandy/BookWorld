import React, { useState, useCallback } from 'react';
import TheAutofillItem from '~/components/autoFill/TheAutoFillitem'
import { Badge, Breadcrumb, Layout, Menu, theme, Input, Button, Dropdown, Space, message, Avatar, AutoComplete, Result, Typography } from 'antd';
import { DownOutlined, UserOutlined, HomeOutlined, LogoutOutlined, TeamOutlined } from '@ant-design/icons';
import "../css/header.css"
import BSHAREnum from "~/helper/BSHAREenum"
import BSHAREresource from '~/helper/BSHAREresource';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { searchBookByNameOrAuthor } from '~/slices/book';
import { logout, getListFriend } from '~/slices/user';
import tokenService from '~/services/token.service';
import { debounce } from '~/helper/debounce';
import { NotFoundPage } from '~/pages';
import { useSelector } from 'react-redux';
const { Search } = Input;
const { Header, Content, Footer } = Layout;


const { Paragraph, Text } = Typography;
//props == BSHAREnum.headerType, vào đọc file enum để biết truyền prop gì vào đây

const HeaderLayout = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userStateFormSlice = useSelector(state => state.users);
    console.log(userStateFormSlice.friendReqList)
    const [options, setOptions] = useState([]);


    /**
     * search 1 lần khi muốn hiển thị ra một đống kết quả
     * @param {*} e - value ô search hiện tại
     */
    const searchWhenClickSearchButton = (e) => {
        navigate(`search-result/search-book/${e}`, { replace: true });
    }


    /**
     * useCallback memoizes functions to avoid unnecessary re-renders and improve performance.
     */
    const debouncedSearch = useCallback(debounce((searchTextReturnFromDebounceHelper) => {
        console.log(searchTextReturnFromDebounceHelper)
        dispatch(searchBookByNameOrAuthor({ name: searchTextReturnFromDebounceHelper }))
            .unwrap()
            .then(async data => {
                // notyf.success(BSHAREresource.notification_message.success.login)
                // console.log(data)
                // setResultSearch(data)
                setOptions(data.map((resultItem) => {
                    return {
                        value: resultItem.id,
                        label: (
                            <TheAutofillItem bookCover={resultItem.urlPoster} bookName={resultItem.name} bookAuthor={resultItem.authorName} />
                        ),
                    }
                }))
                return;
            })
            .catch(e => {
                console.log(e);
                setOptions([
                    {
                        value: '',
                        label: (
                            <NotFoundPage />
                        )
                    }
                ])
            })
    }, 1000), []);

    /**
     * Search liên tục khi nhập value vào ô input
     * @param {*} value - value ô input khi mà autocomplete thay đổi giá trị
     * @param {*} _e không biết
     * @param {*} info không biết
     */
    const onSearch = (value, _e, info) => {
        console.log(value)

        debouncedSearch(value)
        // setOptions(value ? searchResult(value) : []);

    };
    const changeInputSearch = (e) => {
        console.log(e)
    }

    const onSelectSearchItem = (value) => {
        console.log('onSelect', value);
        navigate(`/books/${value}`, { replace: true });
    };
    const handleButtonClick = (e) => {
        message.info('Click on left button.');
        console.log('click left button', e);
    };
    const handleMenuClick = async (e) => {
        switch (e.key) {
            case BSHAREnum.dropdown_user_menu_key.logout:
                dispatch(logout())

                /**
                * Xoá khỏi local storage user
                */
                tokenService.removeUser()

                /**
                 * reload Rootlayout content, truyền function SetIsSignIn để update state rootlayout
                 */
                props.reloadRootLayout(false)

                navigate(`/login`, { replace: true });
                break;
            case BSHAREnum.dropdown_user_menu_key.friendList:
                navigate(`/search-result/search-friend`, { replace: true });
                break;

            case BSHAREnum.dropdown_user_menu_key.personalProfile:
                navigate(`${tokenService.getUserRoleName()}/profile`, { replace: true });
                break;
            default:
                console.log(e.key)
        }
    };
    const items = [
        {
            label: 'Đăng xuất',
            key: `${BSHAREnum.dropdown_user_menu_key.logout}`,
            icon: <LogoutOutlined />,
        },
        {
            label: 'Danh sách bạn bè',
            key: `${BSHAREnum.dropdown_user_menu_key.friendList}`,
            icon: <TeamOutlined />,
        },
        {
            label: 'Thông tin cá nhân',
            key: `${BSHAREnum.dropdown_user_menu_key.personalProfile}`,
            icon: <UserOutlined />,
        },
    ];
    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    // các loại body tương ứng với đầu vào props định nghĩa header
    let headerbody;
    if (props.headerType == BSHAREnum.headerType.not_sign_in) {
        headerbody = (<>
            <div class="rectangle center-horizontal rectangle-48-48">
                <span class="sprite-logo"> </span>
            </div>
            <Menu
                className='headerbody_menu--style'
                mode="horizontal"
                defaultSelectedKeys={['2']}
                items={BSHAREresource.menuItems.notSignInHeaderMenuItem}
            />
            <AutoComplete
                popupMatchSelectWidth={'auto'}
                allowClear
                className='headerbody_autocomplete--style'
                options={options}
                onSelect={onSelectSearchItem}
                onSearch={onSearch}
                onChange={changeInputSearch}

                size="large"
            >
                <Input.Search size="large" placeholder="input here" enterButton />
            </AutoComplete>
            <Button ghost style={{
                borderRadius: "8px",
                border: "var(--border-bottom-divider)",
                color: "rgba(17, 17, 17, 1)"

            }}
                onClick={() => { window.location = "/login"; }}
            >Đăng nhập</Button>
        </>)
    }

    if (props.headerType == BSHAREnum.headerType.signed_in) {
        headerbody = tokenService.getRole("ROLE_USER") ? (<>
            <div class="rectangle center-horizontal rectangle-48-48">
                <span class="sprite-logo"> </span>
            </div>
            <AutoComplete
                popupMatchSelectWidth={'auto'}
                allowClear
                className='headerbody_autocomplete--style'
                options={options}
                onSelect={onSelectSearchItem}
                onSearch={onSearch}
                onChange={changeInputSearch}
                size="large"
            >
                <Input.Search size="large" placeholder="input here" enterButton onSearch={searchWhenClickSearchButton} />
            </AutoComplete>
            <Menu

                className='headerbody_menu--style data-menu-header'

                mode="horizontal"
                defaultSelectedKeys={['2']}
                items={BSHAREresource.menuItems['ROLE_USER_MenuItem']}
            />
            <Space direction='horizontal' size={12}>

                <Button
                    type="text"
                    shape="circle"

                    style={{ padding: '0px' }}
                    icon={
                        <Badge count={userStateFormSlice.friendReqList.length}>
                            <Avatar shape="circle" icon={<UserOutlined />} />
                        </Badge>}
                    onClick={() => {
                        navigate(`friend-req-search-people`, { replace: true });
                    }}

                />
                <Dropdown menu={menuProps}>
                    <Button shape="round" icon={<Avatar style={{
                        backgroundColor: 'white',
                        color: 'var(--text-color-main)'
                    }} size="small" icon={<UserOutlined />} />} className='button-dropdown'>


                        <Text
                            style={{
                                width: 50
                            }}
                            ellipsis={
                                {
                                    tooltip: userStateFormSlice.userInfo.username,
                                }
                            }
                        >
                            {userStateFormSlice.userInfo.username}
                        </Text>
                        <DownOutlined />
                    </Button>
                </Dropdown>
            </Space>

        </>) : tokenService.getRole("ROLE_ADMIN") ? (<>
            <div class="rectangle center-horizontal rectangle-48-48">
                <span class="sprite-logo"> </span>
            </div>
            <Menu
                className='headerbody_menu--style data-menu-header'
                mode="horizontal"
                defaultSelectedKeys={['2']}
                items={BSHAREresource.menuItems['ROLE_ADMIN_MenuItem']}
            />
            <Space direction='horizontal' size={12}>
                <Dropdown menu={menuProps}>
                    <Button shape="round" icon={<Avatar style={{
                        backgroundColor: 'white',
                        color: 'var(--text-color-main)'
                    }} size="small" icon={<UserOutlined />} />} className='button-dropdown'>
                        <Text
                            style={{
                                width: 50
                            }}
                            ellipsis={
                                {
                                    tooltip: userStateFormSlice.userInfo.username,
                                }
                            }
                        >
                            {userStateFormSlice.userInfo.username}
                        </Text>
                        <DownOutlined />
                    </Button>
                </Dropdown>
            </Space>
        </>) : tokenService.getRole("ROLE_AUTHOR") && (<>

            <div class="rectangle center-horizontal rectangle-48-48">
                <span class="sprite-logo"> </span>
            </div>
            <Menu

                className='headerbody_menu--style data-menu-header'
                mode="horizontal"
                defaultSelectedKeys={['2']}
                items={BSHAREresource.menuItems['ROLE_AUTHOR_MenuItem']}
            />
            <Space direction='horizontal' size={12}>
                <Dropdown menu={menuProps}>
                    <Button shape="round" icon={<Avatar style={{
                        backgroundColor: 'white',
                        color: 'var(--text-color-main)'
                    }} size="small" icon={<UserOutlined />} />} className='button-dropdown'>


                        <Text
                            style={{
                                width: 50
                            }}
                            ellipsis={
                                {
                                    tooltip: userStateFormSlice.userInfo.username,
                                }
                            }
                        >
                            {userStateFormSlice.userInfo.username}
                        </Text>
                        <DownOutlined />
                    </Button>
                </Dropdown>
            </Space>
        </>)
    }
    return <Header
        className='header-style'
    >
        {headerbody}
    </Header >
}

export default HeaderLayout;
