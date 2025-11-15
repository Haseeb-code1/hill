
import React from 'react';

interface KeyMatrixInputProps {
    size: 2 | 3;
    matrix: string[][];
    onChange: (matrix: string[][]) => void;
}

export const KeyMatrixInput: React.FC<KeyMatrixInputProps> = ({ size, matrix, onChange }) => {
    
    const handleInputChange = (row: number, col: number, value: string) => {
        
        if (!/^\d*$/.test(value)) return;

        const newMatrix = matrix.map((r, rIndex) =>
            r.map((c, cIndex) => (rIndex === row && cIndex === col ? value : c))
        );
        onChange(newMatrix);
    };
    
    const gridClass = size === 2 ? 'grid-cols-2' : 'grid-cols-3';

    return (
        <div className={`grid ${gridClass} gap-2`}>
            {Array.from({ length: size * size }).map((_, index) => {
                const row = Math.floor(index / size);
                const col = index % size;
                return (
                    <input
                        key={index}
                        type="text"
                        pattern="\d*"
                        maxLength={3}
                        value={matrix[row]?.[col] ?? ''}
                        onChange={(e) => handleInputChange(row, col, e.target.value)}
                        className="w-full h-12 text-center bg-slate-900 border border-slate-700 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors text-white"
                        aria-label={`Key matrix cell row ${row + 1} column ${col + 1}`}
                    />
                );
            })}
        </div>
    );
};
