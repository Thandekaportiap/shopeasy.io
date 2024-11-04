import React, { useEffect, useState } from 'react';

const TypewriterEffect = () => {
    const words = ["Hello!", "Welcome, Here is our website!", "Shopeasy is the best online shopping website!", "We are the best online shopping website!"];
    const [displayedText, setDisplayedText] = useState('');
    const [wordIndex, setWordIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const type = () => {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                setDisplayedText(currentWord.substring(0, charIndex - 1));
                setCharIndex(charIndex - 1);
                if (charIndex === 1) {
                    setIsDeleting(false);
                    setWordIndex((wordIndex + 1) % words.length);
                }
            } else {
                setDisplayedText(currentWord.substring(0, charIndex + 1));
                setCharIndex(charIndex + 1);
                if (charIndex === currentWord.length) {
                    setIsDeleting(true);
                }
            }
        };

        const timeout = setTimeout(type, 100);
        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, wordIndex, words]);

    return (
        <div className="w-full h-full flex justify-center items-center">
            <h1 id="typewriter" className="text-4xl font-bold text-[#67595e]">
                {displayedText}
            </h1>
        </div>
    );
};

export default TypewriterEffect;