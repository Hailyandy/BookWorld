import { useLoaderData } from "react-router-dom"
import { Space, Table, Tag, Avatar } from 'antd';
import { useNavigate } from "react-router-dom";

const AuthorBook = () => {
    const bookAuthorCreated = useLoaderData()
    console.log(bookAuthorCreated)
    const navigate = useNavigate()
    const columns = [
        {
            title: 'Ảnh bìa',
            dataIndex: 'urlPoster',
            key: 'urlPoster',
            render: (text) => <Avatar shape="square" size={80} src={text} alt="Han Solo" />,
        },
        {
            title: 'Tên tác giả',
            dataIndex: 'authorName',
            key: 'authorName',

        },
        {
            title: 'Nhà xuất bản',
            dataIndex: 'publisher',
            key: 'publisher',
        },
        {
            title: 'Thể loại',
            dataIndex: 'genres',
            key: 'genres',
            render: (genres) => <span>{genres.map((gen) => {
                return `${gen.name}, `
            })}</span>,
        },
        {
            title: 'Tạo bài trắc nghiệm',
            key: 'operation',
            fixed: 'right',
            width: 200,
            render: (text, record, index) => {
                console.log(record)
                return (
                    <div >
                        <Space direction='horizontal' >
                            <a onClick={() => {
                                // window.location.replace(`review/edit/${record.id}`)
                                return navigate(`../create-test/${record.id}`)
                            }}>
                                Tạo bài
                            </a>
                            {/* <span >
                                    Xem bài
                                </span> */}
                        </Space>
                    </div>)
            },
        },
    ];
    return <div className="author-created-book-containner">
        <Table columns={columns} dataSource={bookAuthorCreated} />
    </div>
}

export default AuthorBook
