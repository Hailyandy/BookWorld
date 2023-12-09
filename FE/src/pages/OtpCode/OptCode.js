import React from 'react';
import { Button, Checkbox, Form, InputSpace, Space, Input } from 'antd';
import { useDispatch } from "react-redux";
import tokenService from '~/services/token.service';
import notyf from '~/helper/notifyDisplay';
import { sendOtpConfirmationAsync, resendOtpConfirmationAsync } from '~/slices/user';
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom'
import { useLoaderData, useParams } from 'react-router-dom'
import BSHAREresource from '~/helper/BSHAREresource';
import './otpcode.css'

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
const OtpCode = () => {
    const { username } = useParams()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log(username)
    const [form] = Form.useForm();
    const onFinish = (values) => {
        let { otp } = values
        console.log(otp)
        dispatch(sendOtpConfirmationAsync({ otp, username }))
            .unwrap()
            .then(async data => {

                navigate('/login', { replace: true });
                return;
            })
            .catch(e => {
                notyf.error(e.message)

            });
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    if (!username) {
        navigate(`/login`, { replace: true });
        return;
    }

    const resendOtpVerification = () => {

        dispatch(resendOtpConfirmationAsync({ username }))
            .unwrap()
            .then(async data => {
                // navigate('/login', { replace: true });
                return;
            })
            .catch(e => {
                console.log(e)
                // notyf.error(e.message)
            });
    }
    return (
        <div className="opt-code-containner center-horizontal center-vertical flex-column ">

            <h1 style={{ margin: '2rem' }}>Hãy kiểm tra Email của bạn để lấy mã xác nhận nhé</h1>
            <Form
                className="bordered-form"
                form={form}
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                    offset: 2
                }}
                style={{
                    maxWidth: 600,
                    width: '60%',
                    backgroundColor: 'white'
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Mã xác thực"
                    name="otp"
                    rules={[
                        {
                            required: true,
                            message: 'Hãy nhập mã xác thực!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 10,
                        span: 16,
                    }}

                >
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Gửi mã OPT
                        </Button>

                        <Button htmlType="button" onClick={resendOtpVerification} >
                            Gửi lại otp
                        </Button>
                    </Space>

                </Form.Item>
            </Form>
        </div>

    )
}



export default OtpCode;
