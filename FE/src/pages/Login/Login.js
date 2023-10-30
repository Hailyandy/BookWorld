import React, { useState, useContext } from 'react'
import img1 from "../assets/imgs/zyro-image 1.png"
import img2 from "../assets/imgs/images1.png"
import "./login.css"
import { Form, Button, Input, Space, Typography } from 'antd';
import { Checkbox } from 'antd';
import { Link, Navigate, redirect, useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { loginAsync, getListFriendRequest } from '~/slices/user';
import { ConfigContext } from "~/context/GlobalContext";
import tokenService from '~/services/token.service';
import notyf from '~/helper/notifyDisplay';
import BSHAREresource from '~/helper/BSHAREresource';
// import authService from '~/services/auth.service';

const { Text } = Typography;
const InputPassword = Input.Password
function Login() {
    const config = useContext(ConfigContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [isRememberme, setIsRememerme] = useState(false)
    const userRemember = tokenService.getCredentials()
    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
        setIsRememerme(e.target.checked)
    };
    const onFinish = (values) => {
        console.log('Success:', values);
        console.log(form.getFieldsValue())
        let { username, password } = values
        if (isRememberme) {
            tokenService.setCredential(values)
        }
        dispatch(loginAsync({ username, password }))
            .unwrap()
            .then(async data => {
                console.log(data)
                tokenService.setUser(data)
                dispatch(getListFriendRequest('not param'))
                    .unwrap()
                    .then(async data => {
                        console.log('get all friend req success')

                    })
                    .catch(e => {
                        console.log(e);
                        console.log('get all friend req erroer')
                    })
                await config()
                navigate('/users', { replace: true });
                return;
            })
            .catch(e => {
                console.log(e);
            });
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='login_container'>
            <img src={img1} alt="img1" />
            <div className='login_form'>
                <div className="form_title">
                    <img src={img2} alt="img2" />
                    <h1>BOOK WORLD</h1>
                </div>
                <div className='form_login'>
                    <h1>Đăng nhập</h1>

                    <Form form={form} style={{ display: 'flex', flexDirection: "column" }} onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="on"
                        labelCol={{
                            span: 0,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        name="basic"
                        initialValues={{
                            remember: true,
                            username: userRemember?.username,
                            password: userRemember?.password
                        }}
                    >

                        <Form.Item

                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập tên đăng nhập!',
                                },
                            ]}

                        >
                            <Input className='style-input' placeholder="Tài khoản" />
                        </Form.Item>
                        <Form.Item

                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy nhập mật khẩu!',
                                },
                            ]}
                        >
                            <InputPassword className='style-input' placeholder="Mật khẩu" />
                        </Form.Item>


                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            wrapperCol={{
                                offset: 0,
                                span: 16,
                            }}
                        >
                            <Checkbox onChange={onChange}>Nhớ mật khẩu</Checkbox>
                        </Form.Item>


                        <Button

                            htmlType="submit"
                            style={{
                                borderRadius: "10px",
                                background: "linear-gradient(180deg, rgba(67, 216, 205, 0.90) 0%, rgba(22, 38, 37, 0.00) 100%)",
                                width: "300px",
                                height: "64px",

                            }}
                        >
                            <span style={{
                                color: "#224957",

                                fontFamily: "'Poppins', sans-serif",
                                fontSize: "18px",
                                fontStyle: "normal",
                                fontWeight: 700,
                                lineHeight: "normal"
                            }}>Đăng nhập</span></Button>
                    </Form>

                    <Space direction="horizontal" style={{ width: '300px', display: "flex", justifyContent: "space-between" }}>
                        <Text type="secondary">Bạn chưa có tài khoản ?</Text>
                        <Text type="success">
                            <Link to="/register"> Đăng ký ngay</Link>
                        </Text>
                    </Space>
                </div>
            </div>
        </div >
    )
}

export default Login
