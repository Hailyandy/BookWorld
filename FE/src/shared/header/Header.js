import React from 'react';
import { Breadcrumb, Layout, Menu, theme, Input, Button, Dropdown, Space, message, Avatar } from 'antd';
import { DownOutlined, UserOutlined, HomeOutlined } from '@ant-design/icons';
import "../css/header.css"
import BSHAREnum from "~/helper/BSHAREenum"
import BSHAREresource from '~/helper/BSHAREresource';
const { Search } = Input;
const { Header, Content, Footer } = Layout;

//props == BSHAREnum.headerType, vào đọc file enum để biết truyền prop gì vào đây
const HeaderLayout = (props) => {
    const onSearch = (value, _e, info) => console.log(info?.source, value);

    const handleButtonClick = (e) => {
        message.info('Click on left button.');
        console.log('click left button', e);
    };
    const handleMenuClick = (e) => {
        message.info('Click on menu item.');
        console.log('click', e);
    };
    const items = [
        {
            label: '1st menu item',
            key: '1',
            icon: <UserOutlined />,
        },
        {
            label: '2nd menu item',
            key: '2',
            icon: <UserOutlined />,
        },
        {
            label: '3rd menu item',
            key: '3',
            icon: <UserOutlined />,
            danger: true,
        },
        {
            label: '4rd menu item',
            key: '4',
            icon: <UserOutlined />,
            danger: true,
            disabled: true,
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
            <Search
                placeholder="Tìm kiếm"
                onSearch={onSearch}
                enterButton='Search'
                style={{
                    borderRadius: "16px",
                    backgroundColor: "var(--background-color)",
                    width: "40%",
                    padding: "0px 2rem",
                }}
            />
            <Button ghost style={{
                borderRadius: "8px",
                border: "1px solid #111",
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
            <Search
                placeholder="Tìm kiếm"
                onSearch={onSearch}
                enterButton='Search'
                style={{
                    borderRadius: "16px",
                    backgroundColor: "var(--background-color)",
                    width: "40%",
                    padding: "0px 2rem",
                }}
            />
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
        {/* <Breadcrumb
            items={[
                {
                    title: 'Ant Design',
                },
                {
                    title: <a href="">Component</a>,
                },
                {
                    title: <a href="">General</a>,
                    menu: {
                        items: BSHAREresource.menuItems.authorPageBreadcumMenuItem,
                    },
                },
                {
                    title: 'Button',
                },
            ]}
        /> */}
    </Header >
}

export default HeaderLayout;
