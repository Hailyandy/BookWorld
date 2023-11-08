import { Outlet } from "react-router-dom"
import "./css/searchlayout.css"
export default function SearchResultLayout() {
    return (
        <div className="search-page-containner">
            <div className="search-page-body">
                <h2>Tìm kiếm</h2>
                <Outlet />
            </div>
        </div>
    )
}
