import Avartar from "~/components/ui/Avartar/Avartar"
import "./postComment.css"

const PostComment = () => {
    return (
        <div class= "post-comment">
            <span class = "avatar-image"></span>
            <span class = "content-comment">
               <h4 >Xuân Bách</h4>
               <p>Sách hay</p>
            </span>
            <div class="footer-comment">
                <p>Thích</p>
                <p>Phản hồi</p>
            </div>
        </div>
    )
}

export default PostComment