import "./selectItem.css"
import {
    EyeOutlined,
    HeartOutlined,
    ShoppingCartOutlined,
  } from '@ant-design/icons';

const SelectItem = () => {
    return(
        <div class = "selectItem">
        <span class = "bookjacket-image" 
            style={{ width: "160px",
                     height: "220px" }}>

            </span>
        <div class="icon">
            <EyeOutlined />
            <ShoppingCartOutlined />
            <HeartOutlined />
        </div>
            
        <div class = "book-title">
          <p class = "title">Hôm nay tôi thất tình</p>
          <p class = "author-name"> Hạ Vũ</p>
          <p class= "price">20.000 VNĐ</p>
        </div>
      </div>
    )
}

export default SelectItem