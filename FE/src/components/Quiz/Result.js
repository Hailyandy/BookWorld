import React from 'react';
import PropTypes from 'prop-types';
import './quiz.css'
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Space, Table, Tag } from 'antd';
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
function Result(props) {
    console.log(props.answerFromBe)
    return (
        <TransitionGroup>
            <CSSTransition
                className="container result"
                classNames="fade"
                timeout={{ enter: 800, exit: 500 }}
                appear
                transitionAppearTimeout={500}>
                <div className="result">
                    <div>
                        Bạn đạt được <strong>{props.quizResult} điểm</strong>!
                    </div>

                    <Table columns={columns} dataSource={props.answerFromBe} />
                </div>
            </CSSTransition>

        </TransitionGroup>
    );
}

Result.propTypes = {
    quizResult: PropTypes.string.isRequired,
};

export default Result;
