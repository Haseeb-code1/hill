
import React from 'react';

interface MatrixSizeSelectorProps {
    selectedSize: 2 | 3;
    onSizeChange: (size: 2 | 3) => void;
}

export const MatrixSizeSelector: React.FC<MatrixSizeSelectorProps> = ({ selectedSize, onSizeChange }) => {
    return (
        <div className="flex space-x-2 rounded-lg bg-slate-900 p-1 border border-slate-700">
            <button
                onClick={() => onSizeChange(2)}
                className={`w-full px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                    selectedSize === 2 ? 'bg-cyan-500 text-white' : 'text-slate-400 hover:bg-slate-700'
                }`}
            >
                2x2 Matrix
            </button>
            <button
                onClick={() => onSizeChange(3)}
                className={`w-full px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                    selectedSize === 3 ? 'bg-cyan-500 text-white' : 'text-slate-400 hover:bg-slate-700'
                }`}
            >
                3x3 Matrix
            </button>
        </div>
    );
};
