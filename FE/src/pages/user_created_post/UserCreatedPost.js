import BookJacket from "~/components/ui/BookJacket/BookJacket"
import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import ReviewPost from "~/components/form/Review Post/ReviewPost";
import Avartar from "~/components/ui/Avartar/Avartar";
import { useLoaderData } from "react-router-dom";
import NotFoundPage from "../NotFound/NotFound";
import './userpostlist.css'
//{ userPost: [] }
const UserCreatedPost = ({ }) => {
    var dataLoader = useLoaderData()
    console.log(dataLoader)
    return (
        <div className="user-home-container">
            {/* Post Space */}
            <div className="post-space  margin-auto">
                <div class="list-post">
                    {
                        dataLoader.userPost.length > 0 ?
                            dataLoader.userPost.map((post) => {
                                return <ReviewPost postItem={post} />
                            }) : <NotFoundPage />
                    }
                </div>
            </div>
        </div>
    )

}

export default UserCreatedPost
