import './css/authorInfor.css';
import { Checkbox, Row, Col, Button, Input, Card, Image, Typography } from 'antd';
import { useLoaderData, useParams } from 'react-router-dom'
import TheAuthorBookItem from 'components/author/TheAuthorBookItem';
const { TextArea } = Input;
const { Text, Title } = Typography;
const onChange = (e) => {
    console.log(e);
};
const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4',
    'Option 5', 'Option 6', 'Option 7', 'Option 8',
    'Option 9', 'Option 10', 'Option 11', 'Option 12'];
const AuthorInfor = () => {
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
    return (
        <div>
            <Card>
                {/* <div>
                    <BackButton />
                </div> */}
                <div className="description-containner1">
                    <Image className="image" src={authorDetail.images} />

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
                </div>
            </Card>
            <Title level={3}>Sách của Xuân Bách</Title>
            <div className='line-drawing'></div>
            <div class="author-book-list">
                <TheAuthorBookItem />
                <TheAuthorBookItem />
                <TheAuthorBookItem />
                <TheAuthorBookItem />
                <TheAuthorBookItem />
                <TheAuthorBookItem />
                <TheAuthorBookItem />
            </div>
        </div>
    );

}
export default AuthorInfor
