import { Outlet, useLoaderData } from "react-router-dom"
import './css/authorlayout.css'
import { useNavigate } from "react-router-dom";
export default function GeneralLayout() {
    const navigate = useNavigate()
    const dataLoader = useLoaderData()

    return (
        <div >
            <Outlet />
        </div>
    )
}
