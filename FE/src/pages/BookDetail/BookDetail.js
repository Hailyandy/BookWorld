import './bookdetail.css'
import ContentIntro from '~/components/form/Content Intro/ContentIntro'
import { message, Button, Input, Space, Row, Col, Rate, Avatar, Tooltip, List, Upload, Typography } from 'antd'
import moment from "moment";
import StarRatings from "react-star-ratings";
import { AudioOutlined, FilterOutlined } from '@ant-design/icons';
import CommentItem from '~/components/comment/commentItem/CommentItem';
import { useLoaderData } from "react-router-dom"
import { formatToDate } from '~/helper/format';
import { uploadFileFirebase } from '~/helper/firebaseUploadFile';
import { CustomUpload } from '~/components';
import { useDispatch } from 'react-redux';
import getBase64 from '~/helper/getBase64';
import { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { addPdfForABookAsync } from '~/slices/user';
import notyf from '~/helper/notifyDisplay';
import NestedComments from '~/components/comment/NestedComment';
import BSHAREnum from '~/helper/BSHAREenum';
const { Title, Text, Paragraph } = Typography;
const { Search } = Input;

const BookDetailPage = () => {
    const bookDetail = useLoaderData()
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    console.log(bookDetail)
    const dispatch = useDispatch()
    const [state, setState] = useState({
        selectedFile: null,
        selectedFileList: [],
    });
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
    const customUpload = async ({ onError, onSuccess, file }) => {
        // firebase upload\
        // firebase upload\
        console.log('admin addbok')
        uploadFileFirebase(file).then((url) => {
            console.log(url)
            dispatch(addPdfForABookAsync({ idBook: bookDetail.id, urlPdf: url }))
                .unwrap()
                .then(async data => {
                    console.log(data)

                    notyf.success("Upload file thành công")
                    return data ? data : [];
                })
                .catch(e => {
                    console.log(e);
                    return []
                })
            setImageUrl(url)
        })
        setTimeout(() => {
            onSuccess("ok");
        }, 0);

    };

    const handleChange = info => {
        const nextState = {};

        switch (info.file.status) {
            case "uploading":
                console.log('upload complete')
                const file = // get file
                    getBase64(info.file.originFileObj).then(base64 => {
                        // setImageUrl(base64)
                        setLoading(false)
                    });
                setLoading(true)
                nextState.selectedFileList = [info.file];
                break;
            case "done":
                nextState.selectedFile = info.file;
                nextState.selectedFileList = [info.file];
                break;
            default:
                // error or removed
                nextState.selectedFile = null;
                nextState.selectedFileList = [];
        }
        setState(nextState);
    }
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
                            <Upload name="logo" listType="picture" customRequest={customUpload} onChange={handleChange}>
                                <Button icon={<UploadOutlined />}>Thêm file pdf</Button>
                            </Upload>
                        </Space>
                    </div>

                </div>
            </div>
            <div className="book-detail-containner--center">
                <div class="book-content-intro">
                    <h1 class="title">{bookDetail.name}</h1>
                    {/* {bookDetail.authorName} */}
                    <h2 class="author">Tác giả: aaaa</h2>
                    <div className="star-rating-book">
                        <StarRatings
                            rating={
                                bookDetail.scoring ? bookDetail.scoring : 0
                            }
                            starDimension="14px"
                            starSpacing="4px"
                            starRatedColor="rgb(230, 67, 47)"
                        />
                        <p class="avg-book-rating">{bookDetail.scoring ? bookDetail.scoring : 0}</p>
                    </div>
                    <h3>Nhà xuất bản:  <Text >{bookDetail.publisher}</Text> </h3>
                    <h3>Tổng số trang: <Text >{bookDetail.numberPages} trang</Text> </h3>
                    <h3>Xuất bản: {formatToDate(bookDetail.publishDate, "dd/MM/yyyy")} </h3>
                    <h3>Thể loại: {bookDetail.genres.map(genreObject => {
                        return genreObject.name
                    }).join(', ')} </h3>

                    <Paragraph ellipsis={
                        {
                            rows: 6,
                            expandable: true,
                            symbol: "Tiếp"
                        }
                    } >
                        <Text strong>Mô tả:</Text>  {bookDetail.introducing}
                    </Paragraph>
                </div>
                <section className="book-review">
                    {/* <h1>Các đánh giá về sách</h1> */}
                    {/* <Row
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
                    </Row> */}
                    <Row >
                        <Col span={24}>
                            {/* <CommentItem comment={commentItem} /> */}
                            {/* <List
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
                            /> */}
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
