import "./fristhome.css"
import React, { useState } from 'react';
import { Button } from 'antd';
import imgApp from '../assets/imgs/App Store.png'
import imgPlay from '../assets/imgs/Google Play.png'


const FristHome = () => {
    return ( 
        <div className="home-container">
            <div className="content">
            <h1>Xin chào bạn đến với Book World</h1>
            <p>Chào mứng bạn đến với Book World - cộng đồng trực tuyến dành riêng cho những người đam mê sách! Tại Book World, chúng tôi tạo ra một không gian thú vị để bạn khám phá và chia sẻ sự đam mê về văn học.</p>
            
            <Button style={{
                            backgroundColor: "#00c0a6",
                            width: "250px",
                            height: "64px",
                            fontSize: "20px",
                        }}
            type="primary" shape="round"  >
            Đăng ký
          </Button>
          <div class = "app_connect">
          <img class = "img_connect" src= {imgApp}alt="imgApp"></img>
          <img class = "img_connect" src= {imgPlay}alt="imgPlay"></img>
          </div>
            </div>
        </div>
    )
}

export default FristHome