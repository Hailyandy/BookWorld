import AvartarTime from "components/ui/AvartarTime/AvartarTime"
import "./reviewPost.css"
import { StarFilled } from '@ant-design/icons';
import ContentIntro from "../Content Intro/ContentIntro";



const ReviewPost = () => {
    return (
        <div class = "review-post">

            {/* Heading Post */}
            
            <div class = "heading-post">
               <AvartarTime></AvartarTime>
               <p class = "status-title">Đánh giá một cuốn sách</p>
               <ul class = "list-star">
                    <li class = "star"><StarFilled /></li>
                    <li class = "star"><StarFilled /></li>
                    <li class = "star"><StarFilled /></li>
                    <li class = "star"><StarFilled /></li>
                    <li class = "star"><StarFilled /></li>
               </ul>
            </div>

            {/* Body Post */}

            <ContentIntro></ContentIntro>

        </div>
    )
}

export default ReviewPost