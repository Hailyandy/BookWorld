import "./avartar.css"
import { Avatar } from "antd"
const Avartar = ({ friendItem }) => {
    return (
        <div class="avartar">
            <Avatar shape='round' src={friendItem.urlAvatar} size={50} />
            <p class="name">{friendItem.userName}</p>
        </div>
    )
}

export default Avartar
