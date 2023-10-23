import React, { useState, useCallback } from 'react';
import TheAutofillItem from '~/components/autoFill/TheAutoFillitem'
import { Breadcrumb, Layout, Menu, theme, Input, Button, Dropdown, Space, message, Avatar, AutoComplete, Result } from 'antd';
import { DownOutlined, UserOutlined, HomeOutlined, LogoutOutlined } from '@ant-design/icons';
import "../css/header.css"
import BSHAREnum from "~/helper/BSHAREenum"
import BSHAREresource from '~/helper/BSHAREresource';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { searchBookByNameOrAuthor } from '~/slices/book';
import { logout } from '~/slices/user';
import tokenService from '~/services/token.service';
import { debounce } from '~/helper/debounce';
import { NotFoundPage } from '~/pages';
const { Search } = Input;
const { Header, Content, Footer } = Layout;


//props == BSHAREnum.headerType, vào đọc file enum để biết truyền prop gì vào đây

const HeaderLayout = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [options, setOptions] = useState([]);
    const [resultSearch, setResultSearch] = useState([])

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
    const handleMenuClick = (e) => {
        switch (e.key) {
            case BSHAREnum.dropdown_user_menu_key.logout:
                dispatch(logout)

                /**
                 * reload Rootlayout content, truyền function SetIsSignIn để update state rootlayout
                 */
                props.reloadRootLayout(false)

                /**
                * Xoá khỏi local storage user
                */
                tokenService.removeUser()

                navigate(`/login`, { replace: true });
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
                style={{
                    minWidth: 200, flex: "auto", backgroundColor: "var(--background-color)", color: "rgba(102, 102, 102, 0.80)",
                    fontfamily: "Poppins",
                    fontSize: "20px",
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "normal",
                    borderBottom: "0px"
                }}

                mode="horizontal"
                defaultSelectedKeys={['2']}
                items={BSHAREresource.menuItems.selectFavouriteMenuItem.map((item, index) => {
                    const key = item.key;
                    return {
                        key,
                        label: `${item.label}`,
                    };
                })}
            />
            <AutoComplete
                popupMatchSelectWidth={'auto'}
                allowClear
                style={{
                    borderRadius: "16px",
                    backgroundColor: "var(--background-color)",
                    width: "40%",
                    padding: "0px 2rem",
                    width: 500,
                }}
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
        headerbody = (<>
            <div class="rectangle center-horizontal rectangle-48-48">
                <span class="sprite-logo"> </span>
            </div>
            <AutoComplete
                popupMatchSelectWidth={'auto'}
                allowClear
                style={{
                    borderRadius: "16px",
                    backgroundColor: "var(--background-color)",
                    width: "40%",
                    padding: "0px 2rem",
                    width: 500,
                }}
                options={options}
                onSelect={onSelectSearchItem}
                onSearch={onSearch}
                onChange={changeInputSearch}
                size="large"
            >
                <Input.Search size="large" placeholder="input here" enterButton />
            </AutoComplete>
            <Menu
                style={{
                    minWidth: 200, flex: "auto", backgroundColor: "var(--background-color)", color: "rgba(102, 102, 102, 0.80)",
                    fontfamily: "Poppins",
                    fontSize: "20px",
                    fontStyle: "normal",
                    fontWeight: 700,
                    lineHeight: "normal",
                    borderBottom: "0px"
                }}

                mode="horizontal"
                defaultSelectedKeys={['2']}
                items={BSHAREresource.menuItems.authorPageMenuItem.map((item, index) => {
                    const key = item.key;
                    return {
                        key,
                        label: `${item.label}`,
                    };
                })}
            />
            <Dropdown menu={menuProps}>
                <Button shape="round" icon={<Avatar style={{
                    backgroundColor: 'white',
                    color: 'var(--text-color-main)'
                }} size="small" icon={<UserOutlined />} />} style={{
                    backgroundColor: 'var(--text-color-main)',
                    color: 'var(--text-color)',
                    height: '36px'
                }} >
                    Button
                    <DownOutlined />
                </Button>
            </Dropdown>
        </>)
    }
    return <Header
        style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: "var(--background-color)",
            height: "10%",
        }}
    >
        {headerbody}
    </Header >
}

export default HeaderLayout;
