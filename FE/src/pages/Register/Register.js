import React from 'react'
import img1 from "../assets/imgs/zyro-image 1.png"
import img2 from "../assets/imgs/images1.png"
import "./register.css"
import { Form, Button, Input, Space, Typography, Select } from 'antd';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { registerAsync } from '~/slices/user';
import notyf from '~/helper/notifyDisplay';
import BSHAREresource from '~/helper/BSHAREresource';
const { Text } = Typography;
const { Option } = Select;
const InputPassword = Input.Password
function Register() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Success:', values);
        console.log(form.getFieldsValue())
        let { username, password, roles } = values
        // console.log({ username, password, roles: [roles] })
        dispatch(registerAsync({ username, password, roles: [roles] }))
            .unwrap()
            .then(data => {
                navigate(`BookWorld/#/otp-confirmation/${username}`, { replace: true });
                return;
            })
            .catch(e => {
                console.log(e)
                // notyf.error(e.message)
            });
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='register_container'>
            <img src={img1} alt="img1" />
            <div className='register-form'>
                <div className="form_title">
                    <img src={img2} alt="img2" />
                    <h1>BOOK WORLD</h1>
                </div>
                <div className='form_register'>
                    <h1>Đăng kí</h1>
                    <p>Chào mừng bạn đã đến với Book World</p>
                    <Form name="basic" form={form} style={{ display: 'flex', flexDirection: "column" }} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    type: 'email',
                                    required: true,
                                    message: 'Hãy nhập tên đăng nhập định dạng email!',
                                },
                            ]}>
                            <Input className='style-input' placeholder="Email đăng nhập" />
                        </Form.Item>


                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    min: 6,
                                    required: true,
                                    message: 'Hãy nhập mật khẩu có ít nhất 6 ký tự!',
                                },
                            ]}>
                            <InputPassword id='basic_password' className='style-input' placeholder="Mật khẩu" />
                        </Form.Item>


                        <Form.Item
                            name={['roles']}

                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn vai trò của mình',
                                },
                            ]}
                        >
                            <Select allowClear placeholder="Chọn role" className='style-input'>
                                <Option value="author">Tác giả</Option>
                                <Option value="admin">Admin</Option>
                                <Option value="user">Người dùng</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item>
                            <Button htmlType="submit" style={{
                                borderRadius: "10px",
                                background: "linear-gradient(180deg, rgba(67, 216, 205, 0.90) 0%, rgba(22, 38, 37, 0.00) 100%)",
                                width: "300px",
                                height: "60px",
                            }}>
                                <span style={{
                                    color: "#224957",

                                    fontFamily: "'Poppins', sans-serif",
                                    fontSize: "18px",
                                    fontStyle: "normal",
                                    fontWeight: 700,
                                    lineHeight: "normal"
                                }}>Đăng ký ngay</span></Button>
                        </Form.Item>
                    </Form>
                    <Space direction="horizontal" style={{ width: '300px', display: "flex", justifyContent: "space-between" }}>
                        <Text type="secondary">Bạn đã có tài khoản ?</Text>
                        <Text type="success"> <Link to="/login"> Đăng nhập</Link></Text>
                    </Space>
                </div>
            </div>
        </div>
    )
}

export default Register
