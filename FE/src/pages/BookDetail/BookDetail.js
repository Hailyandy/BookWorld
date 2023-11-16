import './bookdetail.css'
import ContentIntro from '~/components/form/Content Intro/ContentIntro'
import { message, Button, Input, Space, Row, Col, Rate, Avatar, Tooltip, List, Upload } from 'antd'
import moment from "moment";
import StarRatings from "react-star-ratings";
import { AudioOutlined, FilterOutlined } from '@ant-design/icons';
import CommentItem from '~/components/comment/commentItem/CommentItem';
import { useLoaderData } from "react-router-dom"
import { formatToDate } from '~/helper/format';
import { uploadFileFirebase } from '~/helper/firebaseUploadFile';
import { CustomUpload } from '~/components';
const { Search } = Input;
const propsUploadButton = {
    name: 'file',
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
            uploadFileFirebase(info.file.originFileObj)
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};
const BookDetailPage = () => {
    const bookDetail = useLoaderData()
    console.log(bookDetail)
    const bookItem = {
        star: 10,
        numReviews: 2,
        publisher: 'Đh Quốc gia Hà Nội',
        pageTotal: 300,
        publishDate: '20/9/1972',
        typeBook: 'Trinh Thám'
    }
    const onSearch = (value, _e, info) => console.log(info?.source, value);
    const commentData = [
        {
            star: 5,

            author: 'Han Solo',
            avatar: 'https://joeschmoe.io/api/v1/random',
            content: (
                <p>
                    We supply a series of design principles, practical patterns and high quality design
                    resources (Sketch and Axure), to help people create their product prototypes beautifully and
                    efficiently.
                </p>
            ),
            datetime: (
                <Tooltip title="2016-11-22 11:22:33">
                    <span>{moment('2016-11-22 11:22:33').fromNow()}</span>
                </Tooltip>
            ),
        },
        {
            star: 5,

            author: 'Han Solo',
            avatar: 'https://joeschmoe.io/api/v1/random',
            content: (
                <p>
                    We supply a series of design principles, practical patterns and high quality design
                    resources (Sketch and Axure), to help people create their product prototypes beautifully and
                    efficiently.
                </p>
            ),
            datetime: (
                <Tooltip title="2016-11-22 10:22:33">
                    <span>{moment('2016-11-22 11:22:33').fromNow()}</span>
                </Tooltip>
            ),
        },
    ];
    return (
        <div className="book-detail-containner">
            <div className="book-detail-containner--left">
                <div class="body-post">
                    <div class="bookjacket-intro">
                        {/* <span style={{
                            width: "120px",
                            height: "120px"
                        }}
                            class="bookjacket-image"></span> */}
                        <Avatar shape='square' size={200} src={bookDetail.urlPoster} alt="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg" />
                        <Space direction='vertical'  >
                            <Button style={{
                                backgroundColor: "var(--button-default-background-color)",
                                marginTop: "20px",
                                width: '100%'
                            }}
                                type="primary" shape="round"  >
                                Tạo câu hỏi
                            </Button>
                            <CustomUpload />
                        </Space>
                    </div>

                </div>
            </div>
            <div className="book-detail-containner--center">
                <div class="book-content-intro">
                    <h1 class="title">{bookDetail.name}</h1>
                    <h2 class="author">{bookDetail.authorName}</h2>
                    <div className="star-rating-book">
                        <StarRatings
                            rating={
                                0
                            }
                            starDimension="16px"
                            starSpacing="4px"
                            starRatedColor="rgb(230, 67, 47)"
                        />
                        <span class="avg-book-rating">{
                            bookDetail.scoring > 0
                                ? bookDetail.star / bookDetail.numReviews
                                : 0
                        }</span>
                    </div>
                    <h3>Nhà xuất bản: {bookDetail.publisher} </h3>
                    <h3>{bookDetail.numberPages} trang</h3>
                    <h3>Xuất bản: {formatToDate(bookDetail.publishDate, "dd/MM/yyyy")} </h3>
                    <h3>Thể loại: {bookDetail.genres.map(genreObject => {
                        return genreObject.name
                    }).join(', ')} </h3>
                    <p class="content-intro">industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lore</p>
                </div>
                <section className="book-review">
                    <h1>Các đánh giá về sách</h1>
                    <Row
                        style={{ marginBottom: '2rem' }}>
                        <Col span={8}>
                            <Search
                                placeholder="input search text"
                                onSearch={onSearch}
                                style={{
                                    width: '95%',
                                }}
                            />
                        </Col>
                        <Col span={16}>
                            <Button
                                type="default"
                                icon={<FilterOutlined />}
                            >
                                Lọc
                            </Button>
                        </Col>
                    </Row>
                    <Row >
                        <Col span={24}>
                            {/* <CommentItem comment={commentItem} /> */}
                            <List
                                className="comment-list"
                                header={`${commentData.length} replies`}
                                itemLayout="horizontal"
                                dataSource={commentData}
                                renderItem={(item) => (
                                    <li>
                                        <CommentItem
                                            comment={item}
                                        >
                                            <CommentItem
                                                comment={item}
                                            />
                                        </CommentItem>
                                    </li>
                                )}
                            />
                        </Col>
                    </Row>
                </section>
            </div>

            <div className="book-detail-containner--right">

            </div>
        </div>
    )
}
export default BookDetailPage
