import React from 'react'
import img1 from "../assets/imgs/zyro-image 1.png"
import img2 from "../assets/imgs/images1.png"
import "./register.css"
import { Form, Button, Input, Space, Typography } from 'antd';

const { Text } = Typography;

function Register() {
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
                    <Form style={{ display: 'flex', flexDirection: "column" }}>
                        <Input style={{ width: '300px', height: '45px', marginBottom: '33px', background: "#224957" }} placeholder="Email" />
                        <Input style={{ width: '300px', height: '45px', marginBottom: '33px', background: "#224957" }} placeholder="Mật khẩu" />
                        <Input style={{ width: '300px', height: '45px', marginBottom: '33px', background: "#224957" }} placeholder="Nhập lại mật khẩu" />
                        <Button style={{
                            borderRadius: "10px",
                            background: "linear-gradient(180deg, rgba(67, 216, 205, 0.90) 0%, rgba(22, 38, 37, 0.00) 100%)",
                            width: "300px",
                            height: "64px",
                        }}>
                            <span style={{
                                color: "#224957",

                                fontFamily: "'Poppins', sans-serif",
                                fontSize: "18px",
                                fontStyle: "normal",
                                fontWeight: 700,
                                lineHeight: "normal"
                            }}>Đăng kí</span></Button>
                    </Form>
                    <Space direction="horizontal" style={{ width: '300px', display: "flex", justifyContent: "space-between" }}>
                        <Text type="secondary">Bạn đã có tài khoản ?</Text>
                        <Text type="success">Đăng nhập ngay</Text>
                    </Space>
                </div>
            </div>
        </div>
    )
}

export default Register
