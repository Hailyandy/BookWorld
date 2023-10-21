

import "./bookMarket.css"
import { Link } from 'react-router-dom'

import { AudioOutlined } from '@ant-design/icons';
import React from 'react';
import { Input, Space, Checkbox } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Tooltip } from 'antd';
import { Pagination } from 'antd';
import BookItem from "~/components/ui/BookItem/BookItem";

const onChange = (e) => {
  console.log(`checked = ${e.target.checked}`);
};
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1677ff',
    }}
  />
);
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


const BookMarket = () => {
    return (
        <>
            <div class = "market-book-container">

                {/* header search and button sold */}

                <div class="header-search">
                    <Search
                        style={{ width: "500px" }}
                        placeholder="input search text"
                        allowClear
                        enterButton="Search"
                        size="default"
                        onSearch={onSearch}
                    />
                    <Button style={{
                        backgroundColor:"#6ecdeb"
                     }} type="primary">
                        Đăng Bán
                    </Button>
                </div>

                {/* Body search */}
                
                <div class="body-search-book">
                    <div class="author-category">
                        <div class="author">
                            <h2>Tác giả</h2>
                            
                            <Search
                                placeholder="Tên tác giả"
                                onSearch={onSearch}
                                style={{ width: 200}}
                            />
                            <ul class="author-list">
                                <li class="author-name">
                                    <Checkbox onChange={onChange}>Xuân Bách</Checkbox>
                                </li>
                                <li class="author-name">
                                    <Checkbox onChange={onChange}>Xuân Bách</Checkbox>
                                </li>
                                <li class="author-name">
                                    <Checkbox onChange={onChange}>Xuân Bách</Checkbox>
                                </li>
                                <li class="author-name">
                                    <Checkbox onChange={onChange}>Xuân Bách</Checkbox>
                                </li>
                            </ul>
                        </div>
                        <div class="category">
                            <h2>Thể loại</h2>
                        </div>
                    </div>
                    <div class="title-search">
                        <div class="search-result">
                            <p>0 kết quả được tìm thấy</p>
                            <Dropdown menu={menuProps}>
                                <Button>
                                    <Space>
                                       Sắp xếp theo:
                                       <DownOutlined />
                                    </Space>
                                </Button>
                            </Dropdown>
                        </div>
                        <ul class="book-list">
                            <li class="book-item">
                                <BookItem/>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Footer */}
                <div class="footer">
                <Pagination defaultCurrent={1} total={50} />
                </div>
            </div>
            
        </>)
}
export default BookMarket;