import React, { useState } from 'react';

interface CipherBlockProps {
    title: string;
    inputLabel: string;
    inputValue: string;
    onInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onButtonClick: () => void;
    buttonText: string;
    resultLabel: string;
    resultValue: string;
}

export const CipherBlock: React.FC<CipherBlockProps> = ({
    title,
    inputLabel,
    inputValue,
    onInputChange,
    onButtonClick,
    buttonText,
    resultLabel,
    resultValue
}) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        if (!resultValue) return;
        navigator.clipboard.writeText(resultValue).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
        });
    };

    return (
        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-700 h-full flex flex-col">
            <h2 className="text-xl font-bold text-cyan-400 mb-4">{title}</h2>
            <div className="flex flex-col space-y-4 flex-grow">
                <div>
                    <label htmlFor={`${title}-input`} className="block text-sm font-medium text-slate-400 mb-2">
                        {inputLabel}
                    </label>
                    <textarea
                        id={`${title}-input`}
                        rows={4}
                        value={inputValue}
                        onChange={onInputChange}
                        placeholder={`Enter ${inputLabel.toLowerCase()} here...`}
                        className="w-full p-3 bg-slate-900 border border-slate-700 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors text-white resize-none"
                    />
                </div>
                <button
                    onClick={onButtonClick}
                    className="w-full py-3 px-4 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                >
                    {buttonText}
                </button>
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-medium text-slate-400">{resultLabel}</label>
                        {resultValue && (
                            <button
                                onClick={handleCopy}
                                className="text-sm font-medium text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
                                aria-label="Copy result to clipboard"
                            >
                                {isCopied ? (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                        Copy
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                    <div className="w-full p-3 min-h-[108px] bg-slate-900 border border-slate-700 rounded-md text-white font-mono break-words whitespace-pre-wrap">
                      {resultValue || <span className="text-slate-500">Result will appear here...</span>}
                    </div>
                </div>
            </div>
        </div>
    );
};