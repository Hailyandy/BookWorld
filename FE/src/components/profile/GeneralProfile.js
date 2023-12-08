import './css/generalInfor.css';
import { Checkbox, Row, Col, Button, Input, Card, Image, Typography, Space } from 'antd';
import { useLoaderData, useParams } from 'react-router-dom'
import TheAuthorBookItem from '~/components/author/TheAuthorBookItem';
import Avartar from "~/components/ui/Avartar/Avartar";
import ReviewPost from "~/components/form/Review Post/ReviewPost";
import { useSelector } from 'react-redux';
const { TextArea } = Input;
const { Text, Title } = Typography;

//author profile và user profile dùng chung, khác nhau ở list item truyền vào, check role trước
//khi render
const GeneralProfile = () => {
    const { id } = useParams()
    const dataProfile = useLoaderData()
    const profileInfo = dataProfile.userInfor
    const userPostList = dataProfile.postList
    const userStateFormSlice = useSelector(state => state.users);
    return (
        <div className='general-profile--containner'>
            <Card>
                {/* <div>
                    <BackButton />
                </div> */}
                <div className="description-containner1">
                    <div>
                        <Image className="image-ant" src={profileInfo.urlAvatar} />
                    </div>

                    <Card
                        title={<h1>{profileInfo.name}</h1>}
                        bordered={false}
                        style={{ width: "70%" }}
                    >
                        <Space direction='vertical' size={16}>
                            <Text strong >
                                Quê quán: <Text italic style={{ fontWeight: '400' }}>{profileInfo.nativePlace}</Text>
                            </Text>
                            <Text strong >Ngày sinh: <Text italic style={{ fontWeight: '400' }}>{profileInfo.birthDate}</Text></Text>
                            <Text strong>Tên đăng nhập: <Text italic style={{ fontWeight: '400' }}>{profileInfo.userName}</Text></Text    >
                        </Space>

                    </Card>

                </div>
            </Card>
            <div className="profile-footer--list">
                <Title level={2}>Bài đăng của {profileInfo.name}</Title>
                <div className='line-drawing'></div>
                <div class="author-book-list">
                    {
                        userStateFormSlice.postList.map((postItem) => {
                            return <ReviewPost postItem={postItem} />
                        })
                    }
                </div>
            </div>
        </div>
    );

}
export default GeneralProfile
