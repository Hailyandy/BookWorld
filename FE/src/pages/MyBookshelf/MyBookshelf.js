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

const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i,
        name: `Edward ${i}`,
        age: 32,
        address: `The standard Lorem Ipsum passage, used since the 1500s
"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"

1914 translation by H. Rackham
"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"

Section 1.10.33 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC
"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."

1914 translation by H. Rackham
"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains."`,
    });
}
const MyBookshelf = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const MyBookshelf = useLoaderData()
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
            <Sider
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
            </Sider>
            <Content
                style={{
                    padding: '0 24px',
                    minHeight: 280,
                }}
            >
                <Table
                    columns={columnsub}
                    dataSource={MyBookshelf}
                    scroll={{
                        x: 1500,
                    }}

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
