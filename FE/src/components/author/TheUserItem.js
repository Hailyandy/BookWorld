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
import { searchUserByName, rejectFriendReq, acceptFriendReq, getListFriendRequest } from '~/slices/user';
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
    height: 50,
};

/**
 *
 * @param {*} props - BookEntity
 * @returns
 */
const TheUserItem = ({ userItem, type }) => {
    const { searchText } = useParams()
    console.log(userItem)
    console.log(window.location.pathname)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handelClickUpdatePeopleFriendship = (actionDispatch, id) => {
        dispatch(actionDispatch(id))
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
    }
    const renderActionButtonBasedOnFriendship = (userItem) => {
        switch (type) {
            case BSHAREnum.friendship.PENDING:
                return <Space direction='vertical' align='end'>
                    <Button disabled size='small' style={{}}>
                        <Space>
                            Đã gửi lời mời kết bạn
                        </Space>
                    </Button>
                    <Button onClick={() => { handelClickUpdatePeopleFriendship(unFriend, { senderId: userItem.id }) }} size='large' style={{ backgroundColor: 'var(--button-default-background-color)', color: 'white', }}>
                        <Space>
                            Huỷ lời mời
                        </Space>
                    </Button>
                </Space>
                break;
            case BSHAREnum.friendship.ACCEPTED:
                return <Space direction='vertical' align='end'>
                    <Button onClick={() => { handelClickUpdatePeopleFriendship(unFriend, { senderId: userItem.id }) }} size='large' style={{ backgroundColor: 'var(--button-default-background-color)', color: 'white', }}>
                        <Space>
                            Huỷ kết bạn
                        </Space>
                    </Button>
                </Space>
                break;
            case BSHAREnum.friendship.ACCEPT:
                return <Space direction='vertical' >
                    <Button onClick={() => { handelClickUpdatePeopleFriendship(acceptFriendReq, { senderId: userItem.id }) }} size='large' style={{ backgroundColor: 'var(--button-default-background-color)', color: 'white', width: '100px' }}>
                        <Space>
                            Chấp nhận
                        </Space>
                    </Button>
                    <Button onClick={() => { handelClickUpdatePeopleFriendship(rejectFriendReq, { senderId: userItem.id }) }} size='large' style={{ backgroundColor: 'var(--button-default-background-color)', color: 'white', width: '100px' }}>
                        <Space>
                            Từ chối
                        </Space>
                    </Button>
                </Space>
                break;
            default:
                return <Space direction='vertical' >
                    <Button onClick={() => { handelClickUpdatePeopleFriendship(addFriend, { receiverId: userItem.id }) }} size='large' style={{ backgroundColor: 'var(--button-default-background-color)', color: 'white', width: '100px' }}>
                        <Space>
                            Kết bạn
                        </Space>
                    </Button>
                </Space>
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
                            renderActionButtonBasedOnFriendship(userItem)
                        }
                    </div>
                </div>
            </div>
        </Card>
    )

}
export default TheUserItem;
