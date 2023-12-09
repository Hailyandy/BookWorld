import AvartarTime from "~/components/ui/AvartarTime/AvartarTime"
import "./reviewPost.css"
import { StarFilled } from '@ant-design/icons';
import ContentIntro from "../Content Intro/ContentIntro";
import { Dropdown, Divider, Form, Modal, Table, Card, message, Button, Input, Space, Row, Col, Rate, Avatar, Tooltip, List, Upload, Typography, FloatButton } from 'antd'
import { LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { DeleteOutlined, EditOutlined, EllipsisOutlined, SettingOutlined, SendOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import Avartar from "~/components/ui/Avartar/Avartar";
// import CommentPost from "../PostComment/PostComment";
// import PostComment from "../PostComment/PostComment";
import StarRatings from "react-star-ratings";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCommentOfPostAsync, getUserInformationAsync, updatePostAsync } from "~/slices/user";
import { convertCommentWithParentId } from "~/helper/format";
import NestedComments from "~/components/comment/NestedComment";
import BSHAREnum from "~/helper/BSHAREenum";
import { createCommentAsync } from "~/slices/user";
import moment from "moment";
import tokenService from "~/services/token.service";
import { deletePostAsync } from "~/slices/user";
import { useNavigate } from "react-router-dom";
import { deletePostReducer } from '~/slices/user';
import { useContext } from "react";
import { ConfigContext } from "~/context/GlobalContext";
moment.locale('vi');
// const cho dropdown tất cả các bình luận

const ReviewPost = ({ postItem }) => {
    const contextContent = useContext(ConfigContext);
    console.log(postItem)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [likes, setLikes] = useState(0);
    const [userInfo, setUserInfo] = useState('')
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [commentFormUserIntoPost, setCommentFormUserIntoPost] = useState([]);
    const [commentBeforeConvertIntoNestData, setCommentBeforeConvertIntoNestData] = useState([]);
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLikeClick = () => {
        setLikes(likes + 1);
    };
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const deletePost = () => {
        dispatch(deletePostReducer({ id: postItem.id }))
        dispatch(deletePostAsync({ idPost: postItem.id }))
            .unwrap()
            .then(async data => {
                console.log(data)
                // navigate('../')
            })
            .catch(e => {
                console.log(e)
            });
    }

    const items = [
        {
            label: <span onClick={showModal}><EditOutlined style={{ width: '32px' }} />Sửa</span>,
            key: '0',
        },
        {
            label: <span onClick={deletePost} ><DeleteOutlined style={{ width: '32px' }} />Xoá</span>,
            key: '1',
        },
        {
            type: 'divider',
        },

    ];
    const handleCommentSubmit = () => {
        dispatch(createCommentAsync({ content: commentText, postId: postItem.id, parentId: null }))
            .unwrap()
            .then(async data => {
                console.log(data)
            })
            .catch(e => {
                console.log(e)
            });

    };
    useEffect(() => {
        dispatch(getCommentOfPostAsync({ postId: postItem.id }))
            .unwrap()
            .then(async data => {
                setCommentBeforeConvertIntoNestData(data.data)
                console.log(convertCommentWithParentId(data.data))
                setCommentFormUserIntoPost(convertCommentWithParentId(data.data))

            })
            .catch(e => {
                return e.messege
            });

        dispatch(getUserInformationAsync({ idUser: tokenService.getUser().id }))
            .unwrap()
            .then(async data => {
                console.log(data)
                setUserInfo(data.data)
            })
            .catch(e => {
                console.log(e);
                setUserInfo({})
            })

    }, [])

    /**
     * //khi có bình luận mới sẽ có entity Comment gửi tới
     * @param {*} payload
     */
    const onCommentOpenUp = (payload) => {
        var payloadData = JSON.parse(payload.body);
        //1
        console.log(payloadData)
        //1. Cập nhật lại comment trả về từ BE mà chưa được convert
        setCommentBeforeConvertIntoNestData([...commentBeforeConvertIntoNestData, payloadData.data])

        //2. Cập nhật lại comment trong post - payloadData.data: object comment; commentBeforeConvertIntoNestData: []
        setCommentFormUserIntoPost(convertCommentWithParentId([...commentBeforeConvertIntoNestData, payloadData.data]))

    }

    /**
     * //khi có bình luận được cập nhật - > message Comment mới đã cập nhật
     * @param {*} payload
     */
    const onCommentUpdate = (payload) => {
        var payloadData = JSON.parse(payload.body);
        //1
        console.log(payloadData)
        // dispatch(receiveFriendRequestFromSocket(payloadData.data))
    }

    /**
     * //id comment đã xóa
     * @param {*} payload
     */
    const onCommentDelete = (payload) => {
        var payloadData = JSON.parse(payload.body);
        //1
        console.log(payloadData)


        // dispatch(receiveFriendRequestFromSocket(payloadData.data))
    }
    const onFinish = (values, idPost) => {
        console.log('Success:', values);
        let { score, content } = values
        dispatch(updatePostAsync({ score, content, idPost }))
            .unwrap()
            .then(async data => {
                handleOk()
                return data;
            })
            .catch(e => {
                return e.messege
            });

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const handleOpenComment = () => {
        if (!visible) {
            if (contextContent.stompClient) {
                contextContent.stompClient.subscribe(`/topic/posts/${postItem.id}/comment`, onCommentOpenUp);
                contextContent.stompClient.subscribe(`/topic/posts/${postItem.id}/comment/update`, onCommentUpdate);
                contextContent.stompClient.subscribe(`/topic/posts/${postItem.id}/comment/delete`, onCommentDelete);
            }
        }
        setVisible(!visible)
    }
    return (
        <div class="review-post">
            <Modal title="Báo cáo file"
                footer={null}
                centered
                open={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
            >
                {/* <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p> */}
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={(val) => onFinish(val, postItem.id)}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    form={form}
                    preserve={false}
                >
                    <Form.Item
                        label="Đánh giá"
                        name="content"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập nội dung đánh giá!',
                            },
                        ]}
                    >
                        <Input defaultValue={postItem.content} />
                    </Form.Item>

                    <Form.Item
                        label="Điểm"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập mô tả chi tiết lý do',
                            },
                        ]}
                    >
                        <Rate defaultValue={postItem.scoring} />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Cập nhật bài viết
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <div class="review">
                {/* Heading Post */}

                <div class="heading-post">
                    <AvartarTime postItem={postItem}></AvartarTime>
                    {/* <Avatar shape="square" size={64} src={bookItem.urlPoster} alt="Han Solo" /> */}
                    <div className="heading-post--right">
                        <ul class="list-star">
                            <StarRatings
                                rating={
                                    postItem.scoring ? postItem.scoring : 0
                                }
                                starDimension="12px"
                                starSpacing="4px"
                                starRatedColor="rgb(230, 67, 47)"
                            />
                        </ul>
                        {
                            tokenService.getUser().id == postItem.userId && (
                                <Dropdown
                                    menu={{
                                        items,
                                    }}
                                    style={{ height: '30px' }}
                                >
                                    <a onClick={(e) => e.preventDefault()}>
                                        <Space>
                                            <UnorderedListOutlined />
                                        </Space>
                                    </a>
                                </Dropdown>
                            )
                        }

                    </div>

                </div>

                {/* Body Post */}

                <ContentIntro postItem={postItem}></ContentIntro>
            </div>

            <div class="footer">
                <div>
                    <Divider className="bold-divider" />
                </div>

                <div class="button-comment">
                    <Button style={{ border: 'none' }} icon={<LikeOutlined />} onClick={handleLikeClick}>
                        Like ({likes})
                    </Button>
                    <Button id="button-open-comment" style={{ border: 'none' }} icon={<MessageOutlined />} onClick={handleOpenComment} >Comment</Button>
                </div>
                <div>
                    <Divider className="bold-divider" />
                </div>
                {
                    visible && (<div class="commented">
                        <NestedComments comments={commentFormUserIntoPost} type={BSHAREnum.commentType.postComment} />
                    </div>)
                }

                <div>
                    <Divider className="bold-divider" />
                </div>
                <div class="commenting">
                    <div class="avartar" style={{ width: '60px' }}>
                        <Avatar shape='round' src={userInfo?.urlAvatar} size={50} />
                    </div>
                    <Input
                        style={{ backgroundColor: '#d9d9d9', color: 'black' }}
                        placeholder="Viết bình luận"
                        rows={4}
                        onChange={(e) => setCommentText(e.target.value)}
                    />
                    <SendOutlined style={{ color: 'blue', marginLeft: '10px' }} onClick={handleCommentSubmit} />
                </div>


            </div>

        </div>
    )
}

export default ReviewPost
