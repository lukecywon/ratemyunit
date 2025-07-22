import rateMyUnitLogo from "../assets/logo-white-fancy.svg";
import Typewriter from "../components/Typewriter.tsx";

function Home() {
    return (
        <>
            <div className="h-screen">
                <div className="flex flex-row h-full items-center bg-linear-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]">
                    <div className="flex relative justify-center items-center basis-1/2 h-full p-10">
                        <img src={rateMyUnitLogo} className="w-2/3 sm:w-1/2 md:w-1/3 lg:w-3/5 h-auto" alt="Rate My Unit logo"/>
                        <Typewriter text="ratemyunit" speed={300} className="font-mono text-xl sm:text-2xl md:text-4xl lg:text-6xl text-white relative top-20" />
                    </div>
                    <div className="basis-1/2 h-full">

                    </div>
                </div>
            </div>
        </>
    )
}
export default Home;