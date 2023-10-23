import React from 'react';
import { UserOutlined, UserAddOutlined } from '@ant-design/icons';
import { Layout, Space, Card, List, Avatar, Button, Input, Tooltip } from 'antd';
import './friend-req-search-pp.css'
const { Meta } = Card;
const { Header, Footer, Sider, Content } = Layout;
const { Search } = Input;
const headerStyle = {
    textAlign: 'left',
    color: '#fff',
    height: 24,
    paddingInline: 50,
    lineHeight: '24px',
    backgroundColor: '#7dbcea',

};
const contentStyle = {
    padding: '1rem',
    paddingBottom: '0px',

    minHeight: 120,
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#108ee9',
};
const siderStyle = {
    marginTop: '24px',
    lineHeight: '120px',
    // color: '#fff',
    backgroundColor: '#3ba0e9',
};
const FriendRequestSearchPeoplePage = () => {
    const onSearchMemberByNameOrEmail = (value, _e, info) => console.log(info?.source, value);
    const data = [
        {
            title: 'Title 1',
        },
        {
            title: 'Title 2',
        },
        {
            title: 'Title 3',
        },
        {
            title: 'Title 4',
        },
        {
            title: 'Title 5',
        },
        {
            title: 'Title 6',
        },
        {
            title: 'Title 7',
        },
        {
            title: 'Title 8',
        },
    ];
    return <div className="friend-req-search-pple-containner">
        <Layout style={{ margin: '0px auto' }}>

            <Layout>
                <Header style={headerStyle}>Bạn có 2 lời mời</Header>
                <Content style={contentStyle}>
                    <List
                        grid={{
                            gutter: 16,
                            xs: 1,
                            sm: 2,
                            md: 4,
                            lg: 4,
                            xl: 6,
                            xxl: 3,
                        }}
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item>
                                <Card
                                    bodyStyle={{ padding: '5%' }}
                                    style={{
                                        width: '150px',
                                    }}
                                    cover={
                                        <img
                                            alt="example"
                                            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                        />
                                    }
                                    actions={[
                                        <Space direction="vertical" size={'small'} style={{ width: '90%' }}>
                                            <Button style={{ width: '100%' }} type="primary">Xác nhận</Button>
                                            <Button style={{ width: '100%' }} >Xoá</Button>
                                        </Space>


                                    ]}
                                >
                                    <Meta style={{ fontSize: '12px' }}
                                        title="Card title"
                                        description="This is the description"
                                    />
                                </Card>
                            </List.Item>
                        )}
                    />
                </Content>

            </Layout>
            <Sider style={siderStyle}>
                <Card
                    title="TÌm kiếm bạn bè"
                    bordered={false}
                    style={{
                        borderRadius: '0px'
                    }}
                >
                    <Search onSearch={onSearchMemberByNameOrEmail} placeholder="Tên bạn hoặc email" enterButton={<UserOutlined />} size="large" />



                </Card></Sider>
        </Layout>
    </div>
}
export default FriendRequestSearchPeoplePage;
