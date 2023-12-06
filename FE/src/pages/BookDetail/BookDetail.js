import './bookdetail.css'
import ContentIntro from '~/components/form/Content Intro/ContentIntro'
import { Form, Modal, Table, Card, message, Button, Input, Space, Row, Col, Rate, Avatar, Tooltip, List, Upload, Typography, FloatButton } from 'antd'
import moment from "moment";
import StarRatings from "react-star-ratings";
import { AudioOutlined, FilterOutlined, FileOutlined, FilePdfOutlined } from '@ant-design/icons';
import CommentItem from '~/components/comment/commentItem/CommentItem';
import { useLoaderData } from "react-router-dom"
import { formatToDate } from '~/helper/format';
import { uploadFileFirebase } from '~/helper/firebaseUploadFile';
import { CustomUpload } from '~/components';
import { useDispatch } from 'react-redux';
import getBase64 from '~/helper/getBase64';
import { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { addPdfForABookAsync, createReportAboutPdfAsync } from '~/slices/user';
import notyf from '~/helper/notifyDisplay';
import NestedComments from '~/components/comment/NestedComment';
import BSHAREnum from '~/helper/BSHAREenum';
import { useNavigate } from 'react-router-dom';
import VirtualList from 'rc-virtual-list';
import NotFoundPage from '../NotFound/NotFound';
const { Title, Text, Paragraph } = Typography;
const { Search } = Input;
const BookDetailPage = () => {
    const data = useLoaderData()
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [form] = Form.useForm();
    const navigate = useNavigate()
    console.log(data)
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
            dispatch(addPdfForABookAsync({ idBook: data.bookDetail.id, urlPdf: url }))
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const onFinish = (values, pdf_id) => {
        console.log('Success:', values);
        let { reason, description } = values
        dispatch(createReportAboutPdfAsync({ reason, description, pdf_id }))
            .unwrap()
            .then(async data => {
                handleOk()
                return data;
            })
            .catch(e => {
                return e.messege
            });

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="book-detail-containner">
            <div className="book-detail-containner--left">
                <div class="body-post">
                    <div class="bookjacket-intro">
                        <Avatar shape='square' size={200} src={data.bookDetail.urlPoster} alt="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg" />
                        <Space direction='vertical'  >
                            <Button style={{
                                backgroundColor: "var(--button-default-background-color)",
                                marginTop: "20px",

                            }}
                                type="primary" shape="round" onClick={() => {
                                    return navigate(`../fun-quiz/${data.bookDetail.id}`)
                                }} >
                                Làm bài trắc nghiệm
                            </Button>
                            <Upload name="logo" listType="picture" customRequest={customUpload} onChange={handleChange}>
                                <Button icon={<UploadOutlined />}>Thêm file pdf</Button>
                            </Upload>
                        </Space>
                    </div>
                    <section className="list-containner" style={{ width: '200px', marginTop: '20px' }}>
                        <h3 style={{ textAlign: 'center' }}>Bảng điểm</h3>
                        {data.userTopScore.length > 0 ? (
                            <List >
                                <div >

                                    <VirtualList
                                        data={[...data.userTopScore]}
                                        height={300}
                                        width={10}
                                        itemHeight={20}
                                        itemKey='idddddd'
                                    >
                                        {(item, index) => (
                                            <List.Item key={item.bookId} >
                                                <List.Item.Meta
                                                    avatar={<Avatar shape='round' src={item.urlAvatarUser} size={70} />}
                                                    title={item.userName}
                                                    description={<Space direction='vertical' size={0}>
                                                        <span>Điểm làm bài: {item.score}</span>

                                                    </Space>}
                                                />

                                            </List.Item>
                                        )}
                                    </VirtualList>
                                </div>
                            </List>
                        ) : <NotFoundPage />}
                    </section>
                </div>

            </div>
            <div className="book-detail-containner--center">
                <div class="book-content-intro">
                    <h1 class="title">{data.bookDetail.name}</h1>
                    {/* {data.bookDetail.authorName} */}
                    <h2 class="author"> <Text >Tác giả:</Text> {data.bookDetail.publisher} </h2>
                    <div className="star-rating-book">
                        <StarRatings
                            rating={
                                data.bookDetail.scoring ? data.bookDetail.scoring : 0
                            }
                            starDimension="14px"
                            starSpacing="4px"
                            starRatedColor="rgb(230, 67, 47)"
                        />
                        <p class="avg-book-rating">{data.bookDetail.scoring ? data.bookDetail.scoring : 0}</p>
                    </div>
                    <h3>Nhà xuất bản:  <Text >{data.bookDetail.publisher}</Text> </h3>
                    <h3>Tổng số trang: <Text >{data.bookDetail.numberPages} trang</Text> </h3>
                    <h3>Xuất bản: {formatToDate(data.bookDetail.publishDate, "dd/MM/yyyy")} </h3>
                    <h3>Thể loại: {data.bookDetail.genres.map(genreObject => {
                        return genreObject.name
                    }).join(', ')} </h3>

                    <Paragraph ellipsis={
                        {
                            rows: 6,
                            expandable: true,
                            symbol: "Tiếp"
                        }
                    } >
                        <Text strong>Mô tả:</Text>  {data.bookDetail.introducing}
                    </Paragraph>

                </div>
                <section className="list-containner">
                    <h3 style={{ textAlign: 'center' }}>File pdf</h3>
                    {data.bookDetail.pdfs.length > 0 ? (
                        <List>
                            <div >

                                <VirtualList
                                    data={[...data.bookDetail.pdfs]}
                                    height={400}
                                    itemHeight={30}
                                    itemKey='idddddd'
                                >
                                    {(item, index) => (
                                        <List.Item key={item.id} actions={[<Button key="list-loadmore-edit" style={{ backgroundColor: 'var(--warning-color)' }} onClick={showModal} >Báo cáo file pdf</Button>]}>
                                            <List.Item.Meta
                                                avatar={<Avatar shape='round' icon={<FilePdfOutlined />} size={70} style={{
                                                    backgroundColor: '#87d068',
                                                }} />}
                                                title={<h2 className='font-size-24' style={{ margin: '0px' }}>{item.userName}</h2>}
                                                description={<Space direction='vertical' size={0}>
                                                    <span>Điểm đánh giá: 0</span>
                                                    <a href={item.urlPdf} className="href">Tải file pdf</a>

                                                </Space>}
                                            />
                                            <Modal title="Báo cáo file"
                                                footer={null}
                                                centered
                                                open={isModalOpen}
                                                onOk={() => setIsModalOpen(false)}
                                                onCancel={() => setIsModalOpen(false)}
                                            >
                                                {/* <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p> */}
                                                <Form
                                                    name="basic"
                                                    labelCol={{
                                                        span: 8,
                                                    }}
                                                    wrapperCol={{
                                                        span: 16,
                                                    }}
                                                    style={{
                                                        maxWidth: 600,
                                                    }}
                                                    initialValues={{
                                                        remember: true,
                                                    }}
                                                    onFinish={(val) => onFinish(val, item.id)}
                                                    onFinishFailed={onFinishFailed}
                                                    autoComplete="off"
                                                    form={form}
                                                    preserve={false}
                                                >
                                                    <Form.Item
                                                        label="Lý do"
                                                        name="reason"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Nhập lý do chính!',
                                                            },
                                                        ]}
                                                    >
                                                        <Input />
                                                    </Form.Item>

                                                    <Form.Item
                                                        label="Mô tả chi tiết"
                                                        name="description"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'Nhập mô tả chi tiết lý do',
                                                            },
                                                        ]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                    <Form.Item
                                                        wrapperCol={{
                                                            offset: 8,
                                                            span: 16,
                                                        }}
                                                    >
                                                        <Button type="primary" htmlType="submit">
                                                            Tạo báo cáo
                                                        </Button>
                                                    </Form.Item>
                                                </Form>
                                            </Modal>
                                        </List.Item>
                                    )}
                                </VirtualList>
                            </div>
                        </List>
                    ) : <NotFoundPage />}
                </section>
            </div>

            <div className="book-detail-containner--right">

            </div>


        </div>
    )
}
export default BookDetailPage
