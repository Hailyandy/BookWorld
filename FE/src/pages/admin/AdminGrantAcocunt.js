import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Space, Table, Tag } from 'antd';
import { useLoaderData } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { acceptAccountAsync, getAllNeedAcceptAccountAsync } from '~/slices/user';

function AdminGrantAcocunt(props) {
    const [accountNeedAccept, setAccountNeedAccept] = useState(useLoaderData())
    const dispatch = useDispatch()
    const columns = [
        {
            title: 'Tên đăng nhập',
            dataIndex: 'userName',
            key: 'userName',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Tên thật',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'SĐT',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Quê quán',
            dataIndex: 'nativePlace',
            key: 'phone',
        },
        {
            title: 'Trạng thái',
            key: 'enabled',
            dataIndex: 'enabled',
            render: (status, record) => (
                <>
                    <Tag color={status == true ? 'green' : 'volcano'} key={status} onClick={() => {
                        handleAcceptAccount(record.id)
                    }}>
                        {status == true ? 'Đã Kích hoạt' : 'Chưa kích hoạt'}
                    </Tag>
                </>
            ),
        }
    ];
    const handleAcceptAccount = (authorId) => {
        dispatch(acceptAccountAsync({ authorId }))
            .unwrap()
            .then(async data => {
                dispatch(getAllNeedAcceptAccountAsync())
                    .unwrap()
                    .then(async data => {
                        console.log(data)
                        setAccountNeedAccept(data)
                    })
                    .catch(e => {
                        console.log(e);
                        return []
                    })
            })
            .catch(e => {
                console.log(e);
            })
    }
    return (
        <TransitionGroup>
            <CSSTransition
                className="container result"
                classNames="fade"
                timeout={{ enter: 800, exit: 500 }}
                appear
                transitionAppearTimeout={500}>
                <div className="result">
                    <Table columns={columns} dataSource={accountNeedAccept} />
                </div>
            </CSSTransition>
        </TransitionGroup>
    );
}



export default AdminGrantAcocunt;
