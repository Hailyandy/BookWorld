import "./bookjacket.css"
import { Avatar, Typography } from "antd"
const { Title, Text, Paragraph } = Typography;
const BookJacket = ({ bookItem }) => {
  return (
    <div class="bookjacket">
      <div className="bookjacket-image-container" >
        <Avatar shape="square" size={64} src={bookItem.urlPoster} alt="Han Solo" />
      </div>

      <div class="book-title">
        <Paragraph ellipsis={
          {
            rows: 1,
            expandable: false,

          }

        } className="title">
          {bookItem.name}
        </Paragraph>
        <Paragraph ellipsis={
          {
            rows: 1,
            expandable: false,

          }

        } className="author-name">
          {bookItem.publisher}
        </Paragraph>
      </div>
    </div>
  )
}

export default BookJacket
