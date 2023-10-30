import './css/generalInfor.css';
import { Checkbox, Row, Col, Button, Input, Card, Image, Typography } from 'antd';
import { useLoaderData, useParams } from 'react-router-dom'
import TheAuthorBookItem from '~/components/author/TheAuthorBookItem';
import Avartar from "~/components/ui/Avartar/Avartar";
import ReviewPost from "~/components/form/Review Post/ReviewPost";
const { TextArea } = Input;
const { Text, Title } = Typography;

//author profile và user profile dùng chung, khác nhau ở list item truyền vào, check role trước
//khi render
const GeneralProfile = () => {
    const { id } = useParams()
    const career = useLoaderData()
    let authorDetail = {
        images: 'https://t3.ftcdn.net/jpg/03/13/42/46/360_F_313424630_Uja1TnjdFhdz0bdbFnhMRuBTSIw25TWQ.jpg',
        authorName: 'Xuân Bách',
        bornPlace: 'Phú thọ',
        dateOfBirth: '30/02/2023',
        typeCompose: 'Hành động, nghệ thuật',
        authorDescription: 'Korman wrote his first book, , when he was 12 years old, for a coach who suddenly found himself teaching 7th grade English. He later took that episode and created a book out of it, as well, in "The Sixth Grade Nickname Game", wherein Mr. Huge was based on that 7th grade teacher.Korman moved to New York City, where he studied film and film writing. While in New York, he met his future wife; they now live in Long Island with their three children.He has published more than 50 books.',
    }
    let userDetail = {
        images: 'https://t3.ftcdn.net/jpg/03/13/42/46/360_F_313424630_Uja1TnjdFhdz0bdbFnhMRuBTSIw25TWQ.jpg',
        authorName: 'Xuân Bách',
        bornPlace: 'Phú thọ',
        dateOfBirth: '30/02/2023',
        typeCompose: 'Hành động, nghệ thuật',
        authorDescription: 'Korman wrote his first book, , when he was 12 years old, for a coach who suddenly found himself teaching 7th grade English. He later took that episode and created a book out of it, as well, in "The Sixth Grade Nickname Game", wherein Mr. Huge was based on that 7th grade teacher.Korman moved to New York City, where he studied film and film writing. While in New York, he met his future wife; they now live in Long Island with their three children.He has published more than 50 books.',
    }
    return (
        <div>
            <Card>
                {/* <div>
                    <BackButton />
                </div> */}
                <div className="description-containner1">
                    <div>
                        <Image className="image-ant" src={authorDetail.images} />
                    </div>

                    <Card
                        title={<h1>{authorDetail.authorName}</h1>}
                        bordered={false}
                        style={{ width: "70%" }}
                    >
                        <p>
                            <Text code strong>
                                {authorDetail.bornPlace}
                            </Text>
                        </p>
                        <p>{authorDetail.content}</p>
                        <Text strong>{authorDetail.dateOfBirth}</Text>
                        <p>{authorDetail.typeCompose}</p>
                        <p>{authorDetail.authorDescription}</p>
                    </Card>
                    <div className="book-friend">

                        <div className="friend">
                            <h2 class="friend-title">Bạn bè</h2>
                            <ul class="friend-list">
                                <li class="friend-item">
                                    <Avartar></Avartar>
                                </li>
                                <li class="friend-item">
                                    <Avartar></Avartar>
                                </li>
                                <li class="friend-item">
                                    <Avartar></Avartar>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </Card>
            <div className="profile-footer--list">
                <Title level={3}>Sách của Xuân Bách</Title>
                <div className='line-drawing'></div>
                <div class="author-book-list">
                    {/* <TheAuthorBookItem />
                    <TheAuthorBookItem />
                    <TheAuthorBookItem />
                    <TheAuthorBookItem />
                    <TheAuthorBookItem />
                    <TheAuthorBookItem />
                    <TheAuthorBookItem /> */}
                    <ReviewPost />
                    <ReviewPost />
                    <ReviewPost />
                    <ReviewPost />
                    <ReviewPost />
                </div>
            </div>
        </div>
    );

}
export default GeneralProfile
