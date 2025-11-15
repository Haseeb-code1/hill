import React from 'react';

interface StartScreenProps {
    onStart: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col items-center justify-center text-center p-4">
            <div className="max-w-2xl animate-fade-in-up">
                <img 
                    src="https://picsum.photos/seed/crypto/150/150" 
                    alt="Cryptography lock" 
                    className="rounded-full border-4 border-slate-700 shadow-lg mx-auto mb-8"
                />
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                    Welcome to the Hill Cipher <span className="text-cyan-400">Toolbox</span>
                </h1>
                <p className="mt-4 text-lg md:text-xl text-slate-400">
                    An interactive tool to encrypt and decrypt messages using the classic polygraphic Hill Cipher algorithm. Ready to secure your messages?
                </p>
                <button
                    onClick={onStart}
                    className="mt-10 py-3 px-8 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-lg rounded-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                    Get Started
                </button>
            </div>
        </div>
    );
};