import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload, Form, Input, InputNumber, Button, Row, Col } from 'antd';
import React, { useState } from 'react';
import ImgCrop from 'antd-img-crop';
import "./bookmarket.css"
const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 12,
    },
};
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
const BookMarketPage = () => {
    const onFinish = (values) => {
        console.log(values);
    };
    const [fileList, setFileList] = useState([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
    ]);
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };
    return (

        <div className="bookmarket--container center-vertical">
            <div className="bookmarket--itemLeft">
                <ImgCrop rotationSlider>
                    <Upload
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
                        onChange={onChange}
                        onPreview={onPreview}
                    >
                        {fileList.length < 5 && '+ Upload'}
                    </Upload>

                </ImgCrop>

            </div>
            <div className="bookmarket--itemRight">
                <Form className="bordered-form" {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                    <Row span={24} >
                        <Col span={24} >
                            <h2>Thêm thông tin về cuốn sách của bạn</h2>
                        </Col>
                    </Row>
                    <Form.Item
                        name={['user', 'name']}
                        label="Name"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'email']}
                        label="Email"
                        rules={[
                            {
                                type: 'email',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'age']}
                        label="Age"
                        rules={[
                            {
                                type: 'number',
                                min: 0,
                                max: 99,
                            },
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item name={['user', 'website']} label="Website">
                        <Input />
                    </Form.Item>
                    <Form.Item name={['user', 'introduction']} label="Introduction">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            ...layout.wrapperCol,
                            offset: 12,
                        }}
                    >
                        <Button type="primary" htmlType="submit" style={{
                            borderRadius: "10px",
                            background: "var(--button-default-background-color)",
                        }}>
                            Đăng bán
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};
export default BookMarketPage;
