import React, { useEffect, useState, useMemo } from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Switch, Table, Tooltip, Space } from 'antd';
import BSHAREnum from '~/helper/BSHAREenum';
import { useNavigate } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;
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
            title: 'authorName',
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
            title: 'Đánhg giá',
            key: 'operation',
            fixed: 'right',
            width: 100,
            render: (text, record, index) => {
                console.log(record)
                return (
                    <>
                        <Space direction='horizontal' >
                            <span onClick={() => {
                                window.location.replace(`${BSHAREnum.localHost.url}users/review/edit/${record.bookId}`)

                            }}>
                                Chỉnh sửa
                            </span>
                            <span >
                                Xem bài
                            </span>
                        </Space>
                    </>)
            },
        },
    ];

const bookshelf = ['Muốn đọc', 'Đang đọc', 'Đã đọc', 'custom tên giá']
const slideMenuItem = [{
    key: `bookshelf`,
    icon: React.createElement(UserOutlined),
    label: `Giá sách`,
    children: bookshelf.map((_, index) => {
        const subKey = 1 * 4 + index + 1;
        return {
            key: subKey,
            label: `option${subKey}`,
        };
    }),
}]


const MyBookshelf = () => {
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
                                <span onClick={() => {
                                    window.location.replace(`${BSHAREnum.localHost.url}users/review/edit/${record.bookId}`)

                                }}>
                                    Chỉnh sửa
                                </span>
                                <span >
                                    Xem bài
                                </span>
                            </Space>
                        </>)
                },
            },
        ];
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const myBookshelf = useLoaderData()
    const navigate = useNavigate()
    const [isNavigate, setIsnavigate] = useState('')
    const columns = useMemo(() => {
        return [
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
                title: 'authorName',
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
                title: 'Đánhg giá',
                key: 'operation',
                fixed: 'right',
                width: 100,
                render: (text, record, index) => {
                    console.log(record)
                    return (
                        <>
                            <Space direction='horizontal' >
                                <span onClick={() => {
                                    // navigate(`../review/edit/${record.bookId}`);
                                    setIsnavigate(record.bookId)
                                }}>
                                    Chỉnh sửa
                                </span>
                                <span >
                                    Xem bài
                                </span>
                            </Space>
                        </>)
                },
            },
        ];
    }, []);
    useEffect(() => {
        console.log('navigate')
        if (typeof window !== 'undefined') {
            if (isNavigate != '') {
            }
        }
        // return () => { navigate(`../users/review/edit/${isNavigate}`, { replace: true }); }
    }, [isNavigate])


    return (
        <Layout
            style={{
                paddingTop: '50px',
                paddingLeft: '24px',
                background: colorBgContainer,
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