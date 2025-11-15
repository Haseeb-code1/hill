import React, { useState, useCallback, useMemo } from 'react';
import { Header } from './components/Header.tsx';
import { MatrixSizeSelector } from './components/MatrixSizeSelector.tsx';
import { KeyMatrixInput } from './components/KeyMatrixInput.tsx';
import { CipherBlock } from './components/CipherBlock.tsx';
import { Toast } from './components/Toast.tsx';
import { StartScreen } from './components/StartScreen.tsx';
import { ChoiceScreen } from './components/ChoiceScreen.tsx';
import { encrypt, decrypt, isKeyValid } from './services/hillCipherService.ts';

type Mode = 'start' | 'choice' | 'encrypt' | 'decrypt';

const App: React.FC = () => {
    const [mode, setMode] = useState<Mode>('start');
    const [matrixSize, setMatrixSize] = useState<2 | 3>(2);
    const [keyMatrix, setKeyMatrix] = useState<string[][]>([['', ''], ['', '']]);
    const [plaintext, setPlaintext] = useState<string>('');
    const [ciphertext, setCiphertext] = useState<string>('');
    const [encryptedResult, setEncryptedResult] = useState<string>('');
    const [decryptedResult, setDecryptedResult] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleMatrixSizeChange = useCallback((size: 2 | 3) => {
        setMatrixSize(size);
        const newMatrix = Array(size).fill(0).map(() => Array(size).fill(''));
        setKeyMatrix(newMatrix);
        setEncryptedResult('');
        setDecryptedResult('');
        setError(null);
    }, []);
    
    const handleKeyMatrixChange = useCallback((newMatrix: string[][]) => {
        setKeyMatrix(newMatrix);
    }, []);

    const handleBackToChoice = () => {
        setMode('choice');
        setEncryptedResult('');
        setDecryptedResult('');
        setPlaintext('');
        setCiphertext('');
        setError(null);
    };

    const parseKeyMatrix = (): number[][] | null => {
        const numericMatrix: number[][] = [];
        for (let i = 0; i < matrixSize; i++) {
            const row: number[] = [];
            for (let j = 0; j < matrixSize; j++) {
                const val = keyMatrix[i][j];
                if (val === '' || isNaN(parseInt(val, 10))) {
                    setError('All key matrix cells must be filled with numbers.');
                    return null;
                }
                row.push(parseInt(val, 10));
            }
            numericMatrix.push(row);
        }
        return numericMatrix;
    };

    const handleEncrypt = () => {
        setError(null);
        setEncryptedResult('');
        if (!plaintext.trim()) {
            setError("Plaintext cannot be empty.");
            return;
        }
        const numericKey = parseKeyMatrix();
        if (!numericKey) return;

        if (!isKeyValid(numericKey, matrixSize)) {
            setError("Invalid Key: The key matrix is not invertible (mod 26) and cannot be used for decryption.");
            return;
        }

        try {
            const result = encrypt(plaintext, numericKey, matrixSize);
            setEncryptedResult(result);
        } catch (e: any) {
            setError(e.message);
        }
    };

    const handleDecrypt = () => {
        setError(null);
        setDecryptedResult('');
        if (!ciphertext.trim()) {
            setError("Ciphertext cannot be empty.");
            return;
        }
        const numericKey = parseKeyMatrix();
        if (!numericKey) return;

        if (!isKeyValid(numericKey, matrixSize)) {
            setError("Invalid Key: The key matrix is not invertible (mod 26).");
            return;
        }

        try {
            const result = decrypt(ciphertext, numericKey, matrixSize);
            if (result === null) {
                setError("Decryption failed. The key matrix is not invertible (mod 26).");
                return;
            }
            setDecryptedResult(result);
        } catch (e: any) {
            setError(e.message);
        }
    };
    
    const memoizedKeyMatrixInput = useMemo(() => (
        <KeyMatrixInput
            size={matrixSize}
            matrix={keyMatrix}
            onChange={handleKeyMatrixChange}
        />
    ), [matrixSize, keyMatrix, handleKeyMatrixChange]);

    if (mode === 'start') {
        return <StartScreen onStart={() => setMode('choice')} />;
    }

    if (mode === 'choice') {
        return <ChoiceScreen onSelectMode={setMode} />;
    }


    return (
        <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col items-center p-4 sm:p-6 md:p-8">
            <div className="w-full max-w-4xl mx-auto">
                <Header />
                <main className="mt-8 space-y-8">
                    <div>
                         <button onClick={handleBackToChoice} className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors duration-200 mb-6 font-medium">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Back to Choice
                        </button>
                        <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-slate-700">
                            <h2 className="text-xl font-bold text-cyan-400 mb-4">Configuration</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">1. Select Matrix Size</label>
                                    <MatrixSizeSelector selectedSize={matrixSize} onSizeChange={handleMatrixSizeChange} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-2">2. Enter Key Matrix (Numbers)</label>
                                    {memoizedKeyMatrixInput}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full max-w-xl mx-auto">
                       {mode === 'encrypt' && (
                            <CipherBlock
                                title="Encrypt"
                                inputLabel="Plaintext"
                                inputValue={plaintext}
                                onInputChange={(e) => setPlaintext(e.target.value)}
                                onButtonClick={handleEncrypt}
                                buttonText="Encrypt"
                                resultLabel="Ciphertext"
                                resultValue={encryptedResult}
                            />
                        )}
                        {mode === 'decrypt' && (
                            <CipherBlock
                                title="Decrypt"
                                inputLabel="Ciphertext"
                                inputValue={ciphertext}
                                onInputChange={(e) => setCiphertext(e.target.value)}
                                onButtonClick={handleDecrypt}
                                buttonText="Decrypt"
                                resultLabel="Plaintext"
                                resultValue={decryptedResult}
                            />
                        )}
                    </div>
                </main>
            </div>
            {error && <Toast message={error} onClose={() => setError(null)} />}
        </div>
    );
};

export default App;