import React, { useEffect, useState } from 'react';
import VirtualList from 'rc-virtual-list';
import { Avatar, List, message, Space } from 'antd';
import './bookrank.css'
import { useLoaderData } from 'react-router-dom';
import BSHAREnum from '~/helper/BSHAREenum';
const fakeDataUrl =
    'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
const ContainerHeight = 430;
const BookRankPage = () => {
    const [data, setData] = useState([]);
    const top50Book = useLoaderData()
    console.log(top50Book)
    const appendData = () => {
        fetch(fakeDataUrl)
            .then((res) => res.json())
            .then((body) => {
                setData(data.concat(body.results));
                message.success(`${body.results.length} more items loaded!`);
            });
    };
    useEffect(() => {
        appendData();
    }, []);
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
                            data={[...top50Book, ...top50Book]}
                            height={ContainerHeight}
                            itemHeight={30}
                            itemKey="id"
                        >
                            {(item, index) => (
                                <List.Item key={item.id}>
                                    <List.Item.Meta
                                        avatar={<Avatar shape='square' src={item.urlPoster} size={100} />}
                                        title={<a href={`${BSHAREnum.localHost.url}books/${item.id}`} className='font-size-24 '>{item.name}</a>}
                                        description={<Space direction='vertical' size={12} className='font-size-24 '>
                                            <span>{item.scoring}</span>
                                            <span>{item.authorName}</span>
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
