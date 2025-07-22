import rateMyUnitLogo from "../assets/logo-default.svg";
import Typewriter from "../components/Typewriter.tsx";
import Button from "../components/Button.tsx";
import '../styles/landing.css';
import SearchBar from "../components/Search.tsx";

function Home() {
    const handleSearch = (query: string) => {
        console.log('Searching for units or reviews:', query);
    };

    return (
        <>
            <div className="h-screen">
                <div className="background flex flex-col lg:flex-row h-full items-center justify-center">
                    <div className="flex relative justify-center items-center basis-1/2 h-full p-3 gap-2 pr-20">
                        <img src={rateMyUnitLogo} className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-60 lg:h-60 p-3" alt="Rate My Unit logo"/>
                        <div className="flex flex-col gap-4">
                            <Typewriter text="ratemyunit" speed={350} className="font-mono text-3xl sm:text-4xl md:text-4xl lg:text-5xl text-black relative" />
                            <div className="description mt-2">
                                <p>
                                    Explore honest, student-written reviews for Monash University units.
                                    Whether you're planning your next semester or curious about a subject,
                                    our community-driven insights will help you make informed decisions.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                        <SearchBar onSearch={handleSearch} placeholder="Search units or reviews..."/>
                    </div>
                    <div className="absolute top-5 right-4 flex gap-4">
                        <Button onClick={() => {}}>
                            Sign up
                        </Button>
                        <Button onClick={() => {}}>
                            Log in
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Home;