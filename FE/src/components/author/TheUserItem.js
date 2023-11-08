import React from 'react';
import { Button, Card, Flex, Typography, Dropdown, message, Space, Tooltip } from 'antd';
import StarRatings from "react-star-ratings";
import { DownOutlined, UserOutlined, HomeOutlined, BulbOutlined, SmileOutlined, FrownOutlined, MehOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import BSHAREnum from '~/helper/BSHAREenum';
import { BookEntity } from '~/entity/bookEntity';
import { formatToDate } from '~/helper/format';
import { useDispatch } from 'react-redux';
import { followBookAndUpdateStatusAsync } from '~/slices/book';
import './bookItem.css'
import { addFriend, unFriend } from '~/slices/user';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
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
const userItem = {
    star: 10,
    numReviews: 2
}
const items = [
    {
        label: 'Muốn đọc',
        key: 'Muốn đọc',
        icon: <BulbOutlined />,
    },
    {
        label: 'Đang đọc',
        key: 'Đang đọc',
        icon: <MehOutlined />,
    },
    {
        label: 'Đã đọc',
        key: 'Đã đọc',
        icon: <SmileOutlined />,
    },
];


/**
 *
 * @param {*} props - BookEntity
 * @returns
 */
const TheUserItem = ({ userItem, type }) => {
    const { searchText } = useParams()
    console.log(searchText)
    console.log(window.location.pathname)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleMenuClickAddAFriend = (receiverId) => {
        console.log('click', receiverId);
        dispatch(addFriend({ receiverId }))
            .unwrap()
            .then(async data => {
                navigate(`${window.location.pathname}`, { replace: true });
                console.log(data)
                return;
            })
            .catch(e => {
                console.log(e)
                // notyf.error(e.message)
            });
    };

    const handleMenuClickUnFriend = (senderId) => {
        console.log('click', senderId);
        dispatch(unFriend({ senderId }))
            .unwrap()
            .then(async data => {
                navigate(`${window.location.pathname}`, { replace: true });
                console.log(data)
                return;
            })
            .catch(e => {
                console.log(e)
                // notyf.error(e.message)
            });
    };
    const handleMenuClickFollowPeople = (e) => {
        console.log('click', e);
        // dispatch(followBookAndUpdateStatusAsync({ bookId, status }))
        //     .unwrap()
        //     .then(async data => {
        //         // navigate('/login', { replace: true });
        //         console.log(data)
        //         return;
        //     })
        //     .catch(e => {
        //         console.log(e)
        //         // notyf.error(e.message)
        //     });
    };
    return (
        <Card
            style={cardStyle}
            bodyStyle={{
                padding: 0,
                overflow: 'hidden',
            }}
        >
            <div class="userItem-container">
                <img
                    alt="avatar"
                    src={userItem.urlAvatar}
                    style={imgStyle}
                />
                <div
                    className='userItem-container-right'
                >
                    <Space direction='vertical'>
                        <Text strong>
                            {userItem.name}
                        </Text>
                        <Text >
                            {userItem.birthDate}
                        </Text>
                    </Space>
                    <div className="user-item--button-containner" style={{ position: 'absolute', right: '10px', top: '50%', transform: "translate(0%, -50%)" }} >
                        {
                            type == BSHAREnum.the_user_item.friend_req &&
                            <Space direction='vertical' >
                                <Button onClick={() => { handleMenuClickAddAFriend(userItem.id) }} size='large' style={{ backgroundColor: 'var(--button-default-background-color)', color: 'white', width: '100px' }}>
                                    <Space>
                                        Kết bạn
                                    </Space>
                                </Button>
                                <Button onClick={() => { handleMenuClickFollowPeople(userItem.id) }} size='large' style={{ backgroundColor: 'var(--button-default-background-color)', color: 'white', width: '100px' }}>
                                    <Space>
                                        Theo dõi
                                    </Space>
                                </Button>
                            </Space>
                        }

                        {
                            type == BSHAREnum.the_user_item.friend_list && <Space direction='vertical' >

                                <Button onClick={() => { handleMenuClickUnFriend(userItem.id) }} size='large' style={{ backgroundColor: 'var(--button-default-background-color)', color: 'white', width: '100px' }}>
                                    <Space>
                                        Unfriend
                                    </Space>
                                </Button>
                            </Space>
                        }
                    </div>
                </div>
            </div>
        </Card>
    )

}
export default TheUserItem;
