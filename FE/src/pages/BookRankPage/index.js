import React, { useEffect, useState } from 'react';
import VirtualList from 'rc-virtual-list';
import { Avatar, List, message, Space } from 'antd';
import './bookrank.css'
import { useLoaderData } from 'react-router-dom';
import BSHAREnum from '~/helper/BSHAREenum';
import BSHAREresource from '~/helper/BSHAREresource';
import { generateUuid } from '~/helper/format';
import { Link } from 'react-router-dom';
import tokenService from '~/services/token.service';
const fakeDataUrl =
    'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
const ContainerHeight = 430;
const BookRankPage = () => {
    const [data, setData] = useState([]);
    const top50Book = useLoaderData()
    console.log(top50Book)
    // const appendData = () => {
    //     fetch(fakeDataUrl)
    //         .then((res) => res.json())
    //         .then((body) => {
    //             setData(data.concat(body.results));
    //             message.success(`${body.results.length} more items loaded!`);
    //         });
    // };
    // useEffect(() => {
    //     appendData();
    // }, []);
    // const onScroll = (e) => {
    //     if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
    //         appendData();
    //     }
    // };
    return (
        <div className="book-rank-containner">
            <section className="header">
                <h1 className='book-rank-header'>Những cuốn sách nổi bật</h1>
            </section>
            <section className="list-containner">
                <List>
                    <div >
                        <VirtualList
                            data={[...top50Book]}
                            height={ContainerHeight}
                            itemHeight={30}
                            itemKey='idddddd'
                        >
                            {(item, index) => (
                                <List.Item key={item.bookId}>
                                    <List.Item.Meta
                                        avatar={<Avatar shape='square' src={item.urlPoster} size={100} />}
                                        title={<Link to={`../${item.id}`} replace={true} className='font-size-24 '>{item.name}</Link>}
                                        description={<Space direction='vertical' size={0}>
                                            <span>Đánh giá: {item.scoring}/5</span>
                                            {/* <span>{item.publisher}</span> */}
                                            <span>{item.genres.map((genre) => {
                                                return <span>{genre.name} </span>
                                            })}</span>
                                        </Space>}
                                    />
                                    <div className='list-containner-rank'>#{index + 1}</div>
                                </List.Item>
                            )}
                        </VirtualList>
                    </div>

                </List>
            </section>

        </div>

    );
}

export default BookRankPage
