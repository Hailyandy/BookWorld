import { BarChart, PieChart } from "~/components"
import './css/dashboard.css'
import React, { useState } from 'react';
import { Avatar, List, Space, Col, Row, DatePicker } from 'antd';
import { SnippetsOutlined, WifiOutlined, AliwangwangOutlined } from "@ant-design/icons";
import { useLoaderData } from "react-router-dom";


const AdminDashBoard = () => {
    const [statisticData, setStatisticData] = useState(useLoaderData())
    const [yearStatistic, setYearStatistic] = useState(2023)
    console.log(statisticData)
    const handleChange = (date, dateString) => {
        console.log(dateString);
        setYearStatistic(dateString)
    };
    const data = [
        {
            icon: <WifiOutlined />,
            title: 'Số người dùng đang online ',
            description: 0
        },
        {
            icon: <AliwangwangOutlined />,
            title: 'Tổng số người dùng hiện tại ',
            description: 0
        },
        {
            icon: <SnippetsOutlined />,
            title: 'Tổng số bài post hôm nay',
            description: 0
        },
        {
            icon: <SnippetsOutlined />,
            title: 'Số người dùng đang online',
            description: 0
        },
    ];
    return (
        <div>
            <Row style={{ backgroundColor: 'var(--background-color-white)', padding: '10px' }}>
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
                                    description={item.description}
                                />
                            </List.Item>
                        )}
                    /></Col>
                <Col span={12}>
                    <DatePicker onChange={handleChange} picker="year" />
                    <BarChart dataBarChart={statisticData} year={yearStatistic}> </BarChart>
                </Col>
            </Row>
            {/* <LineChart></LineChart> */}
            {/* <PieChart></PieChart> */}
        </div>
    )
}
export default AdminDashBoard
