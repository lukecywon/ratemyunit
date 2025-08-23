import '../styles/landing.css';
import Topbar from "../components/Topbar.tsx";
import FilterCard from "../components/Sidebar.tsx";
import {PanelLeftClose, PanelRightClose} from "lucide-react";
import {useState} from "react";
import UnitCard from "../components/UnitCard.tsx";

function MainPage() {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    return (
            <div className="background absolute top-0 left-0 w-full h-full min-h-screen">
                <Topbar />

                {/* Body */}
                <div className="relative flex flex-row mt-35">
                    {/* Sidebar Container */}
                    <div className="p-6 w-max-86">
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

                    {/* Unit Cards */}
                    <div className="flex-3 w-full p-6">
                        <div className="bg-white shadow-md rounded-lg p-6 w-full">
                            <h1 className="text-xl font-bold mb-4">University Units</h1>
                            <UnitCard />
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default MainPage;