import '../styles/landing.css';
import Topbar from "../components/Topbar.tsx";
import FilterCard from "../components/Sidebar.tsx";
import '../styles/mainpage.css'

function MainPage() {
    return (
        <>
            <div className="background relative flex flex-col min-h-screen">
                <Topbar />
            <div className="absolute left-8 mt-35 w-80">
                <FilterCard />
            </div>
        </div>
        </>
    )
}
export default MainPage;