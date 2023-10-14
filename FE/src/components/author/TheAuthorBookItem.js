import React from 'react';
import { Button, Card, Flex, Typography, Dropdown, message, Space, Tooltip } from 'antd';
import StarRatings from "react-star-ratings";
import { DownOutlined, UserOutlined, HomeOutlined } from '@ant-design/icons';
import './bookItem.css'
const { Text } = Typography;
const cardStyle = {
    width: '23.4%',
    margin: 10
};
const handleMenuClick = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
};
const imgStyle = {
    display: 'block',
    width: 100,
    height: 100,
};
const bookItem = {
    star: 10,
    numReviews: 2
}
const items = [
    {
        label: 'Muốn đọc',
        key: '1',
        icon: <UserOutlined />,
    },
    {
        label: 'Đang đọc',
        key: '2',
        icon: <UserOutlined />,
    },
    {
        label: 'Đã đọc',
        key: '3',
        icon: <UserOutlined />,
    },
];
const menuProps = {
    items,
    onClick: handleMenuClick,
};
const TheAuthorBookItem = () => (
    <Card
        style={cardStyle}
        bodyStyle={{
            padding: 0,
            overflow: 'hidden',
        }}
    >
        <div class="bookItem-container">
            <img
                alt="avatar"
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                style={imgStyle}
            />
            <div
                className='bookItem-container-right'
            >
                <Text strong>
                    Hôm nay tôi thất tình
                </Text>
                <div>
                    <StarRatings
                        rating={
                            bookItem.numReviews > 0
                                ? bookItem.star / bookItem.numReviews
                                : 0
                        }
                        starDimension="12px"
                        starSpacing="4px"
                        starRatedColor="rgb(230, 67, 47)"
                    />
                    {/* <Text style={{ fontSize: "13px" }} strong>
                        {bookItem.numReviews > 0
                            ? (bookItem.star / bookItem.numReviews).toFixed(1)
                            : (0.01).toFixed(1)}
                        /5.0
                    </Text> */}
                </div>
                <Dropdown menu={menuProps}>
                    <Button size='small' style={{ backgroundColor: '#43D8CD', color: 'white' }}>
                        <Space>
                            Chưa đọc
                            <DownOutlined />
                        </Space>
                    </Button>
                </Dropdown>
            </div>
        </div>
    </Card>
);
export default TheAuthorBookItem;
