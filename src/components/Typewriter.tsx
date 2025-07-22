import useTypeWriter from "../hooks/useTypeWriter.tsx";

interface TypewriterProps {
    text: string;
    speed: number;
    className: string;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, speed, className }) => {
    const { displayText, isComplete } = useTypeWriter(text, speed);

    return (
        <>
            <span className={className}>
                {displayText}
                {isComplete && (
                    <span
                        className="animate-pulse"
                        style={{
                            animation: 'blink 1s step-end infinite'
                        }}
                    >
                    _
                </span>
                )}
                <style>{`
                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }
            `}</style>
        </span>
        </>
    )
}

export default Typewriter;