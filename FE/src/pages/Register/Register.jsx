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
            <div className='form'>
                <div className="form_title">
                    <img src={img2} alt="img2" />
                    <h1>LIB SHARE</h1>
                </div>
                <div className='form_register'>
                    <h1>Đăng kí</h1>
                    <p>Chào mừng bạn đã đến với lib share</p>
                    <Form style={{ display: 'flex', flexDirection: "column" }}>
                        <Input style={{ width: '300px', height: '45px', marginBottom: '33px', background: "#224957" }} placeholder="Email" />
                        <Input style={{ width: '300px', height: '45px', marginBottom: '33px', background: "#224957" }} placeholder="Mật khẩu" />
                        <Input style={{ width: '300px', height: '45px', marginBottom: '33px', background: "#224957" }} placeholder="Nhập lại mật khẩu" />
                        <Button style={{ width: '300px', height: '54px', marginBottom: '36px' }} >Đăng kí </Button>
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