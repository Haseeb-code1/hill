import React from 'react';

interface ChoiceScreenProps {
    onSelectMode: (mode: 'encrypt' | 'decrypt') => void;
}

// FIX: Replaced JSX.Element with React.ReactNode to resolve "Cannot find namespace 'JSX'" error.
const ChoiceCard: React.FC<{ title: string; description: string; onClick: () => void; icon: React.ReactNode; }> = ({ title, description, onClick, icon }) => (
    <button
        onClick={onClick}
        className="w-full text-left p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-700 hover:border-cyan-500 hover:bg-slate-800 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900"
    >
        <div className="flex items-center gap-4">
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-700 text-cyan-400 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <div>
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <p className="text-slate-400 mt-1">{description}</p>
            </div>
             <div className="ml-auto text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>
        </div>
    </button>
);


export const ChoiceScreen: React.FC<ChoiceScreenProps> = ({ onSelectMode }) => {
    const lockIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
    );
    const unlockIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
        </svg>
    );

    return (
        <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full text-center">
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
                    What would you like to do?
                </h1>
                <p className="text-slate-400 mb-8">
                    Choose an option to get started.
                </p>
                <div className="space-y-4">
                    <ChoiceCard
                        title="Encrypt Message"
                        description="Turn your plaintext into a secure ciphertext."
                        onClick={() => onSelectMode('encrypt')}
                        icon={lockIcon}
                    />
                    <ChoiceCard
                        title="Decrypt Message"
                        description="Reveal the original message from a ciphertext."
                        onClick={() => onSelectMode('decrypt')}
                        icon={unlockIcon}
                    />
                </div>
            </div>
        </div>
    );
};