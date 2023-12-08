import AvartarTime from "~/components/ui/AvartarTime/AvartarTime"
import "./reviewPost.css"
import { StarFilled } from '@ant-design/icons';
import ContentIntro from "../Content Intro/ContentIntro";
import { Button, Divider, Select, Avatar } from 'antd';
import { Input } from 'antd';
import { LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { DeleteOutlined, EditOutlined, EllipsisOutlined, SettingOutlined, SendOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import React, { useState } from 'react';
import Avartar from "~/components/ui/Avartar/Avartar";
// import CommentPost from "../PostComment/PostComment";
// import PostComment from "../PostComment/PostComment";
import StarRatings from "react-star-ratings";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCommentOfPostAsync } from "~/slices/user";
import { convertCommentWithParentId } from "~/helper/format";
import NestedComments from "~/components/comment/NestedComment";
import BSHAREnum from "~/helper/BSHAREenum";
import { createCommentAsync } from "~/slices/user";
import moment from "moment";
import tokenService from "~/services/token.service";
moment.locale('vi');
// const cho dropdown tất cả các bình luận

const ReviewPost = ({ postItem }) => {
    console.log(postItem)
    const dispatch = useDispatch()
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [commentFormUserIntoPost, setCommentFormUserIntoPost] = useState([]);
    const [visible, setVisible] = useState(false);
    const handleLikeClick = () => {
        setLikes(likes + 1);
    };
    const items = [
        {
            label: <span ><EditOutlined style={{ width: '32px' }} />Sửa</span>,
            key: '0',
        },
        {
            label: <span ><DeleteOutlined style={{ width: '32px' }} />Xoá</span>,
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
                console.log(convertCommentWithParentId(data.data))
                setCommentFormUserIntoPost(convertCommentWithParentId(data.data))

            })
            .catch(e => {
                return e.messege
            });
    }, [])
    return (
        <div class="review-post">
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
                    <Button id="button-open-comment" style={{ border: 'none' }} icon={<MessageOutlined />} onClick={() => setVisible(!visible)} >Comment</Button>
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
                        <Avatar shape='round' src={postItem.urlAvatarUser} size={50} />
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
