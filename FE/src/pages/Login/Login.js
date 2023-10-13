import React from 'react'
import img1 from "../assets/imgs/zyro-image 1.png" 
import img2 from "../assets/imgs/images1.png"
import "./login.css"
import { Form, Button, Input, Space, Typography } from 'antd';
import { Checkbox } from 'antd';

const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
};

const { Text } = Typography;

function Login() {
    return (
        <div className='login_container'>
            <img  src={img1} alt="img1" />
            <div className='login_form'>
                <div className="form_title">
                    <img src={img2} alt="img2" />
                    <h1>BOOK WORLD</h1>
                </div>
                <div className='form_login'>
                    <h1>Đăng nhập</h1>

                    <Form style={{ display: 'flex', flexDirection: "column" }}>
                        <Input style={{ width: '300px', height: '45px', marginBottom: '33px', background: "#224957" }} placeholder="Tài khoản" />
                        <Input style={{ width: '300px', height: '45px', marginBottom: '33px', background: "#224957" }} placeholder="Mật khẩu" />
                        <div style={{ width: '300px', display: "flex", justifyContent: "space-between", marginBottom: '26px' }}>
                            <Checkbox onChange={onChange}>Nhớ mật khẩu</Checkbox>
                            <Text>Quên mật khẩu ?</Text>
                        </div>
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
                            }}>Đăng nhập</span></Button>
                    </Form>
                    <Space direction="horizontal" style={{ width: '300px', display: "flex", justifyContent: "space-between" }}>
                        <Text type="secondary">Bạn chưa có tài khoản ?</Text>
                        <Text type="success">Đăng ký ngay</Text>
                    </Space>
                </div>
            </div>
        </div>
    )
}

export default Login