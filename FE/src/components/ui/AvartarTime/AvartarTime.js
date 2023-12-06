import "./avartarTime.css"
import moment from "moment";
import { Avatar } from "antd";
import 'moment/locale/vi';

moment.locale('vi');
const AvartarTime = ({ postItem }) => {
    return (
        <div class="avartarTime">
            {/* <span class="avatar-image"></span> */}
            <Avatar size={50} src={postItem.urlAvatarUser} alt="Han Solo" />
            <div class="name-time">
                <p class="name">{postItem.userName}</p>
                <p class="time">{moment(postItem.createdOn).fromNow()}</p>
            </div>
        </div>
    )
}

export default AvartarTime
