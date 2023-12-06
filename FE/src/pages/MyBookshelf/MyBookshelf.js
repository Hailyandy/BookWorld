import React, { useEffect, useState, useMemo } from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Switch, Table, Tooltip, Space } from 'antd';
import BSHAREnum from '~/helper/BSHAREenum';
import BSHAREresource from '~/helper/BSHAREresource';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const bookshelf = ['Muốn đọc', 'Đang đọc', 'Đã đọc', 'custom tên giá']
const MyBookshelf = () => {
    const navigate = useNavigate()
    const columnsub =
        [
            {
                title: 'Ảnh bìa',
                width: 100,
                dataIndex: 'urlBook',
                key: 'urlBook',
                fixed: 'left',
            },
            {
                title: 'Tiêu đề',
                width: 100,
                dataIndex: 'bookName',
                key: 'bookName',
                fixed: 'left',
            },
            {
                title: 'Tên tác giả',
                dataIndex: 'authorName',
                key: 'authorName',
                width: 150,
            },
            {
                title: <Tooltip title="Trung bình xếp hạng">
                    <span>TB xếp hạng</span>
                </Tooltip>,
                dataIndex: 'scoring',
                key: 'scoring',
                width: 150,
            },
            {
                title: 'Bài đánh giá',
                dataIndex: 'review_post',
                key: 'review_post',
                width: 150,
                ellipsis: true,
            },
            // {
            //     title: 'Ngày đọc',
            //     dataIndex: 'name',
            //     key: '5',
            //     width: 150,
            // },
            // {
            //     title: 'Ngày thêm vào',
            //     dataIndex: 'name',
            //     key: '6',
            //     width: 150,
            // },
            {
                title: 'Đánh giá',
                key: 'operation',
                fixed: 'right',
                width: 100,
                render: (text, record, index) => {
                    console.log(record)
                    return (
                        <>
                            <Space direction='horizontal' >
                                <a onClick={() => {
                                    // window.location.replace(`review/edit/${record.id}`)
                                    return navigate(`review/edit/${record.id}`)
                                }}>
                                    Tạo bài
                                </a>
                                {/* <span >
                                    Xem bài
                                </span> */}
                            </Space>
                        </>)
                },
            },
        ];
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const myBookshelf = useLoaderData()
    return (
        <Layout
            style={{
                paddingTop: '50px',
                paddingLeft: '24px',
                // background: colorBgContainer,
            }}
        >
            {/* <Sider
                style={{
                    background: colorBgContainer,
                }}
                width={200}
            >
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{
                        height: '100%',
                    }}
                    items={slideMenuItem}
                />
            </Sider> */}
            <Content
                style={{
                    padding: '0 24px',
                    minHeight: 280,
                }}
            >
                <Table
                    columns={columnsub}
                    dataSource={myBookshelf}
                    // scroll={{
                    //     x: 1500,
                    // }}

                    // antd site header height
                    sticky={{
                        offsetHeader: 0,
                    }}
                />
            </Content>
        </Layout>
    );
};
export default MyBookshelf;
