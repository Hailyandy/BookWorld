import { Link, useLoaderData } from "react-router-dom"
import './css/adminwelcome.css'
export default function Admins() {
    return (
        <div className="admins">
            <h1>Chào mừng Quản Trị Viên. </h1>
            <span> Hãy cũng nhau cống hiến vì cộng đồng sách</span>
        </div>
    )
}

// data loader
// export const careersLoader = async () => {
//     const res = await fetch('http://localhost:4000/careers')

//     if (!res.ok) {
//         throw Error('Could not fetch the list of careers')
//     }

//     return res.json()
// }
