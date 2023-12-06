import React from 'react';
import { Button, Card, Flex, Typography, Dropdown, message, Space, Tooltip, Select } from 'antd';
import StarRatings from "react-star-ratings";
import { DownOutlined, UserOutlined, HomeOutlined, BulbOutlined, SmileOutlined, FrownOutlined, MehOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import BSHAREnum from '~/helper/BSHAREenum';
import { BookEntity } from '~/entity/bookEntity';
import { formatToDate } from '~/helper/format';
import { useDispatch } from 'react-redux';
import { followBookAndUpdateStatusAsync } from '~/slices/book';
import { useNavigate } from 'react-router-dom';
const { Text } = Typography;
const cardStyle = {
    width: '100%',
    margin: '10px 0px',
    border: '1px solid #ccc',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderRadius: '3px',
    padding: '10px 0px 10px 0px'
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
let items = [
    {
        label: 'Muốn đọc',
        value: 'Muốn đọc',
        icon: <BulbOutlined />,
    },
    {
        label: 'Đang đọc',
        value: 'Đang đọc',
        icon: <MehOutlined />,
    },
    {
        label: 'Đã đọc',
        value: 'Đã đọc',
        icon: <SmileOutlined />,
    },
];


/**
 *
 * @param {*} props - BookEntity
 * @returns
 */
const TheAuthorBookItem = ({ bookItem, typeItem }) => {
    const dispatch = useDispatch()
    const handleMenuClick = (e) => {
        message.info('Click on menu item.');
        console.log(`selected ${e}`);
        console.log('click', e);
        var bookId = bookItem.id
        var status = e
        dispatch(followBookAndUpdateStatusAsync({ bookId, status }))
            .unwrap()
            .then(async data => {
                // navigate('/login', { replace: true });
                console.log(data)
                return;
            })
            .catch(e => {
                console.log(e)
                // notyf.error(e.message)
            });
    };
    const menuProps = {
        items,
        onClick: handleMenuClick,
    };
    const renderBookStatusDefaultValue = (bookItem) => {
        switch (bookItem.statusWithUser) {
            case BSHAREnum.bookStatusWithUser.read:
                return 'Đã đọc'

            case BSHAREnum.bookStatusWithUser.want_to_read:
                return 'Muốn đọc'

            case BSHAREnum.bookStatusWithUser.reading:
                return 'Đang đọc'

            default:
                return 'Chưa đọc'
        }

    }
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
                    <Space direction='vertical' size={12}>
                        <Text strong>
                            {bookItem.name}
                        </Text>
                        <Text >
                            by {bookItem.authorName}
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
                                        bookItem.scoring ? bookItem.scoring : 0
                                    }
                                    starDimension="12px"
                                    starSpacing="4px"
                                    starRatedColor="rgb(230, 67, 47)"
                                />
                                <span className='review-information'>4.47 avg rating — 9,555,274 ratings — published {formatToDate(bookItem.publishDate)}</span>
                            </Space>
                        </div>

                    </Space>

                    {
                        typeItem != BSHAREnum.modelReviewPostType.without_dropdown_button &&
                        // <Dropdown menu={menuProps}>
                        //     <Button size='large' style={{ marginTop: '8px', backgroundColor: 'var(--button-default-background-color)', color: 'white', position: 'absolute', right: '10px' }}>
                        //         <Space>
                        //             Chưa đọc
                        //             <DownOutlined />
                        //         </Space>
                        //     </Button>
                        // </Dropdown>
                        // <Dropdown menu={menuProps} />

                        <Select
                            defaultValue={renderBookStatusDefaultValue(bookItem)}
                            style={{ width: 120, marginTop: '8px', backgroundColor: 'var(--button-default-background-color)', color: 'white', position: 'absolute', right: '10px' }}
                            onChange={handleMenuClick}
                            options={items}
                        />
                    }
                </div>
            </div>
        </Card>
    )

};
export default TheAuthorBookItem;
