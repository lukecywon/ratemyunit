import '../styles/landing.css';
import Topbar from "../components/Topbar.tsx";
import FilterCard from "../components/Sidebar.tsx";
import '../styles/mainpage.css'
import {PanelLeftClose, PanelRightClose} from "lucide-react";
import {useState} from "react";

function MainPage() {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    return (
            <div className="background relative flex flex-col min-h-screen">
                <Topbar />

                {/* Sidebar Container */}
            <div className="absolute left-8 mt-35 w-80">
                <div className= {`transition-all duration-300 ease-in-out transform
                        ${isSidebarOpen ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0 pointer-events-none"}`}
                     >
                    <div className="relative">
                        <FilterCard />
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="absolute top-5 right-4 text-gray-500 hover:text-gray-800 transition-transform duration-200 hover:scale-110"
                        >
                                <PanelLeftClose className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                {!isSidebarOpen && (
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="absolute left-8 top-35 bg-white border rounded-lg shadow-md p-2 hover:bg-gray-100 transition-transform duration-200 hover:scale-110"
                        >
                            <PanelRightClose className="w-5 h-5" />
                        </button>
                    )}
            </div>
    )
}

export default MainPage;