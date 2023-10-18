import React from 'react'
import img1 from "../assets/imgs/zyro-image 1.png"
import img2 from "../assets/imgs/images1.png"
import "./user.css"
import { Form, Select, Button, Input } from 'antd';


function User() {
    return (
        <div className='user_container'>
            <img src={img1} alt="img1" />
            <div className='user_form'>
                <div className="form_title">
                    <img src={img2} alt="img2" />
                    <h1>BOOK WORLD</h1>
                </div>
                <div className='form_user'>
                    <h1>Thông tin người dùng</h1>

                    <Form style={{ display: 'flex', flexDirection: "column", marginLeft: "80px" }}>
                        <Input style={{ width: '300px', height: '45px', marginBottom: '33px', background: "#224957" }} placeholder="Họ và tên" />
                        <div style={{ width: '300px', display: "flex", justifyContent: "space-between", marginBottom: '33px' }}>
                            <Select
                                defaultValue="--Giới tính--"
                                style={{ width: '135px', height: '45px' }}
                            />
                            <Select
                                style={{ width: '135px', height: '45px' }}
                                defaultValue="--Ngày sinh--"
                            />
                        </div>
                        <Input style={{ width: '300px', height: '45px', marginBottom: '33px', background: "#224957" }} placeholder="Số điện thoại" />
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
                            }}>Ghi nhận</span></Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default User
