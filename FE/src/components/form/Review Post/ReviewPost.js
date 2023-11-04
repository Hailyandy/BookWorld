import AvartarTime from "~/components/ui/AvartarTime/AvartarTime"
import "./reviewPost.css"
import { StarFilled } from '@ant-design/icons';
import ContentIntro from "../Content Intro/ContentIntro";
import { Button, Divider } from 'antd';
import { Input } from 'antd';
import { LikeOutlined, MessageOutlined } from '@ant-design/icons';
import { EditOutlined, EllipsisOutlined, SettingOutlined,SendOutlined } from '@ant-design/icons';
import {Card } from 'antd';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import React, { useState } from 'react';
import Avartar from "~/components/ui/Avartar/Avartar";
import CommentPost from "../PostComment/PostComment";
import PostComment from "../PostComment/PostComment";

// const cho dropdown tất cả các bình luận
const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item (disabled)
        </a>
      ),
      icon: <SmileOutlined />,
      disabled: true,
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          3rd menu item (disabled)
        </a>
      ),
      disabled: true,
    },
    {
      key: '4',
      danger: true,
      label: 'a danger item',
    },
  ];





const { Meta } = Card;




const ReviewPost = () => {
    const [likes, setLikes] = useState(0);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');

    const handleLikeClick = () => {
        setLikes(likes + 1);
    };

    const handleCommentSubmit = () => {
        if (commentText.trim() !== '') {
        setComments([...comments, commentText]);
        setCommentText('');
    }
    };
    return (
        <div class="review-post">
            <div class="review">
                  {/* Heading Post */}

            <div class="heading-post">
                <AvartarTime></AvartarTime>
                <p class="status-title">Đánh giá một cuốn sách</p>
                <ul class="list-star">
                    <li class="star"><StarFilled /></li>
                    <li class="star"><StarFilled /></li>
                    <li class="star"><StarFilled /></li>
                    <li class="star"><StarFilled /></li>
                    <li class="star"><StarFilled /></li>
                </ul>
            </div>

            {/* Body Post */}

            <ContentIntro></ContentIntro>
            </div>

            <div class ="footer">
                <div>
                    <Divider className="bold-divider"/>
                </div>
                
                <div class= "button-comment">
                    <Button style={{ border: 'none' }} icon={<LikeOutlined />} onClick={handleLikeClick}>
                    Like ({likes})
                    </Button>
                    <Button style={{ border: 'none' }} icon={<MessageOutlined/>}>Comment</Button>
                </div>
                <div>
                    <Divider className="bold-divider"/>
                </div>
                <div class = "commented">
                    <Dropdown  menu={{ items }}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                           Tất cả các bình luận
                           <DownOutlined />
                        </Space>
                    </a>
                    </Dropdown>
                    <PostComment/>
                    <PostComment/>
                </div>
                <div>
                    <Divider className="bold-divider"/>
                </div>
                <div class = "commenting">
                    <div class = "avartar" style={{ width: '60px' }}>
                       <span class = "avatar-image"></span>
                    </div>
                    <Input 
                        style={{ backgroundColor: '#d9d9d9', color:'black'}}
                        placeholder =" Viết bình luận"
                        rows={4}
                        onChange={(e) => setCommentText(e.target.value)}
                    />
                    <SendOutlined style={{color:'blue', marginLeft: '10px'}}/>
                        
                    
                </div>
                

            </div>

        </div>
    )
}

export default ReviewPost
