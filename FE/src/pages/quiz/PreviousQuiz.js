import React, { useState } from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import { options } from '~/components/charts/BarChart';
const PreviousQuiz = ({ previousQuiz }) => {
    const [form] = Form.useForm();
    let dataCustom = previousQuiz.map((quiz) => {
        let option = quiz.optionDtos.map((option, index) => {
            return {
                [`options_text`]: option[`options_text`],
                [`id`]: option[`id`]
            }
        })
        return {
            ...quiz,
            option_1: option[0],
            option_2: option[1],
            option_3: option[2],
            option_4: option[3]
        }
    })
    // console.log(dataCustom)
    const columns = [
        {
            title: 'Câu hỏi',
            dataIndex: 'questionsText',
            width: '25%',

        },
        {
            title: 'Đáp án 1',
            dataIndex: 'option_1',
            width: '15%',
            render: (record) => {
                console.log(record)
                return <span>{record?.options_text}</span>
            },
        },
        {
            title: 'Đáp án 2',
            dataIndex: 'option_2',
            width: '15%',
            render: (record) => {
                return <span>{record?.options_text}</span>
            },
        },
        {
            title: 'Đáp án 3',
            dataIndex: 'option_3',
            width: '15%',
            render: (record) => {
                return <span>{record?.options_text}</span>
            },
        },
        {
            title: 'Đáp án 4',
            dataIndex: 'option_4',
            width: '15%',
            render: (record) => {
                return <span>{record?.options_text}</span>
            },
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) => {
                return <span>Chỉnh sửa câu hỏi</span>
            },
        },
    ];

    return (
        <Form form={form} component={false}>
            <Table
                bordered
                dataSource={dataCustom}
                columns={columns}
            />
        </Form>
    );
};
export default PreviousQuiz;
