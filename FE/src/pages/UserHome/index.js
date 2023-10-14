import Navbar from "components/ui/Navbar/Navbar";
import HeaderLayout from "../../components/layout/Header"
import UserHome from "./UserHome";



const UserHomePage = () => {
    return (
        <>
            <HeaderLayout />
            <Navbar/>
            <UserHome/>
        </>)
}
export default UserHomePage;