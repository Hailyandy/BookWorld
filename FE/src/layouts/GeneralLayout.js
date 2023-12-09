import { Outlet } from "react-router-dom"
import './css/authorlayout.css'

export default function GeneralLayout() {

    return (
        <div >
            <Outlet />
        </div>
    )
}
