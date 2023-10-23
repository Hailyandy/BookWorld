import React from 'react';
import { Button, Card, Flex, Typography, Dropdown, message, Space, Tooltip } from 'antd';
import StarRatings from "react-star-ratings";
import { DownOutlined, UserOutlined, HomeOutlined, BulbOutlined, SmileOutlined, FrownOutlined, MehOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import BSHAREnum from '~/helper/BSHAREenum';
const { Text } = Typography;
const cardStyle = {
    width: '70%',
    margin: 10,
    border: '1px solid #ccc',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderRadius: '0px',
    padding: '10px 0px 10px 0px'
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
        icon: <BulbOutlined />,
    },
    {
        label: 'Đang đọc',
        key: '2',
        icon: <MehOutlined />,
    },
    {
        label: 'Đã đọc',
        key: '3',
        icon: <SmileOutlined />,
    },
];
const menuProps = {
    items,
    onClick: handleMenuClick,
};


TheAuthorBookItem.propTypes = {
    typeItem: PropTypes.string
};
function TheAuthorBookItem({ typeItem }) {
    return (
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
                    <Space direction='vertical'>
                        <Text strong>
                            Hôm nay tôi thất tình
                        </Text>
                        <Text >
                            by Xuân Bách
                        </Text>
                        <div>
                            {/*
                            <Text style={{ fontSize: "13px" }} strong>
                                {bookItem.numReviews > 0
                                    ? (bookItem.star / bookItem.numReviews).toFixed(1)
                                    : (0.01).toFixed(1)}
                                /5.0
                            </Text> */}
                            <Space>
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
                                <span className='review-information'>4.47 avg rating — 9,555,274 ratings — published 1997</span>
                            </Space>
                        </div>

                    </Space>


                    {
                        typeItem != BSHAREnum.modelReviewPostType.without_dropdown_button &&
                        <Dropdown menu={menuProps}>
                            <Button size='large' style={{ marginTop: '8px', backgroundColor: 'var(--button-default-background-color)', color: 'white' }}>
                                <Space>
                                    Chưa đọc
                                    <DownOutlined />
                                </Space>
                            </Button>
                        </Dropdown>
                    }


                </div>
            </div>
        </Card>
    )

};
export default TheAuthorBookItem;
