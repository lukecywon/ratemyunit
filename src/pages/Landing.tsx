import rateMyUnitLogo from "../assets/logo-white-nobackground.svg";
import Typewriter from "../components/Typewriter.tsx";

function Home() {
    return (
        <>
            <div className="h-screen">
                <div className="flex flex-row h-full items-center">
                    <div className="basis-2/3 h-full">
                        test
                    </div>
                    <div className="flex flex-col items-center justify-center basis-1/3 h-full bg-black p-10">
                        <img src={rateMyUnitLogo} className="size-max" alt="Rate My Unit logo"/>
                        <Typewriter text="ratemyunit" speed={200} className="font-mono text-7xl text-white" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;