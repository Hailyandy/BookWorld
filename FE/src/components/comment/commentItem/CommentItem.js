import React, { createElement, useState } from "react";
import moment from "moment";
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
const CommentItem = ({ comment, children }) => {
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState(null);
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
        <Tooltip key="comment-basic-like" title="Like">
            <span onClick={like}>
                {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
                <span className="comment-action">{likes}</span>
            </span>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="Dislike">
            <span onClick={dislike}>
                {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
                <span className="comment-action">{dislikes}</span>
            </span>
        </Tooltip>,
        <span key="comment-list-reply-to-0">Reply to</span>,
    ];


    return (
        comment && (
            <Comment
                actions={actions}
                author={<a className="author-comment-name">{comment.author}</a>}
                avatar={
                    <div className="avatar-container">
                        <Avatar src={comment.avatar} alt="Han Solo" />

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
                    <>
                        <StarRatings
                            rating={comment.star}
                            starDimension="15px"
                            starSpacing="4px"
                            starRatedColor="rgb(230, 67, 47)"
                        />
                        <p>{comment.content}</p>
                    </>
                }
                datetime={
                    <Tooltip title="2016-11-22 11:22:33">
                        <span className="author-comment-name">{moment(comment.datetime).fromNow()}</span>

                        {/* <Rate
                            style={{
                                position: "absolute",
                                zIndex: "1",
                                fontSize: "20px",
                                transform: "translate(0, -15%)",
                                right: "0px",
                                lineHeight: "14px",
                            }}
                        /> */}
                    </Tooltip>
                }
            >
                {children}
            </Comment>
        )
    );
};

export default CommentItem;
