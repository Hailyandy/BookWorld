import { Outlet } from "react-router-dom"
import './css/authorlayout.css'
export default function GeneralLayout() {
    return (
        <div className="authors-layout">
            <h2>Layouts author</h2>
            <Outlet />
        </div>
    )
}
