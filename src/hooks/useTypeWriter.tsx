import {useEffect, useState} from 'react';

const useTypewriter = (text: string, speed = 50) => {
    const [displayText, setDisplayText] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        setDisplayText('');
        setIsComplete(false);
        let i = 0;

        const typingInterval = setInterval(() => {
            if (i < text.length) {
                setDisplayText(prevText => {
                    const currentIndex = prevText.length;
                    const currentChar = text.charAt(currentIndex);
                    const newText = prevText + currentChar;

                    return newText;
                });
                i++;
            } else {
                setIsComplete(true);
                clearInterval(typingInterval);
            }
        }, speed);

        return () => {
            clearInterval(typingInterval);
        };
    }, [text, speed]);

    return { displayText, isComplete };
};

export default useTypewriter;