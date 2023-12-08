import React, { useCallback, useState } from 'react';
import { UserOutlined, UserAddOutlined } from '@ant-design/icons';
import { TheAutofillItem } from '~/components';
import NotFoundPage from '../NotFound/NotFound';
import './friend-req-search-pp.css'
import { useDispatch } from 'react-redux';
import { searchUserByName, rejectFriendReq, acceptFriendReq, getListFriendRequest } from '~/slices/user';
import { debounce } from '~/helper/debounce';
import { useNavigate, useLoaderData, useParams } from 'react-router-dom';
import { Breadcrumb, Layout, Space, Card, List, Avatar, Button, Input, Tooltip, AutoComplete } from 'antd';
import notyf from '~/helper/notifyDisplay';
const { Meta } = Card;
const { Header, Footer, Sider, Content } = Layout;
const { Search } = Input;
const headerStyle = {
    textAlign: 'left',
    color: '#fff',
    height: 48,
    paddingInline: 50,
    lineHeight: '48px',
    backgroundColor: '#7dbcea',


};
const contentStyle = {
    padding: '1rem',
    paddingBottom: '0px',
    minHeight: 120,
    lineHeight: '120px',
    color: 'black',
    backgroundColor: '#fff',



};
const siderStyle = {
    lineHeight: '100px',
    color: '#fff',
    backgroundColor: 'white',
    width: '50% '
};
const FriendRequestSearchPeoplePage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const friendRequestList = useLoaderData()
    console.log(friendRequestList)
    const [options, setOptions] = useState([]);
    const changeInputSearch = (e) => {
        console.log(e)
    }
    const searchWhenClickSearchButton = (e) => {
        navigate(`../search-result/search-user/${e}`, { replace: true });
    }
    //chua hoan thanh, can code màn user cá nhân khi người ngoài muốn xem thông tin
    const onSelectSearchItem = (value) => {
        console.log('onSelect', value);
        // dispatch(getUserInformationAsync({ idUser: value }))
        //     .unwrap()
        //     .then(async data => {
        //         console.log(data)
        //         return data ? data.data : [];
        //     })
        //     .catch(e => {
        //         console.log(e);
        //         return []
        //     })
        // return data
        navigate(`../profileOther/${value}`, { relative: "path" });
    };


    /**
     * useCallback memoizes functions to avoid unnecessary re-renders and improve performance.
     */
    const debouncedSearch = useCallback(debounce((searchTextReturnFromDebounceHelper) => {
        console.log(searchTextReturnFromDebounceHelper)
        dispatch(searchUserByName({ name: searchTextReturnFromDebounceHelper }))
            .unwrap()
            .then(async data => {
                // notyf.success(BSHAREresource.notification_message.success.login)
                // console.log(data)
                // setResultSearch(data)
                setOptions(data.map((resultItem) => {
                    return {
                        value: resultItem.id,
                        label: (
                            <TheAutofillItem bookCover={resultItem.urlPoster} bookName={resultItem.name} bookAuthor={resultItem.authorName} />
                        ),
                    }
                }))
                return;
            })
            .catch(e => {
                console.log(e);
                setOptions([
                    {
                        value: '',
                        label: (
                            <NotFoundPage />
                        )
                    }
                ])
            })
    }, 1000), []);

    const onSearch = (value, _e, info) => {
        console.log(value)

        debouncedSearch(value)
        // setOptions(value ? searchResult(value) : []);

    };
    const handleAcceptFriendReq = ({ senderId }) => {
        dispatch(acceptFriendReq({ senderId }))
            .unwrap()
            .then(async data => {
                console.log(data)
                dispatch(getListFriendRequest())
            })
            .catch(e => {
                notyf.error(e.message)
            });

    }

    const handleRejectFriendReq = ({ senderId }) => {
        console.log(senderId)
        dispatch(rejectFriendReq({ senderId }))
            .unwrap()
            .then(async data => {
                console.log(data)
                dispatch(getListFriendRequest())
            })
            .catch(e => {
                notyf.error(e.message)
            });

    }
    return <div className="friend-req-search-pple-containner">
        <Layout style={{ margin: '0px auto', width: '80%' }}>

            <Layout style={{}} >
                <Header style={headerStyle}>Bạn có {friendRequestList.length} lời mời</Header>
                <Content style={contentStyle}>
                    <List
                        grid={{
                            gutter: 16,
                            xs: 1,
                            sm: 2,
                            md: 4,
                            lg: 4,
                            xl: 6,
                            xxl: 3,
                        }}
                        dataSource={friendRequestList}
                        renderItem={(friendItem) => (
                            <List.Item>
                                <Card
                                    bodyStyle={{ padding: '5%' }}
                                    style={{
                                        width: '100%',

                                    }}
                                    cover={
                                        <img
                                            alt="example"
                                            src={friendItem.urlAvatar ? friendItem.urlAvatar : "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"}
                                        />
                                    }
                                    actions={[
                                        <Space direction="vertical" size={'small'} style={{ width: '90%' }}>
                                            <Button style={{ width: '100%' }} type="primary" onClick={() => { handleAcceptFriendReq({ senderId: friendItem.id }) }}>Xác nhận</Button>
                                            <Button style={{ width: '100%' }} onClick={() => { handleRejectFriendReq({ senderId: friendItem.id }) }}>Xoá</Button>
                                        </Space>
                                    ]}
                                >
                                    <Meta style={{ fontSize: '12px' }}
                                        title={friendItem.name}
                                        description={friendItem.birthDate}
                                    />
                                </Card>
                            </List.Item>
                        )}
                    />
                </Content>

            </Layout>
            <Sider style={siderStyle} width={300}>
                <Card
                    title="Tìm kiếm bạn bè"
                    bordered={false}
                    style={{
                        borderRadius: '0px',
                        height: '100%'

                    }}
                >
                    <AutoComplete
                        popupMatchSelectWidth={'auto'}
                        allowClear
                        style={{
                            borderRadius: "16px",

                        }}
                        options={options}
                        onSelect={onSelectSearchItem}
                        onSearch={onSearch}
                        onChange={changeInputSearch}

                        size="large"
                    >
                        <Input.Search size="large" placeholder="Tìm kiếm bạn bè" enterButton onSearch={searchWhenClickSearchButton} />
                    </AutoComplete>

                </Card></Sider>
        </Layout>
    </div >
}
export default FriendRequestSearchPeoplePage;
