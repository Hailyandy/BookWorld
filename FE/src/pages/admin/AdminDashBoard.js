import { BarChart, PieChart } from "~/components"
import './css/dashboard.css'
import React from 'react';
import { Avatar, List, Space, Col, Row } from 'antd';
import { SnippetsOutlined, WifiOutlined, AliwangwangOutlined } from "@ant-design/icons";
const data = [
    {
        icon: <WifiOutlined />,
        title: 'Số người dùng đang online ',
    },
    {
        icon: <AliwangwangOutlined />,
        title: 'Tổng số người dùng hiện tại ',
    },
    {
        icon: <SnippetsOutlined />,
        title: 'Tổng số bài post hôm nay',
    },
    {
        icon: <SnippetsOutlined />,
        title: 'Số người dùng đang online',
    },
];



const AdminDashBoard = () => {

    return (
        <div >

            <Row>
                <Col span={12}>
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={(item, index) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar icon={item.icon} style={{
                                        backgroundColor: '#87d068',
                                    }} />}
                                    title={<a href="https://ant.design">{item.title}</a>}
                                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                />
                            </List.Item>
                        )}
                    /></Col>
                <Col span={12}><BarChart></BarChart></Col>
            </Row>


            {/* <LineChart></LineChart> */}
            <PieChart></PieChart>
        </div>
    )
}
export default AdminDashBoard
