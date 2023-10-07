import React from 'react'
import img1 from "../assets/imgs/zyro-image 1.png"
import img2 from "../assets/imgs/images1.png"
import "./user.css"
import { Form, Select, Button, Input } from 'antd';


function User() {
    return (
        <div className='register_container'>
            <img src={img1} alt="img1" />
            <div className='form'>
                <div className="form_title">
                    <img src={img2} alt="img2" />
                    <h1>LIB SHARE</h1>
                </div>
                <div className='form_register'>
                    <h1>Thông tin người dùng</h1>

                    <Form style={{ display: 'flex', flexDirection: "column" }}>
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
                        <Button style={{ width: '300px', height: '54px', marginBottom: '36px' }} >Ghi nhận</Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default User