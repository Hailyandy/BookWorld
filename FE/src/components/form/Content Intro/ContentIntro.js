import "./contentIntro.css"
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Radio, Space, Divider, } from 'antd';
import { Avatar, Typography } from "antd"
const { Title, Text, Paragraph } = Typography;
const ContentIntro = ({ postItem }) => {
    return (
        <div class="body-post">
            <div class="bookjacket-intro">
                <span style={{
                    width: "120px",
                    height: "120px"
                }}
                    class="bookjacket-image"></span>
                {/* <Button style={{
                    backgroundColor: "var(--button-default-background-color)",
                    marginTop: "20px"
                }}
                    type="primary" shape="round" >
                    Muốn đọc
                </Button>
                <Button style={{
                    backgroundColor: "var(--button-default-background-color)",
                    marginTop: "20px"
                }}
                    type="primary" shape="round"  >
                    Thảo luận
                </Button> */}
            </div>
            <div class="book-content-intro">
                <h2 class="title">{postItem.bookName}</h2>
                <h3 class="author">{postItem.authorName}</h3>
                {/* <p class="content-intro">

                    </p> */}

                <Paragraph ellipsis={
                    {
                        rows: 6,
                        expandable: true,
                        symbol: "Tiếp"

                    }

                } className="content-intro">
                    industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lore
                </Paragraph>
            </div>
        </div>
    )
}


export default ContentIntro
