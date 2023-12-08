//Bản vá tạm thời, ko custom dropdown được thì dùng thôi
import React, { useState, useRef, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import TheAuthorBookItem from '~/components/author/TheAuthorBookItem';
import '~/components/Model/model.css'
import PropTypes from 'prop-types';
import BSHAREnum from '~/helper/BSHAREenum';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { DatePicker, Rate, Divider, Input, Select, Space, Button, Radio, Row, Col, Form } from 'antd';
import { useLoaderData } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { rateBookOrUploadFileAsync } from '~/slices/user';
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = 'DD/MM/YYYY';
const { TextArea } = Input;
let index = 0;
const plainOptions = ['Muốn đọc', 'Đang đọc', 'Đã đọc'];
let commonStyle = {
    width: '70%'
}
let fromItemStyle = {
    marginTop: '12px',
}
const ModelReviewPost = () => {
    const dispatch = useDispatch()
    const bookItem = useLoaderData()
    const onFinish = (values) => {
        const { scoring,
            bookshelfDefault,
            bookshelf,
            content,
            read_date
        } = values
        dispatch(rateBookOrUploadFileAsync({ bookId: bookItem.id, scoring, content }))
            .unwrap()
            .then(async data => {
                console.log(data)
                return data;
            })
            .catch(e => {
                console.log(e);
                return []
            })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    return (
        <div className="model-review-post-containner">
            <TheAuthorBookItem bookItem={bookItem} typeItem={BSHAREnum.modelReviewPostType.without_dropdown_button} />
            <Form

                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                name="basic" onFinish={onFinish}
                onFinishFailed={onFinishFailed}>
                {/* <Space direction='vertical' size={24}> */}

                {/* </Space> */}
                <Form.Item
                    label="Đánh giá của tôi"
                    name="scoring"
                    rules={[
                        {
                            required: true,
                            message: 'Nhập số điểm đánh giá!',
                        },
                    ]}
                    style={fromItemStyle}
                >
                    <Rate defaultValue={3} />
                </Form.Item>

                <Form.Item
                    label="Giá sách mặc định"
                    name="bookshelfDefault"
                    rules={[
                        {
                            required: true,
                            message: 'Chọn trạng thái sách!',
                        },
                    ]}
                    style={fromItemStyle}
                >
                    <Select
                        defaultValue="Đã đọc"
                        style={{
                            width: 120,
                        }}
                        onChange={handleChange}
                        options={[
                            {
                                value: 'Đã đọc',
                                label: 'Đã đọc',
                            },
                            {
                                value: 'Đang đọc',
                                label: 'Đang đọc',
                            },
                            {
                                value: 'Muốn đọc',
                                label: 'Muốn đọc',
                            },
                        ]}
                    />
                </Form.Item>
                <Form.Item
                    label="Bạn suy nghĩ gì?"
                    name="content"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                    style={fromItemStyle}
                >
                    <TextArea style={commonStyle} rows={4} />
                </Form.Item>
                {/* <Form.Item
                    label="Ngày đọc"
                    name="read_date"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                    style={fromItemStyle}
                >
                    <RangePicker

                        format={dateFormat}
                    />
                </Form.Item> */}
                <div style={{
                    textAlign: 'right',
                }}>
                    <Form.Item
                        wrapperCol={{
                            offset: 16,
                            span: 16,
                        }}

                    >
                        <Button style={{
                            backgroundColor: "#00c0a6",
                            width: "120px",
                            height: "48px",
                            fontSize: "24px",
                        }} type="primary" htmlType="submit">
                            Đăng bài
                        </Button>
                    </Form.Item>
                </div>


            </Form>
        </div>
    )
}

export default ModelReviewPost
