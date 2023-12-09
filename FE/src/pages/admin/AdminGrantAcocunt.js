import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Space, Table, Tag } from 'antd';
import { useLoaderData } from 'react-router-dom';
const columns = [
    {
        title: 'Câu hỏi',
        dataIndex: 'questionId',
        key: 'questionId',
        render: (text) => <span>{text}</span>,
    },
    {
        title: 'Câu trả lời người dùng',
        dataIndex: 'user_answer',
        key: 'user_answer',
    },
    {
        title: 'Câu trả lời đúng',
        dataIndex: 'correct_answer',
        key: 'correct_answer',
    },
    {
        title: 'Trạng thái',
        key: 'status',
        dataIndex: 'status',
        render: (status) => (
            <>
                <Tag color={status == "Đúng" ? 'green' : 'volcano'} key={status}>
                    {status.toUpperCase()}
                </Tag>
            </>
        ),
    }
];
function AdminGrantAcocunt(props) {
    const accountNeedAccept = useLoaderData()
    return (
        <TransitionGroup>
            <CSSTransition
                className="container result"
                classNames="fade"
                timeout={{ enter: 800, exit: 500 }}
                appear
                transitionAppearTimeout={500}>
                <div className="result">
                    <Table columns={columns} dataSource={[]} />
                </div>
            </CSSTransition>

        </TransitionGroup>
    );
}



export default AdminGrantAcocunt;
