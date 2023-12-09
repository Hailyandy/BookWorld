import React, { createElement, useState } from "react";

import { Rate, Avatar, Tooltip, Button } from "antd";
import { Comment } from "@ant-design/compatible";
import {
    DislikeFilled,
    DislikeOutlined,
    LikeFilled,
    LikeOutlined,
} from "@ant-design/icons";
import "./comment.css";
import StarRatings from "react-star-ratings";
import CreateComment from "~/components/form/PostComment/CreateComment";
import BSHAREnum from "~/helper/BSHAREenum";
import { Typography } from 'antd';
import moment from "moment";
moment.locale('vi');
const { Title, Text, Paragraph } = Typography;
const CommentItem = ({ comment, type, children }) => {
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState(null);
    const [visible, setVisible] = useState(false);
    // console.log(comment);
    // console.log(children);
    const like = () => {
        setLikes(1);
        setDislikes(0);
        setAction("liked");
    };
    const dislike = () => {
        setLikes(0);
        setDislikes(1);
        setAction("disliked");
    };
    const actions = [

        <Tooltip >
            <span >{moment(comment.createdOn).fromNow()}</span>
        </Tooltip>,
        <span key="comment-list-reply-to-0" onClick={() => setVisible(!visible)}>Phản hồi</span>,
    ];


    return (
        comment && (
            <Comment
                className="comment-container"
                actions={actions}
                // author={<a className="author-comment-name">{comment.userName}</a>}
                avatar={
                    <div className="avatar-container">
                        <Avatar src={comment.urlAvatarUser} alt="Han Solo" />

                        <Button style={{
                            backgroundColor: "var(--button-default-background-color)",
                            marginTop: "4px"
                        }}
                            type="primary" shape="round"  >
                            Theo dõi
                        </Button>
                    </div>

                }
                content={
                    type == BSHAREnum.commentType.bookComment ?
                        (<>
                            <a className="author-comment-name">{comment.userName}</a>
                            <StarRatings
                                rating={comment.star}
                                starDimension="15px"
                                starSpacing="4px"
                                starRatedColor="rgb(230, 67, 47)"
                            />
                            <Paragraph ellipsis={
                                {
                                    rows: 6,
                                    expandable: true,
                                    symbol: "Tiếp"
                                }
                            } >
                                {comment.content}
                            </Paragraph>


                        </>) : (
                            <div className="comment-content-container">
                                <span className="author-comment-name">{comment.userName}</span>
                                <Paragraph ellipsis={
                                    {
                                        rows: 6,
                                        expandable: true,
                                        symbol: "Tiếp"
                                    }
                                } >
                                    {comment.content}
                                </Paragraph>
                            </div>
                        )
                }

            >
                {
                    visible && <CreateComment fatherComment={comment} setVisible={setVisible} visible={visible} />
                }

                {children}
            </Comment>
        )
    );
};

export default CommentItem;
