import React from 'react';
import { Breadcrumb, Layout, Menu, theme, Input, Button } from 'antd';
import "./css/header.css"
const { Search } = Input;
const { Header, Content, Footer } = Layout;
const HeaderLayout = () => {
    const onSearch = (value, _e, info) => console.log(info?.source, value);
    return <Header
        style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: "#bcf4f4",
            height: "80px",
  
        }}

    >
        <div class="rectangle center-horizontal">
            <span class="sprite-logo"> </span>
        </div>
        <Menu
            style={{
                minWidth: 200, flex: "auto", backgroundColor: "#bcf4f4", color: "rgba(102, 102, 102, 0.80)",
                fontfamily: "Poppins",
                fontSize: "20px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "normal",
                borderBottom: "0px"
            }}

            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={new Array(4).fill(null).map((_, index) => {
                const key = index + 1;
                return {
                    key,
                    label: `nav ${key}`,
                };
            })}
        />
        <Search
            placeholder="Tìm kiếm"
            onSearch={onSearch}
            enterButton='Search'
            style={{
                borderRadius: "16px",
                backgroundColor: "#bcf4f4",
                width: "40%",
                padding: "8px 16px",
            }}
        />
        <Button ghost style={{
            borderRadius: "8px",
            border: "1px solid #111",
            color: "rgba(17, 17, 17, 1)"
        }}>Đăng nhập</Button>
    </Header>
}

export default HeaderLayout;
