
import React from 'react';

const LockIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-16 h-16 text-cyan-400"
  >
    <path
      fillRule="evenodd"
      d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
      clipRule="evenodd"
    />
  </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="text-center p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-700 flex flex-col md:flex-row items-center justify-center gap-6">
       <div className="flex-shrink-0">
         <img src="https://picsum.photos/seed/crypto/120/120" alt="Cryptography" className="rounded-full border-4 border-slate-700 shadow-lg"/>
       </div>
       <div>
         <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Hill Cipher <span className="text-cyan-400">Toolbox</span>
         </h1>
         <p className="mt-2 text-md md:text-lg text-slate-400 max-w-2xl mx-auto">
            An interactive tool to encrypt and decrypt messages using the classic polygraphic Hill Cipher algorithm.
         </p>
       </div>
    </header>
  );
};
